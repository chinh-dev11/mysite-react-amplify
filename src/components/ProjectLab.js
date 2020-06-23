import React, { useState, useEffect, useRef } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import { Transition } from 'react-transition-group';
import transitionHelper from '../utils/transitionHelper';
import CustomSpinner from './CustomSpinner';
import { getProjectByOrder } from '../graphql/queries';
import {
  initSlick, slickHandler, debounce,
} from '../utils/slickHelper';
import '../style/slickHelper.scss';

const ProjectLab = () => {
  const siteDomain = process.env.REACT_APP_SITE_DOMAIN;
  const staticUrl = process.env.REACT_APP_STATIC_URL;
  const { t } = useTranslation(['translation']);
  const [labs, setLabs] = useState('');
  const elemHeading = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const getList = async () => {
    // console.log('getList');
    const getProjectList = (type, sortDirection) => API.graphql(graphqlOperation(getProjectByOrder, { type, sortDirection }));
    const result = await getProjectList('lab', 'DESC');
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
      // console.log('items: ', items);

      if (items) {
        setLabs(items);

        // sticky top
        elemHeading.current.style.top = `${document.querySelector('.Header').clientHeight}px`;

        setIsLoading(false);

        initSlick(items.length);

        window.addEventListener('resize', debounce(slickHandler, 1000));
      }
    };

    init();

    return () => {
      window.removeEventListener('resize', debounce);
    };
  }, []);

  return (
    <div className="ProjectLab mb-4 py-4">
      <h2 className="heading text-center position-sticky bg-white" ref={elemHeading}>
        {t('project.lab')}
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
              className="carouselSlick"
              style={{
                ...transitionHelper.defaultStyle,
                ...transitionHelper.transitionStyles[state],
              }}
            >
              {labs.map((elem) => (
                <a key={elem.id} className="d-block position-relative mb-4" href={elem.appName ? `https://${elem.appName}.${siteDomain}` : elem.url} target="_blank" rel="noopener noreferrer">
                  <img src={staticUrl + elem.image} alt={elem.name} className="w-100 rounded-lg" />
                  <div className="text-dark text-center p-0 position-absolute w-100 h-100 border rounded" style={{ top: '0', left: '0', backgroundColor: 'rgba(255,255,255,0.6)' }}>
                    <h5 className="p-3 m-0 rounded-top border-bottom bg-light text-dark">{elem.name}</h5>
                    <p className="p-2 rounded-bottom border-top text-muted position-absolute w-100 m-0" style={{ bottom: '0', backgroundColor: 'rgba(255,255,255,0.8)' }}>{elem.languages}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </Transition>
      )}
    </div>
  );
};

export default ProjectLab;
