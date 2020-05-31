import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import { getEducByCompletedDate } from '../graphql/queries';

const Education = () => {
  const { t } = useTranslation(['translation']);
  const [certs, setCerts] = useState([]);

  const getCertsList = (type, sortDirection) => API.graphql(graphqlOperation(getEducByCompletedDate, { type, sortDirection }));

  useEffect(() => {
    getCertsList('certificate', 'DESC')
      .then((res) => {
        console.log(res.data.getEducByCompletedDate.items);
        setCerts(res.data.getEducByCompletedDate.items);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      <h2>{t('education.title')}</h2>
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
                    <Card.Subtitle>{`${t('education.completed')}: ${elem.completedDate}`}</Card.Subtitle>
                    {elem.languages.length > 0
                     && (
                     <Card.Text>
                       {`${t('education.languages')}: `}
                       <ul>{elem.languages.map((lang) => <li>{lang}</li>)}</ul>
                     </Card.Text>
                     )}
                    {elem.url && <Card.Link href={elem.url} target="_blank" rel="noopener noreferrer">{t('education.link')}</Card.Link>}
                    {elem.urlFrom && <Card.Link href={elem.urlFrom} target="_blank" rel="noopener noreferrer">{t('education.linkDetail')}</Card.Link>}
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
