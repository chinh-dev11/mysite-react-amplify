import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import { getProjectByOrder } from '../graphql/queries';
import {
  initSlick, slickHandler, debounce,
} from '../utils/slickHelper';
import '../style/slickHelper.scss';

const ProjectLab = () => {
  const { t } = useTranslation(['translation']);
  const [labs, setLabs] = useState('');
  const staticUrl = process.env.REACT_APP_STATIC_URL;

  const getProjectList = (type, sortDirection) => API.graphql(graphqlOperation(getProjectByOrder, { type, sortDirection }));

  useEffect(() => {
    // console.log('useEffect');
    const init = async () => {
      // console.log('init');
      const result = await getProjectList('lab', 'DESC');
      // console.log(result);
      if (result.data) {
        setLabs(() => result.data.getProjectByOrder.items.map((elem) => (
          <a key={elem.id} className="d-block position-relative mb-4" href={elem.url} target="_blank" rel="noopener noreferrer">
            <img src={staticUrl + elem.image} alt={elem.name} className="w-100 rounded-lg" />
            <div className="text-dark text-center p-0 position-absolute w-100 h-100 border rounded" style={{ top: '0', left: '0', backgroundColor: 'rgba(255,255,255,0.6)' }}>
              <h5 className="p-3 m-0 rounded-top border-bottom bg-light text-dark">{elem.name}</h5>
              <p className="p-2 rounded-bottom border-top text-muted position-absolute w-100 m-0" style={{ bottom: '0', backgroundColor: 'rgba(255,255,255,0.8)' }}>{elem.languages}</p>
            </div>
          </a>
        )));

        initSlick(result.data.getProjectByOrder.items.length);

        window.addEventListener('resize', debounce(slickHandler, 1000));
      }
    };

    init();

    return () => {
      window.removeEventListener('resize', debounce);
    };
  }, [staticUrl]);

  return (
    <div className="ProjectLab mb-4 py-4">
      <h2 className="text-center sticky-top bg-white">{t('project.lab')}</h2>
      <div className="carouselSlick">{labs}</div>
    </div>
  );
};

export default ProjectLab;
