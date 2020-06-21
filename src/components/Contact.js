import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API, graphqlOperation } from 'aws-amplify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { sendEmail } from '../graphql/queries';

const Contact = (props) => {
  const { inRecaptchaRef } = { ...props };
  const { t } = useTranslation(['translation']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const i18nMsg = {
    title: t('contact.email.title'),
    headingLabel: t('contact.email.headingLabel'),
    textLabel: t('contact.email.textLabel'),
    // confHeading: t('contact.email.confirmation.heading'),
    // confMessage: t('contact.email.confirmation.message'),
  };

  const sendingEmail = (token) => {
    const payload = {
      email,
      subject,
      name,
      message,
      i18nMsg,
      token,
    };

    setIsLoading(true);

    API.graphql(graphqlOperation(sendEmail, payload))
      .then(() => {
        setIsSent(true);
        setSendFailed(false);
        setIsLoading(false);
      })
      // .catch(() => {
      .catch((err) => {
        console.log('err: ', err);
        setIsSent(false);
        setSendFailed(true);
        setIsLoading(false);
      });
  };

  const submitHandler = (evt) => {
    const form = evt.currentTarget;

    evt.preventDefault();
    evt.stopPropagation();

    if (form.checkValidity()) {
      inRecaptchaRef.current.execute()
        .then((token) => {
          // console.log(token);
          sendingEmail(token);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    setValidated(true);
  };

  return (
    <div className="Contact py-4 mb-4">
      <h2 className="text-center">{t('contact.heading1')}</h2>
      {isSent
        ? (
          <div className="border rounded p-4">
            <p>{`${t('contact.t1')}.`}</p>
            <p>{`${t('contact.t2')}.`}</p>
            <p>{`${t('contact.t3')}.`}</p>
          </div>
        )
        : (
          <Form onSubmit={submitHandler} noValidate validated={validated} className="border rounded p-4">
            <Form.Group controlId="contactName">
              {/* <Form.Label>{t('contact.field1.label')}</Form.Label> */}
              <Form.Control type="text" placeholder={t('contact.field1.placeholder')} onChange={(evt) => setName(evt.target.value)} required aria-describedby="contactUsernameHelpBlock" className="border-0" />
              <Form.Control.Feedback type="invalid" id="contactUsernameHelpBlock" style={{ paddingLeft: '0.75rem' }}>{t('contact.feedback.required')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="contactEmail">
              {/* <Form.Label>{t('contact.field2.label')}</Form.Label> */}
              <Form.Control type="email" placeholder={t('contact.field2.placeholder')} onChange={(evt) => setEmail(evt.target.value)} required aria-describedby="contactEmailHelpBlock" className="border-0" />
              <Form.Control.Feedback type="invalid" id="contactEmailHelpBlock" style={{ paddingLeft: '0.75rem' }}>{t('contact.feedback.required')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="contactSubject">
              {/* <Form.Label>{t('contact.field3.label')}</Form.Label> */}
              <Form.Control type="text" placeholder={t('contact.field3.placeholder')} onChange={(evt) => setSubject(evt.target.value)} className="border-0" />
            </Form.Group>
            <Form.Group controlId="contactMessage">
              {/* <Form.Label>{t('contact.field4.label')}</Form.Label> */}
              <Form.Control as="textarea" row="3" placeholder={t('contact.field4.placeholder')} onChange={(evt) => setMessage(evt.target.value)} required aria-describedby="contactMessageHelpBlock" className="border-0" />
              <Form.Control.Feedback type="invalid" id="contactMessageHelpBlock" style={{ paddingLeft: '0.75rem' }}>{t('contact.feedback.required')}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="outline-primary" size="md" block className="w-50 text-center rounded-pill mx-auto" type="submit">
              {isLoading
                ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"><span className="sr-only">{t('general.loading')}</span></Spinner>
                : t('contact.btnSubmit')}
            </Button>
            {sendFailed && <Form.Control.Feedback className="invalid-feedback text-center mt-3">{t('contact.errors.emailSending')}</Form.Control.Feedback>}
          </Form>
        )}
    </div>
  );
};

export default Contact;
