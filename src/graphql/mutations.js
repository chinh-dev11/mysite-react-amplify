/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
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
export const createCertificate = /* GraphQL */ `
  mutation CreateCertificate(
    $input: CreateCertificateInput!
    $condition: ModelCertificateConditionInput
  ) {
    createCertificate(input: $input, condition: $condition) {
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
export const updateCertificate = /* GraphQL */ `
  mutation UpdateCertificate(
    $input: UpdateCertificateInput!
    $condition: ModelCertificateConditionInput
  ) {
    updateCertificate(input: $input, condition: $condition) {
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
export const deleteCertificate = /* GraphQL */ `
  mutation DeleteCertificate(
    $input: DeleteCertificateInput!
    $condition: ModelCertificateConditionInput
  ) {
    deleteCertificate(input: $input, condition: $condition) {
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
