import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import { listProjects } from '../graphql/queries';
import { createProject, deleteProject } from '../graphql/mutations';

import { createInput, deleteInput } from '../mocks/project';

const Project = () => {
  const { t } = useTranslation(['translation']);
  const [list, setList] = useState([]);
  const [item, setItem] = useState(null);
  const [itemDeleted, setItemDeleted] = useState(false);

  const listQuery = async () => {
    setList([]);
    try {
      const result = await API.graphql(graphqlOperation(listProjects));
      console.log(result.data.listProjects.items);
      setList(result.data.listProjects.items);
    } catch (e) {
      console.log(e);
    }
  };

  const addProject = async () => {
    setItem(null);

    try {
      const result = await API.graphql(graphqlOperation(createProject, createInput));
      console.log(result);
      setItem(result);
    } catch (e) {
      console.log(e);
    }
  };

  const removeProject = async () => {
    setItemDeleted(false);
    try {
      const result = await API.graphql(graphqlOperation(deleteProject, deleteInput));
      console.log('result: ', result.data.deleteProject.name);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>{t('project.title')}</h2>
      <Button variant="primary" onClick={listQuery}>Get project list</Button>
      {list.length > 0 && <ol>{list.map((elem) => <li key={elem.id}>{elem.name}</li>)}</ol>}
      <Button variant="primary" onClick={addProject}>Add project</Button>
      {item && <p>Added!</p>}
      <Button variant="primary" onClick={removeProject}>Remove project</Button>
      {itemDeleted && <p>Removed!</p>}
    </div>
  );
};

export default Project;
