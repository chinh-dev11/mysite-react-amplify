import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

import { getProjectByOrder } from '../graphql/queries';

const ProjectLab = () => {
  const { t } = useTranslation(['translation']);
  const [labs, setLabs] = useState([]);
  const staticUrl = 'https://static.chinhle.ca/public/project/';

  const getProjectList = (type, sortDirection) => API.graphql(graphqlOperation(getProjectByOrder, { type, sortDirection }));

  useEffect(() => {
    getProjectList('lab', 'DESC')
      .then((res) => {
        console.log(res);
        setLabs(res.data.getProjectByOrder.items);
      })
      .catch((e) => {
        // throw Error(e);
        console.log('here');
        console.error(e);
      });
  }, []);

  return (
    <div>
      <h1>{t('project.lab')}</h1>
      {labs.length > 0
      && (
        <CardGroup>
          {labs.map((elem) => (
            <Card key={elem.id}>
              <Card.Img variant="top" src={staticUrl + elem.image} alt={elem.name} />
              <Card.Body>
                <Card.Title>{elem.name}</Card.Title>
                <Card.Text>
                  <ul className="d-flex p-0 m-0">
                    {elem.languages.map((lang) => (
                      <li style={{ listStyleType: 'none' }} className="border mr-2 p-1">{lang}</li>
                    ))}
                  </ul>
                </Card.Text>
                <Card.Link href={elem.url} target="_blank" rel="noopener noreferrer">{t('project.demo')}</Card.Link>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
      )}
    </div>
  );
};

export default ProjectLab;
