/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const sendEmail = /* GraphQL */ `
  query SendEmail(
    $name: String!
    $email: String!
    $subject: String
    $message: String!
    $i18nMsg: MsgLang
    $token: String!
    $reCaptchaSecretKey: String
  ) {
    sendEmail(
      name: $name
      email: $email
      subject: $subject
      message: $message
      i18nMsg: $i18nMsg
      token: $token
      reCaptchaSecretKey: $reCaptchaSecretKey
    ) {
      message
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getProjectByOrder = /* GraphQL */ `
  query GetProjectByOrder(
    $type: String
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getProjectByOrder(
      type: $type
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getEducation = /* GraphQL */ `
  query GetEducation($id: ID!) {
    getEducation(id: $id) {
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
export const listEducations = /* GraphQL */ `
  query ListEducations(
    $filter: ModelEducationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEducations(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getEducByCompletedDate = /* GraphQL */ `
  query GetEducByCompletedDate(
    $type: String
    $completedDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEducationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getEducByCompletedDate(
      type: $type
      completedDate: $completedDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getQuery = /* GraphQL */ `
  query GetQuery($id: ID!) {
    getQuery(id: $id) {
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
export const listQuerys = /* GraphQL */ `
  query ListQuerys(
    $filter: ModelQueryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuerys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
