import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import {
  logIn, logOut, authIsLogged, setAuthUsername,
} from '../app/authSlice';

import Menu from './Menu';
import Header from './Header';
import Backdrop from '../components/Backdrop';
import About from '../components/About';
import ProjectWork from '../components/ProjectWork';
import ProjectLab from '../components/ProjectLab';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Social from '../components/Social';

import Footer from './Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


function App() {
  // console.log('App');
  // console.log(process.env);
  const payloadAnon = {
    username: process.env.REACT_APP_ANON_USERNAME,
    password: process.env.REACT_APP_ANON_PASSWORD,
  };
  const isAuthenticated = useSelector(authIsLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('useEffect');
    if (!isAuthenticated) {
      Auth.signIn(payloadAnon)
        .then((data) => {
          // console.log(data);
          dispatch(logIn());
          dispatch(setAuthUsername(data.username));
        })
        .catch((err) => {
          console.error(err);
          dispatch(logOut());
          dispatch(setAuthUsername(''));
        // todo: handle error msg
        });
    }
  }, [isAuthenticated, payloadAnon, dispatch]);

  return (
    <div className="App">
      <Header />
      <div className="Content">
        <About />
        <ProjectWork />
        <ProjectLab />
        <Education />
        <Contact />
        <Social />
      </div>
      <Footer />
      <Backdrop />
      <Menu />
    </div>
  );
}

export default App;
