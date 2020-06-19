import React, {
  useState, useEffect,
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
  const { t } = useTranslation(['translation']);
  const staticUrl = process.env.REACT_APP_STATIC_URL;
  const isMenuOpen = useSelector(menuIsOpen);
  const [works, setWorks] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getList = async () => {
    const getProjectList = (type, sortDirection) => API.graphql(graphqlOperation(getProjectByOrder, { type, sortDirection }));
    const result = await getProjectList('work', 'DESC');
    // console.log(result);
    if (result.data) {
      return result.data.getProjectByOrder.items;
    }

    // console.error(result);
    return null;
  };

  useEffect(() => {
    // console.log('useEffect');
    const init = async () => {
      const items = await getList();

      if (items) {
        setWorks(items);
        setIsLoading(false);

        if ($('.carousel').length > 0) {
          $('.carousel').carousel({
            interval: 5000,
          });
        }
      }
    };

    if ($('.carousel').length > 0) {
      if (isMenuOpen) {
        $('.carousel').carousel('pause');
      } else {
        $('.carousel').carousel();
      }
    }

    if (isLoading) init();
  }, [isLoading, isMenuOpen]);

  return (
    <div className="ProjectWork p-4 my-4 bg-dark rounded">
      <h2 className="text-center text-light">
        {t('project.work')}
        {isLoading && (<CustomSpinner sz="sm" color="dark" />)}
      </h2>
      {!isLoading && (
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
                <div key={elem.id} className={`carousel-item bg-dark ${index === 0 && 'active'}`}>
                  <img className="d-block w-100" src={`${staticUrl}${elem.image}`} alt={elem.name} style={{ opacity: '0.3' }} />
                  <div className="carousel-caption d-md-block">
                    <h5>{elem.name}</h5>
                    <p><small>{elem.languages}</small></p>
                  </div>
                </div>
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
