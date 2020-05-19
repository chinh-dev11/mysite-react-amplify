import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { getProjectByOrder } from '../graphql/queries';


const ProjectLab = () => {
  const [labs, setLabs] = useState([]);
  const staticUrl = 'https://static.chinhle.ca/project/';

  const getProjectList = (type, direction) => API.graphql(graphqlOperation(getProjectByOrder, { type, direction }));

  useEffect(() => {
    getProjectList('lab', 'DESC')
      .then((res) => {
        console.log(res);
        setLabs(res.data.getProjectByOrder.items);
      })
      .catch((e) => {
        // throw Error(e);
        console.log(e);
      });
  }, []);

  return (
    <div>
      {labs.length > 0
        ? (
          <CardGroup>
            {labs.map((elem) => (
              <Card key={elem.id}>
                <Card.Img variant="top" src={staticUrl + elem.image} alt={elem.name} />
                <Card.Body>
                  <Card.Title>{elem.name}</Card.Title>
                  <Card.Text>{elem.languages}</Card.Text>
                  <Button variant="primary">Live app</Button>
                </Card.Body>
              </Card>
            ))}
          </CardGroup>
        )
        : <p>No labs!</p>}
    </div>
  );
};

export default ProjectLab;
