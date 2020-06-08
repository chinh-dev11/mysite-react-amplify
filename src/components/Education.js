import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { getEducByCompletedDate } from '../graphql/queries';

const Education = () => {
  const { t } = useTranslation(['translation']);
  const [certs, setCerts] = useState([]);

  const getCertsList = (type, sortDirection) => API.graphql(graphqlOperation(getEducByCompletedDate, { type, sortDirection }));

  useEffect(() => {
    getCertsList('certificate', 'DESC')
      .then((res) => {
        // console.log(res.data.getEducByCompletedDate.items);
        setCerts(res.data.getEducByCompletedDate.items);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  return (
    <div className="Education mb-4">
      <h2 className="text-center sticky-top bg-white">{t('education.title')}</h2>
      {certs.length > 0
        && (
          <Accordion defaultActiveKey="0">
            {certs.map((elem, i) => (
              <Card key={elem.id}>
                <Accordion.Toggle as={Card.Header} eventKey={i}>
                  {elem.name}
                  {elem.type === 'certificate' && ` (${t('education.certificate')})`}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={i}>
                  <Card.Body>
                    <Card.Title>{elem.institution}</Card.Title>
                    <Row className="no-gutters flex-row">
                      <Col xs="7">
                        <Card.Text>{`${t('education.completed')}: ${elem.completedDate}`}</Card.Text>
                        {elem.urlFrom && <Card.Link href={elem.urlFrom} target="_blank" rel="noopener noreferrer" className="d-block">{t('education.linkDetail')}</Card.Link>}
                        {elem.url && <Card.Link href={elem.url} target="_blank" rel="noopener noreferrer" className="d-block ml-0">{t('education.link')}</Card.Link>}
                      </Col>
                      <Col xs="5">
                        {elem.languages.length > 0
                         && (
                         <div>
                           <Card.Text>{`${t('education.languages')}: `}</Card.Text>
                           <ul>{elem.languages.map((lang) => <li key={lang}>{lang}</li>)}</ul>
                         </div>
                         )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        )}
    </div>
  );
};

export default Education;
