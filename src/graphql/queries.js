/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const sendEmail = /* GraphQL */ `
  query SendEmail(
    $name: String!
    $email: String!
    $subject: String
    $message: String!
    $i18nMsg: MsgLang
  ) {
    sendEmail(
      name: $name
      email: $email
      subject: $subject
      message: $message
      i18nMsg: $i18nMsg
    ) {
      value
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
        enabled
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
      }
      nextToken
    }
  }
`;
