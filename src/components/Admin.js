import React, { useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import Button from 'react-bootstrap/Button';
import { createProject, createEducation } from '../graphql/mutations';
import projects from '../data/project.json';
import educations from '../data/education.json';

const Admin = () => {
  console.log('Admin');

  const projectHandler = () => {
    const putProject = async (element) => {
      const createNewItem = () => API.graphql(graphqlOperation(createProject, { input: element }));
      const result = await createNewItem();
      console.log(result.data.createProject);
    };

    projects.forEach((element) => {
      console.log(element);
      putProject(element);
    });
  };

  const educationHandler = () => {
    const putEducation = async (element) => {
      const createNewItem = () => API.graphql(graphqlOperation(createEducation, { input: element }));
      const result = await createNewItem();
      console.log(result.data.createEducation);
    };

    educations.forEach((element) => {
      console.log(element);
      putEducation(element);
    });
  };

  useEffect(() => {
    console.log('useEffect');
  }, []);

  return (
    <div className="Admin">
      <Button variant="primary" type="button" onClick={projectHandler}>Put Projects</Button>
      <Button variant="info" type="button" onClick={educationHandler}>Put Educations</Button>
    </div>
  );
};

export default Admin;
