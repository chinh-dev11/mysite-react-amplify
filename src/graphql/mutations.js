/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createApps = /* GraphQL */ `
  mutation CreateApps(
    $input: CreateAppsInput!
    $condition: ModelAppsConditionInput
  ) {
    createApps(input: $input, condition: $condition) {
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
export const updateApps = /* GraphQL */ `
  mutation UpdateApps(
    $input: UpdateAppsInput!
    $condition: ModelAppsConditionInput
  ) {
    updateApps(input: $input, condition: $condition) {
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
export const deleteApps = /* GraphQL */ `
  mutation DeleteApps(
    $input: DeleteAppsInput!
    $condition: ModelAppsConditionInput
  ) {
    deleteApps(input: $input, condition: $condition) {
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
export const createCerts = /* GraphQL */ `
  mutation CreateCerts(
    $input: CreateCertsInput!
    $condition: ModelCertsConditionInput
  ) {
    createCerts(input: $input, condition: $condition) {
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
export const updateCerts = /* GraphQL */ `
  mutation UpdateCerts(
    $input: UpdateCertsInput!
    $condition: ModelCertsConditionInput
  ) {
    updateCerts(input: $input, condition: $condition) {
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
export const deleteCerts = /* GraphQL */ `
  mutation DeleteCerts(
    $input: DeleteCertsInput!
    $condition: ModelCertsConditionInput
  ) {
    deleteCerts(input: $input, condition: $condition) {
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
