import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getProjectByOrder } from '../graphql/queries';

const ProjectLab = () => {
  const { t } = useTranslation(['translation']);
  const [labs, setLabs] = useState([]);
  const staticUrl = 'https://static.chinhle.ca/public/project/';

  const getProjectList = (type, sortDirection) => API.graphql(graphqlOperation(getProjectByOrder, { type, sortDirection }));

  useEffect(() => {
    getProjectList('lab', 'DESC')
      .then((res) => {
        // console.log(res);
        setLabs(res.data.getProjectByOrder.items);
      })
      .catch((e) => {
        // throw Error(e);
        console.log('here');
        console.error(e);
      });
  }, []);

  return (
    <div className="p-3">
      <h1>{t('project.lab')}</h1>
      {labs.length > 0
      && (
        <CardGroup>
          {labs.map((elem) => (
            <Card key={elem.id}>
              <Card.Img src={staticUrl + elem.image} alt={elem.name} />
              <Card.Link className="d-block text-white" href={elem.url} target="_blank" rel="noopener noreferrer">
                <Card.ImgOverlay className="p-0" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
                  <Card.Subtitle className="p-3 m-0 text-center text-dark" style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>{elem.name}</Card.Subtitle>
                  <Card.Text className="p-2 text-center position-absolute text-dark w-100" style={{ bottom: '0', backgroundColor: 'rgba(255,255,255,0.8)' }}>
                    <ul className="d-inline p-0 m-0">
                      {elem.languages.map((lang) => (
                        <li key={lang} style={{ listStyleType: 'none' }} className="">{lang}</li>
                      ))}
                    </ul>
                  </Card.Text>
                </Card.ImgOverlay>
              </Card.Link>
            </Card>
          ))}
        </CardGroup>
      )}
    </div>
  );
};

export default ProjectLab;
