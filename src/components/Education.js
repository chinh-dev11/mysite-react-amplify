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
        ? (
          <Accordion defaultActiveKey="0">
            {certs.map((elem, i) => (
              <Card key={elem.id}>
                <Accordion.Toggle as={Card.Header} eventKey={i}>{elem.name}</Accordion.Toggle>
                <Accordion.Collapse eventKey={i}>
                  <Card.Body>
                    {elem.languages.length > 0 && <p>{elem.languages}</p>}
                    {elem.url && <a href={elem.url} target="_blank" rel="noopener noreferrer">See certificate</a>}
                    {elem.urlFrom && <a href={elem.urlFrom} target="_blank" rel="noopener noreferrer">See certificate detail</a>}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
        )
        : <p>No certificate!</p>}

    </div>
  );
};

export default Education;
