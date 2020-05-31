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
