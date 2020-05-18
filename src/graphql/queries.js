/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const getCertificate = /* GraphQL */ `
  query GetCertificate($id: ID!) {
    getCertificate(id: $id) {
      id
      name
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
export const listCertificates = /* GraphQL */ `
  query ListCertificates(
    $filter: ModelCertificateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCertificates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
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
