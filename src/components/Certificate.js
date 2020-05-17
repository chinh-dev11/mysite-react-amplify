import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import { listCertificates } from '../graphql/queries';
import { createCertificate, deleteCertificate } from '../graphql/mutations';

import { createInput, deleteInput } from '../mocks/certificate';

const Certificate = () => {
  const { t } = useTranslation(['translation']);
  const [list, setList] = useState([]);
  const [item, setItem] = useState(null);
  const [itemDeleted, setItemDeleted] = useState(false);

  const listQuery = async () => {
    setList([]);
    try {
      const result = await API.graphql(graphqlOperation(listCertificates));
      console.log(result.data.listCertificates.items);
      setList(result.data.listCertificates.items);
    } catch (e) {
      console.log(e);
    }
  };

  const addCertificate = async () => {
    setItem(null);

    try {
      const result = await API.graphql(graphqlOperation(createCertificate, createInput));
      console.log(result);
      setItem(result);
    } catch (e) {
      console.log(e);
    }
  };

  const removeCertificate = async () => {
    setItemDeleted(false);
    try {
      const result = await API.graphql(graphqlOperation(deleteCertificate, deleteInput));
      console.log('result: ', result.data.deleteCertificate.name);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>{t('certificate.title')}</h2>
      <Button variant="primary" onClick={listQuery}>Get certificate list</Button>
      {list.length > 0 && <ol>{list.map((elem) => <li key={elem.id}>{elem.name}</li>)}</ol>}
      <Button variant="primary" onClick={addCertificate}>Add certificate</Button>
      {item && <p>Added!</p>}
      <Button variant="primary" onClick={removeCertificate}>Remove certificate</Button>
      {itemDeleted && <p>Removed!</p>}
    </div>
  );
};

export default Certificate;
