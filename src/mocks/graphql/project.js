/* eslint-disable import/prefer-default-export */
/* eslint quotes: ["error", "double"] */

export const queryProjectByOrder = /* GraphQL */ `
  query projectByOrder(
    $type: String!,
    $direction: ModelSortDirection = DESC) {
      getProjectByOrder(sortDirection: $direction, type: $type) {
        items {
          id
          name
          languages
          image
          alt
          url
        }
      }
    }
`;

export const inputProjectDelete = {
  input: {
    id: "0c6855ef-cc33-4790-af57-b5462e461835",
  },
};

export const inputProjectCreate = {
  input: {
    order: 6,
    name: "Stock Trader",
    type: "lab",
    languages: ["Vue 2", "Google Web Services", "Bootstrap 4"],
    image: "stock-trader-vue-640.png",
    alt: "Stock Trader",
    url: "https://stock-trader-vue-6bd8c.web.app/",
    enabled: true,
  },
  /* input: {
    order: 5,
    name: "Burger Builder",
    type: "lab",
    languages: ["React 16", "Google Web Services", "Bootstrap 4"],
    image: "burger-builder-react-640.png",
    alt: "Burger Builder",
    url: "https://burger-builder-react-8801d.web.app/",
    enabled: true,
  }, */
  /* input: {
    order: 4,
    name: "Recipe Book",
    type: "lab",
    languages: ["Angular 7", "Google Web Services", "Bootstrap 4"],
    image: "recipe-book-ng-640.png",
    alt: "Recipe Book",
    url: "https://recipe-book-ng-183d5.firebaseapp.com/",
    enabled: true,
  }, */
  /* input: {
    order: 3,
    name: "Videotron",
    type: "work",
    languages: ["AngularJS (v1.5)", "jQuery", "Java", "Oracle Commerce"],
    image: "videotron-mobility-640-en.jpg",
    alt: "Videotron",
    url: "https://www.videotron.com/",
    enabled: true,
  }, */
  /* input: {
    order: 2,
    name: "clubillico",
    type: "work",
    languages: ["AngularJS (v1.6)", "Java", "Oracle"],
    image: "clubillico-640-en.jpg",
    alt: "clubillico",
    url: "https://clubillico.videotron.com/",
    enabled: true,
  }, */
  /* input: {
    order: 1,
    name: "illicoweb",
    type: "work",
    languages: ["AngularJS (v1.6)", "jQuery", "Java"],
    image: "illicoweb-640-en.jpg",
    alt: "illicoweb",
    url: "https://illicoweb.videotron.com/",
    enabled: true,
  }, */
};
