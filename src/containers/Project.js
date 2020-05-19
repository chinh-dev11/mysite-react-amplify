import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
// import { API, graphqlOperation } from 'aws-amplify';
// import { useTranslation } from 'react-i18next';
// import Carousel from 'react-bootstrap/Carousel';
// import { queryProjectByOrder } from '../queries/project';
// import ProjectCarousel from '../components/ProjectCarousel';
import ProjectWork from '../components/ProjectWork';
// import ProjectLab from '../components/ProjectLab';

const Project = () =>
// const { t } = useTranslation(['translation']);
// const [workList, setWorkList] = useState([]);

// const getProjectList = (type, direction) => API.graphql(graphqlOperation(queryProjectByOrder, { type, direction }));
//
/* useEffect(() => {
    getProjectList('lab')
      .then((res) => {
        console.log(res);
        setWorkList(res.data.getProjectByOrder.items);
      })
      .catch((e) => {
        // throw Error(e);
        console.log(e);
      });
  }, []); */


  (
    <div className="px-4">
      <ProjectWork />
      {/* <ProjectLab /> */}
      {/* <ProjectCarousel elems={workList} /> */}
      {/* <Carousel>
        <Carousel.Item>
          <img src="https://static.chinhle.ca/project/stock-trader-vue-640.png" alt="Stock trader" />
          <Carousel.Caption>
            <h3>Stock trader</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://static.chinhle.ca/project/burger-builder-react-640.png" alt="Burger builder" />
          <Carousel.Caption>
            <h3>Burger builder</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://static.chinhle.ca/project/recipe-book-ng-640.png" alt="Recipe book" />
          <Carousel.Caption>
            <h3>Recipe book</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
    </div>
  );
export default Project;
