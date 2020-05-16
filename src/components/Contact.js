import React from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';

const Contact = () => {
  const { t } = useTranslation(['translation']);
  return (
    <div>
      <h2>{t('contact.title')}</h2>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>{t('contact.filed1.desc')}</Form.Label>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Contact;
