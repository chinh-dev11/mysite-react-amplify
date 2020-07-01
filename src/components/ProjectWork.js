import React, {
  useState, useEffect, useCallback,
} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import $ from 'jquery'; // required by Bootstrap carousel
import { Transition } from 'react-transition-group';
import transitionHelper from '../utils/transitionHelper';
import CustomSpinner from './CustomSpinner';
import { menuIsOpen } from '../app/store/menuSlice';
import { getProjectByOrder } from '../graphql/queries';
import 'bootstrap/dist/js/bootstrap.min'; // required by Bootstrap carousel

const ProjectWork = () => {
  const siteDomain = process.env.REACT_APP_SITE_DOMAIN;
  const staticUrl = process.env.REACT_APP_STATIC_URL;
  const { t } = useTranslation(['translation']);
  const isMenuOpen = useSelector(menuIsOpen);
  const [works, setWorks] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getList = async () => {
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
    if (works.length === 0) {
      getWorks();
    }

    if ($('.carousel').length > 0) {
      toggleCarousel();
    }
  }, [works.length, getWorks, toggleCarousel]);

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
              {works.map((elem, i) => <li key={elem.id} data-target="#carouselProjectWork" data-slide-to={i} className={`${i === 0 ? 'active' : ''}`} role="tab" aria-labelledby={`workLabel${i}`} />)}
            </ol>
            <div className="carousel-inner">
              {works.map((elem, i) => (
                <a href={elem.appName ? `https://${elem.appName}.${siteDomain}` : elem.url} target="_blank" key={elem.id} className={`carousel-item bg-dark ${i === 0 && 'active'}`} rel="noreferrer noopener">
                  <img className="d-block w-100" src={`${staticUrl}${elem.image}`} alt={elem.name} style={{ opacity: '0.3' }} />
                  <div className="carousel-caption d-md-block" id={`workLabel${i}`}>
                    <h5>{elem.name}</h5>
                    <p><small>{elem.languages}</small></p>
                  </div>
                </a>
              ))}
            </div>
            <a className="carousel-control-prev" href="#carouselProjectWork" role="button" data-slide="prev" aria-label={t('general.previous')}>
              <span className="carousel-control-prev-icon" />
              <span className="sr-only">{t('general.previous')}</span>
            </a>
            <a className="carousel-control-next" href="#carouselProjectWork" role="button" data-slide="next" aria-label={t('general.next')}>
              <span className="carousel-control-next-icon" />
              <span className="sr-only">{t('general.next')}</span>
            </a>
          </div>
        )}
      </Transition>
      )}
    </div>
  );
};

export default ProjectWork;
