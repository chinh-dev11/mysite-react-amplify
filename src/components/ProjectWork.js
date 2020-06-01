import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-bootstrap/Carousel';

import { getProjectByOrder } from '../graphql/queries';


const ProjectWork = () => {
  const { t } = useTranslation(['translation']);
  const [works, setWorks] = useState([]);
  // const [elems, setElems]=useSate()
  const staticUrl = 'https://static.chinhle.ca/public/project/';

  const getProjectList = (type, sortDirection) => API.graphql(graphqlOperation(getProjectByOrder, { type, sortDirection }));

  useEffect(() => {
    getProjectList('work', 'DESC')
      .then((res) => {
        console.log(res);
        setWorks(res.data.getProjectByOrder.items);
      })
      .catch((e) => {
        // throw Error(e);
        console.error(e);
      });
  }, []);

  return (
    <div>
      <h1>{t('project.work')}</h1>
      {works.length > 0
        && (
          <Carousel>
            {works.map((elem) => (
              <Carousel.Item key={elem.id}>
                <img className="d-block w-100" src={`${staticUrl}${elem.image}`} alt={elem.name} />
                <Carousel.Caption>
                  <h3>{elem.name}</h3>
                  <p>{elem.languages}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
    </div>
  );
};

export default ProjectWork;
