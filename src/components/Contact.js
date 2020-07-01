import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API, graphqlOperation } from 'aws-amplify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { sendEmail } from '../graphql/queries';

const Contact = (props) => {
  // const { inRecaptchaRef } = { ...props };
  const { t } = useTranslation(['translation']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const stylesInline = {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  };

  const i18nMsg = {
    title: t('contact.email.title'),
    headingLabel: t('contact.email.headingLabel'),
    textLabel: t('contact.email.textLabel'),
    // confHeading: t('contact.email.confirmation.heading'),
    // confMessage: t('contact.email.confirmation.message'),
  };

  const sendingEmail = (token) => {
    const reCaptchaSecretKey = process.env.REACT_APP_RECAPTCHA_SECRET_KEY; // localhost
    const payload = {
      email,
      subject,
      name,
      message,
      i18nMsg,
      token,
      reCaptchaSecretKey,
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
      executeRecaptcha('form/contact')
        .then((token) => {
          // console.log(token);
          sendingEmail(token);
        });
      /* inRecaptchaRef.current.execute({action: 'contact-form'})
        .then((token) => {
          // console.log(token);
          sendingEmail(token);
        })
        .catch((err) => {
          console.error(err);
        }); */
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
              <Form.Control type="text" placeholder={t('contact.field1.label')} onChange={(evt) => setName(evt.target.value)} required className="border-0" style={stylesInline} aria-describedby="contactNameHelpBlock" aria-required />
              <Form.Control.Feedback type="invalid" id="contactNameHelpBlock" style={{ paddingLeft: '0.75rem' }}>{`${t('contact.field1.label')} ${t('contact.feedback.required')}`}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="contactEmail">
              {/* <Form.Label>{t('contact.field2.label')}</Form.Label> */}
              <Form.Control type="email" placeholder={t('contact.field2.label')} onChange={(evt) => setEmail(evt.target.value)} required className="border-0" style={stylesInline} aria-describedby="contactEmailHelpBlock" aria-required />
              <Form.Control.Feedback type="invalid" id="contactEmailHelpBlock" style={{ paddingLeft: '0.75rem' }}>{`${t('contact.field2.label')} ${t('contact.feedback.required')}`}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="contactSubject">
              {/* <Form.Label>{t('contact.field3.label')}</Form.Label> */}
              <Form.Control type="text" placeholder={t('contact.field3.label')} onChange={(evt) => setSubject(evt.target.value)} className="border-0" style={stylesInline} />
            </Form.Group>
            <Form.Group controlId="contactMessage">
              {/* <Form.Label>{t('contact.field4.label')}</Form.Label> */}
              <Form.Control as="textarea" row="3" placeholder={t('contact.field4.label')} onChange={(evt) => setMessage(evt.target.value)} required className="border-0" style={stylesInline} aria-describedby="contactMessageHelpBlock" aria-required />
              <Form.Control.Feedback type="invalid" id="contactMessageHelpBlock" style={{ paddingLeft: '0.75rem' }}>{`${t('contact.field3.label')} ${t('contact.feedback.required')}`}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="outline-primary" size="md" block className="w-50 text-center rounded-pill mx-auto" type="submit" aria-label={t('contact.btnSubmit')}>
              {isLoading
                ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"><span className="sr-only">{t('general.loading')}</span></Spinner>
                : t('contact.btnSubmit')}
            </Button>
            <Form.Control.Feedback type="invalid" className={`${sendFailed ? 'd-block' : ''} text-center mt-3`} aria-hidden={!sendFailed}>{t('errors.somethingWrong')}</Form.Control.Feedback>
          </Form>
        )}
    </div>
  );
};

export default Contact;
