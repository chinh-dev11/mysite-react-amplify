import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Transition } from 'react-transition-group';
import CustomSpinner from './CustomSpinner';
import transitionHelper from '../utils/transitionHelper';
import { getEducByCompletedDate } from '../graphql/queries';

const Education = () => {
  const { t } = useTranslation(['translation']);
  const [certs, setCerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getList = async () => {
    const getCertsList = (type, sortDirection) => API.graphql(graphqlOperation(getEducByCompletedDate, { type, sortDirection }));

    try {
      const result = await getCertsList('certificate', 'DESC');
      // console.log(result);
      if (result.data) {
        return result.data.getEducByCompletedDate.items;
      }

      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  useEffect(() => {
    const init = async () => {
      const items = await getList();

      if (items) {
        setCerts(items);
        setIsLoading(false);
      }
    };

    init();
  }, []);

  return (
    <div className="Education mb-4 py-4">
      <h2 className="text-center sticky-top bg-white">
        <span className="mr-2">{t('education.title')}</span>
        {isLoading && (<CustomSpinner sz="sm" color="dark" />)}
      </h2>
      {!isLoading && certs.length > 0 && (
        <Transition
          in
          timeout={transitionHelper.defaultTimeout}
          appear
          unmountOnExit
        >
          {(state) => (
            <Accordion
              as="ul"
              defaultActiveKey="0"
              style={{
                ...transitionHelper.defaultStyle,
                ...transitionHelper.transitionStyles[state],
              }}
              className="p-0"
              role="tablist"
            >
              {certs.map((elem, i) => (
                <Card key={elem.id} as="li">
                  <Accordion.Toggle as={Card.Header} eventKey={i} id={`cert${i}Tab`} role="tab">
                    {elem.name}
                    {elem.type === 'certificate' && ` (${t('education.certificate')})`}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={i}>
                    <Card.Body role="tabpanel" aria-labelledby={`cert${i}Tab`}>
                      <Card.Title>{elem.institution}</Card.Title>
                      <Row className="no-gutters flex-row">
                        <Col xs="7">
                          <Card.Text>{`${t('education.completed')}: ${elem.completedDate}`}</Card.Text>
                          {elem.urlFrom && <Card.Link href={elem.urlFrom} target="_blank" rel="noopener noreferrer" className="d-block">{t('education.linkDetail')}</Card.Link>}
                          {elem.url && <Card.Link href={elem.url} target="_blank" rel="noopener noreferrer" className="d-block ml-0">{t('education.link')}</Card.Link>}
                        </Col>
                        <Col xs="5">
                          {elem.languages.length > 0 && (
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
        </Transition>
      )}
    </div>
  );
};

export default Education;
