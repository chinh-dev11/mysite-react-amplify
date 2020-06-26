import React, {
  useState, useEffect, useCallback,
} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import $ from 'jquery'; // required by Bootstrap carousel
import { Transition } from 'react-transition-group';
import transitionHelper from '../utils/transitionHelper';
import CustomSpinner from './CustomSpinner';
// import { authUsername } from '../app/store/authSlice';
import { menuIsOpen } from '../app/store/menuSlice';
import { getProjectByOrder } from '../graphql/queries';
import 'bootstrap/dist/js/bootstrap.min'; // required by Bootstrap carousel

const ProjectWork = () => {
  const siteDomain = process.env.REACT_APP_SITE_DOMAIN;
  const staticUrl = process.env.REACT_APP_STATIC_URL;
  const { t } = useTranslation(['translation']);
  // const isAuthUsername = useSelector(authUsername);
  const isMenuOpen = useSelector(menuIsOpen);
  const [works, setWorks] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getList = async () => {
    // const user1 = await Auth.currentCredentials(); // IAM - currentUserCredentials()
    // console.log(user1); // NotAuthorizedException: Unauthenticated access is not supported for this identity pool.
    // const user2 = await Auth.currentAuthenticatedUser(); // Cognito - currentUserPoolUser()
    // console.log(user2); // not authenticated
    // const user4 = await Auth.currentUserInfo(); // Cognito
    const getProjectList = (type, sortDirection) => API.graphql(graphqlOperation(getProjectByOrder, { type, sortDirection }));

    try {
      const result = await getProjectList('work', 'DESC');
      // console.log(result);
      if (result.data) {
        return result.data.getProjectByOrder.items;
      }

      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const getWorks = useCallback(
    async () => {
      // console.log('getWorks');
      // const user1 = await Auth.currentCredentials();
      // console.log(user1);
      const items = await getList();
      // console.log('items: ', items);

      if (items) {
        setWorks(items);
        setIsLoading(false);

        if ($('.carousel').length > 0) {
          $('.carousel').carousel({
            interval: 5000,
          });
        }
      }
    }, [],
  );

  const toggleCarousel = useCallback(
    () => {
      // console.log('toggleCarousel: ');
      if (isMenuOpen) {
        $('.carousel').carousel('pause');
      } else {
        $('.carousel').carousel();
      }
    },
    [isMenuOpen],
  );

  useEffect(() => {
    // console.log('useEffect');
    // if (isAuthUsername && works.length === 0) {
    if (works.length === 0) {
      getWorks();
    }

    if ($('.carousel').length > 0) {
      toggleCarousel();
    }
  }, [works.length, getWorks, toggleCarousel]);
  // }, [isAuthUsername, works.length, getWorks, toggleCarousel]);

  return (
    <div className="ProjectWork p-4 my-4 bg-dark rounded">
      <h2 className="text-center text-light">
        <span className="mr-2">{t('project.work')}</span>
        {isLoading && (<CustomSpinner sz="sm" color="light" />)}
      </h2>
      {!isLoading && works.length > 0 && (
      <Transition
        in
        timeout={transitionHelper.defaultTimeout}
        appear
        unmountOnExit
      >
        {(state) => (
          <div
            id="carouselProjectWork"
            className="carousel slide"
            data-ride="carousel"
            style={{
              ...transitionHelper.defaultStyle,
              ...transitionHelper.transitionStyles[state],
            }}
          >
            <ol className="carousel-indicators">
              <li data-target="#carouselProjectWork" data-slide-to="0" className="active" />
              <li data-target="#carouselProjectWork" data-slide-to="1" />
              <li data-target="#carouselProjectWork" data-slide-to="2" />
            </ol>
            <div className="carousel-inner">
              {works.map((elem, index) => (
                <a href={elem.appName ? `https://${elem.appName}.${siteDomain}` : elem.url} target="_blank" key={elem.id} className={`carousel-item bg-dark ${index === 0 && 'active'}`} rel="noreferrer noopener">
                  <img className="d-block w-100" src={`${staticUrl}${elem.image}`} alt={elem.name} style={{ opacity: '0.3' }} />
                  <div className="carousel-caption d-md-block">
                    <h5>{elem.name}</h5>
                    <p><small>{elem.languages}</small></p>
                  </div>
                </a>
              ))}
            </div>
            <a className="carousel-control-prev" href="#carouselProjectWork" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselProjectWork" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        )}
      </Transition>
      )}
    </div>
  );
};

export default ProjectWork;
