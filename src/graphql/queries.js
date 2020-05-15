/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getApps = /* GraphQL */ `
  query GetApps($id: ID!) {
    getApps(id: $id) {
      id
      name
      type
      languages
      image
      alt
      url
    }
  }
`;
export const listAppss = /* GraphQL */ `
  query ListAppss(
    $filter: ModelAppsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        languages
        image
        alt
        url
      }
      nextToken
    }
  }
`;
export const getCerts = /* GraphQL */ `
  query GetCerts($id: ID!) {
    getCerts(id: $id) {
      id
      name
      completedDate
      languages
      image
      alt
      url
      urlSource
      label
      enabled
    }
  }
`;
export const listCertss = /* GraphQL */ `
  query ListCertss(
    $filter: ModelCertsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCertss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        completedDate
        languages
        image
        alt
        url
        urlSource
        label
        enabled
      }
      nextToken
    }
  }
`;
