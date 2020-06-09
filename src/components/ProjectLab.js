import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { getProjectByOrder } from '../graphql/queries';

const ProjectLab = () => {
  const { t } = useTranslation(['translation']);
  const [labs, setLabs] = useState([]);
  const staticUrl = process.env.REACT_APP_STATIC_URL;
  const [styleInline, setStyleInline] = useState({});

  const getProjectList = (type, sortDirection) => API.graphql(graphqlOperation(getProjectByOrder, { type, sortDirection }));

  useEffect(() => {
    const headerHeight = document.querySelector('.Header').clientHeight;
    setStyleInline({ top: `${headerHeight}px` });

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
    <div className="ProjectLab mb-4 py-4">
      <h2 className="text-center sticky-top bg-white" style={styleInline}>{t('project.lab')}</h2>
      {labs.length > 0
      && (
        <CardGroup>
          {labs.map((elem) => (
            <Col key={elem.id} lg="6" xl="4" className="mb-3">
              <Card>
                <Card.Link className="text-dark text-center d-block" href={elem.url} target="_blank" rel="noopener noreferrer">
                  <Card.Img src={staticUrl + elem.image} alt={elem.name} />
                  <Card.ImgOverlay className="p-0" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
                    <Card.Title className="p-3 m-0 rounded-top border-bottom bg-light text-dark">{elem.name}</Card.Title>
                    <Card.Text className="p-2 position-absolute w-100 rounded-bottom border-top text-muted" style={{ bottom: '0', backgroundColor: 'rgba(255,255,255,0.8)' }}>{elem.languages}</Card.Text>
                  </Card.ImgOverlay>
                </Card.Link>
              </Card>
            </Col>
          ))}
        </CardGroup>
      )}
    </div>
  );
};

export default ProjectLab;
