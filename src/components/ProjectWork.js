import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import Carousel from 'react-bootstrap/Carousel';

import { getProjectByOrder } from '../graphql/queries';


const ProjectWork = () => {
  const [works, setWorks] = useState([]);
  // const [elems, setElems]=useSate()
  const staticUrl = 'https://static.chinhle.ca/project/';

  const getProjectList = (type, direction) => API.graphql(graphqlOperation(getProjectByOrder, { type, direction }));

  useEffect(() => {
    getProjectList('work', 'DESC')
      .then((res) => {
        console.log(res);
        setWorks(res.data.getProjectByOrder.items);
      })
      .catch((e) => {
        // throw Error(e);
        console.log(e);
      });
  }, []);

  return (
    <div>
      {works.length > 0
        ? (
          <Carousel>
            {works.map((elem) => (
              <Carousel.Item key={elem.id}>
                <img src={staticUrl + elem.image} alt={elem.name} />
                <Carousel.Caption>
                  <h3>{elem.name}</h3>
                  <p>{elem.languages}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )
        : <p>No works!</p>}
    </div>
  );
};

export default ProjectWork;
