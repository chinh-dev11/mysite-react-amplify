import React, { useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createProject } from '../graphql/mutations';
import projects from '../data/projects.json';

const Admin = () => {
  console.log('Admin');
  const createItem = async (element) => {
    const createNewItem = () => API.graphql(graphqlOperation(createProject, { input: element }));
    const result = await createNewItem();
    console.log(result);
  };

  const createHandler = () => {
    projects.forEach((element) => {
      console.log(element);
      createItem(element);
    });
  };

  useEffect(() => {
    console.log('useEffect');
  }, []);

  return (
    <div className="Admin">
      <button type="button" onClick={createHandler}>Put Projects</button>
    </div>
  );
};

export default Admin;
