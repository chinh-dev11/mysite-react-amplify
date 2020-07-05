/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      order
      name
      type
      languages
      image
      alt
      url
      appName
      enabled
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
      id
      order
      name
      type
      languages
      image
      alt
      url
      appName
      enabled
    }
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
      id
      order
      name
      type
      languages
      image
      alt
      url
      appName
      enabled
    }
  }
`;
export const createEducation = /* GraphQL */ `
  mutation CreateEducation(
    $input: CreateEducationInput!
    $condition: ModelEducationConditionInput
  ) {
    createEducation(input: $input, condition: $condition) {
      id
      name
      type
      completedDate
      languages
      image
      alt
      url
      urlFrom
      enabled
      institution
    }
  }
`;
export const updateEducation = /* GraphQL */ `
  mutation UpdateEducation(
    $input: UpdateEducationInput!
    $condition: ModelEducationConditionInput
  ) {
    updateEducation(input: $input, condition: $condition) {
      id
      name
      type
      completedDate
      languages
      image
      alt
      url
      urlFrom
      enabled
      institution
    }
  }
`;
export const deleteEducation = /* GraphQL */ `
  mutation DeleteEducation(
    $input: DeleteEducationInput!
    $condition: ModelEducationConditionInput
  ) {
    deleteEducation(input: $input, condition: $condition) {
      id
      name
      type
      completedDate
      languages
      image
      alt
      url
      urlFrom
      enabled
      institution
    }
  }
`;
export const createQuery = /* GraphQL */ `
  mutation CreateQuery(
    $input: CreateQueryInput!
    $condition: ModelQueryConditionInput
  ) {
    createQuery(input: $input, condition: $condition) {
      sendEmail {
        message
      }
      getProject {
        id
        order
        name
        type
        languages
        image
        alt
        url
        appName
        enabled
      }
      listProjects {
        items {
          id
          order
          name
          type
          languages
          image
          alt
          url
          appName
          enabled
        }
        nextToken
      }
      getProjectByOrder {
        items {
          id
          order
          name
          type
          languages
          image
          alt
          url
          appName
          enabled
        }
        nextToken
      }
      getEducation {
        id
        name
        type
        completedDate
        languages
        image
        alt
        url
        urlFrom
        enabled
        institution
      }
      listEducations {
        items {
          id
          name
          type
          completedDate
          languages
          image
          alt
          url
          urlFrom
          enabled
          institution
        }
        nextToken
      }
      getEducByCompletedDate {
        items {
          id
          name
          type
          completedDate
          languages
          image
          alt
          url
          urlFrom
          enabled
          institution
        }
        nextToken
      }
      getQuery {
        sendEmail {
          message
        }
        getProject {
          id
          order
          name
          type
          languages
          image
          alt
          url
          appName
          enabled
        }
        listProjects {
          nextToken
        }
        getProjectByOrder {
          nextToken
        }
        getEducation {
          id
          name
          type
          completedDate
          languages
          image
          alt
          url
          urlFrom
          enabled
          institution
        }
        listEducations {
          nextToken
        }
        getEducByCompletedDate {
          nextToken
        }
        listQuerys {
          nextToken
        }
      }
      listQuerys {
        nextToken
      }
    }
  }
`;
export const updateQuery = /* GraphQL */ `
  mutation UpdateQuery(
    $input: UpdateQueryInput!
    $condition: ModelQueryConditionInput
  ) {
    updateQuery(input: $input, condition: $condition) {
      sendEmail {
        message
      }
      getProject {
        id
        order
        name
        type
        languages
        image
        alt
        url
        appName
        enabled
      }
      listProjects {
        items {
          id
          order
          name
          type
          languages
          image
          alt
          url
          appName
          enabled
        }
        nextToken
      }
      getProjectByOrder {
        items {
          id
          order
          name
          type
          languages
          image
          alt
          url
          appName
          enabled
        }
        nextToken
      }
      getEducation {
        id
        name
        type
        completedDate
        languages
        image
        alt
        url
        urlFrom
        enabled
        institution
      }
      listEducations {
        items {
          id
          name
          type
          completedDate
          languages
          image
          alt
          url
          urlFrom
          enabled
          institution
        }
        nextToken
      }
      getEducByCompletedDate {
        items {
          id
          name
          type
          completedDate
          languages
          image
          alt
          url
          urlFrom
          enabled
          institution
        }
        nextToken
      }
      getQuery {
        sendEmail {
          message
        }
        getProject {
          id
          order
          name
          type
          languages
          image
          alt
          url
          appName
          enabled
        }
        listProjects {
          nextToken
        }
        getProjectByOrder {
          nextToken
        }
        getEducation {
          id
          name
          type
          completedDate
          languages
          image
          alt
          url
          urlFrom
          enabled
          institution
        }
        listEducations {
          nextToken
        }
        getEducByCompletedDate {
          nextToken
        }
        listQuerys {
          nextToken
        }
      }
      listQuerys {
        nextToken
      }
    }
  }
`;
export const deleteQuery = /* GraphQL */ `
  mutation DeleteQuery(
    $input: DeleteQueryInput!
    $condition: ModelQueryConditionInput
  ) {
    deleteQuery(input: $input, condition: $condition) {
      sendEmail {
        message
      }
      getProject {
        id
        order
        name
        type
        languages
        image
        alt
        url
        appName
        enabled
      }
      listProjects {
        items {
          id
          order
          name
          type
          languages
          image
          alt
          url
          appName
          enabled
        }
        nextToken
      }
      getProjectByOrder {
        items {
          id
          order
          name
          type
          languages
          image
          alt
          url
          appName
          enabled
        }
        nextToken
      }
      getEducation {
        id
        name
        type
        completedDate
        languages
        image
        alt
        url
        urlFrom
        enabled
        institution
      }
      listEducations {
        items {
          id
          name
          type
          completedDate
          languages
          image
          alt
          url
          urlFrom
          enabled
          institution
        }
        nextToken
      }
      getEducByCompletedDate {
        items {
          id
          name
          type
          completedDate
          languages
          image
          alt
          url
          urlFrom
          enabled
          institution
        }
        nextToken
      }
      getQuery {
        sendEmail {
          message
        }
        getProject {
          id
          order
          name
          type
          languages
          image
          alt
          url
          appName
          enabled
        }
        listProjects {
          nextToken
        }
        getProjectByOrder {
          nextToken
        }
        getEducation {
          id
          name
          type
          completedDate
          languages
          image
          alt
          url
          urlFrom
          enabled
          institution
        }
        listEducations {
          nextToken
        }
        getEducByCompletedDate {
          nextToken
        }
        listQuerys {
          nextToken
        }
      }
      listQuerys {
        nextToken
      }
    }
  }
`;
