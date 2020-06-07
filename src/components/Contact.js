import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API, graphqlOperation } from 'aws-amplify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { sendEmail } from '../graphql/queries';

const Contact = () => {
  const { t } = useTranslation(['translation']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [validated, setValidated] = useState(false);

  const i18nMsg = {
    title: t('contact.email.title'),
    headingLabel: t('contact.email.headingLabel'),
    textLabel: t('contact.email.textLabel'),
    // confHeading: t('contact.email.confirmation.heading'),
    // confMessage: t('contact.email.confirmation.message'),
  };

  const submitHandler = (evt) => {
    const form = evt.currentTarget;

    evt.preventDefault();
    evt.stopPropagation();

    // console.log('form.checkValidity(): ', form.checkValidity());
    if (form.checkValidity()) {
      const payload = {
        email,
        subject,
        name,
        message,
        i18nMsg,
      };
      // todo: send email: using backend environment variables / secrets manager
      API.graphql(graphqlOperation(sendEmail, payload))
        // .then(() => {
        .then((res) => {
          console.log('res: ', res);
          setIsSent(true);
          setSendFailed(false);
        })
        // .catch(() => {
        .catch((err) => {
          console.error(err.errors[0].message);
          setIsSent(false);
          setSendFailed(true);
        });
    }

    setValidated(true);
  };

  return (
    <div className="Contact p-4">
      <h2 className="text-center">{t('contact.heading1')}</h2>
      {sendFailed && <p>{t('contact.errors.emailSending')}</p>}
      {isSent
        ? (
          <>
            <p>{`${t('contact.t1')}.`}</p>
            <p>{`${t('contact.t2')}.`}</p>
            <p>{`${t('contact.t3')}.`}</p>
          </>
        )
        : (
          <Form onSubmit={submitHandler} noValidate validated={validated}>
            <Form.Group controlId="contactName">
              {/* <Form.Label>{t('contact.field1.label')}</Form.Label> */}
              <Form.Control type="text" placeholder={t('contact.field1.placeholder')} onChange={(evt) => setName(evt.target.value)} required aria-describedby="contactUsernameHelpBlock" />
              <Form.Control.Feedback type="invalid" id="contactUsernameHelpBlock">{t('contact.feedback.required')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="contactEmail">
              {/* <Form.Label>{t('contact.field2.label')}</Form.Label> */}
              <Form.Control type="email" placeholder={t('contact.field2.placeholder')} onChange={(evt) => setEmail(evt.target.value)} required aria-describedby="contactEmailHelpBlock" />
              <Form.Control.Feedback type="invalid" id="contactEmailHelpBlock">{t('contact.feedback.required')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="contactSubject">
              {/* <Form.Label>{t('contact.field3.label')}</Form.Label> */}
              <Form.Control type="text" placeholder={t('contact.field3.placeholder')} onChange={(evt) => setSubject(evt.target.value)} />
            </Form.Group>
            <Form.Group controlId="contactMessage">
              {/* <Form.Label>{t('contact.field4.label')}</Form.Label> */}
              <Form.Control as="textarea" row="3" placeholder={t('contact.field4.placeholder')} onChange={(evt) => setMessage(evt.target.value)} required aria-describedby="contactMessageHelpBlock" />
              <Form.Control.Feedback type="invalid" id="contactMessageHelpBlock">{t('contact.feedback.required')}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="outline-primary" size="md" className="w-100 text-center" type="submit">{t('contact.btnSubmit')}</Button>
          </Form>
        )}
    </div>
  );
};

export default Contact;
