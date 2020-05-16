import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { API, graphqlOperation } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import { listProjects } from '../graphql/queries';
import { createProject } from '../graphql/mutations';

const Project = () => {
  const { t } = useTranslation(['translation']);
  const [list, setList] = useState([]);
  const [item, setItem] = useState(null);

  const listQuery = async () => {
    setList([]);
    try {
      const result = await API.graphql(graphqlOperation(listProjects));
      setList(result.data.listProjects.items);
    } catch (e) {
      console.log(e);
    }
  };

  const projectMutation = async () => {
    const newProject = {
      input: {
        name: 'clubillico',
        type: 'work',
        languages: 'AngularJS (v1.6), Java, Oracle',
        image: 'clubillico-640-en.jpg',
        alt: 'clubillico',
        url: 'https://clubillico.videotron.com/',
      },
    };
    setItem(null);

    try {
      const result = await API.graphql(graphqlOperation(createProject, newProject));
      console.log(result);
      setItem(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>{t('project.title')}</h2>
      <Button variant="primary" onClick={listQuery}>Get project list</Button>
      {list.length > 0 && <ol>{list.map((elem) => <li key={elem.id}>{elem.name}</li>)}</ol>}
      <Button variant="primary" onClick={projectMutation}>Create project</Button>
      {item && <p>Added!</p>}
    </div>
  );
};

export default Project;
