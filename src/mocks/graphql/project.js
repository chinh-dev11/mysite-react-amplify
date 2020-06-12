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

export const deleteProject = {
  input: {
    id: "0c6855ef-cc33-4790-af57-b5462e461835",
  },
};

export const createProject = {
  input: {
    order: 13,
    name: "Mysite with Vue",
    type: "lab",
    languages: "Vue 2, Google Firebase",
    image: "mysite-vue-640x340.png",
    alt: "Mysite with Vue",
    url: "https://vue.chinhle.ca",
    enabled: true,
  },
  /* input: {
    order: 12,
    name: "Scratch Note",
    type: "lab",
    languages: "React 16, Bootstrap 4, Serverless Framework, AWS, Stripe",
    image: "sls-stack-notes-640x340.png",
    alt: "Scratch Note",
    url: "https://sls-stack-notes.chinhle.ca",
    enabled: true,
  }, */
  /* input: {
    order: 11,
    name: "Pomodoro Clock",
    type: "lab",
    languages: "React 16, Redux, Bootstrap 4, Material UI, Sass",
    image: "pomodoro-clock-640x340.png",
    alt: "Pomodoro Clock",
    url: "https://pomodoro-clock.chinhle.ca",
    enabled: true,
  }, */
  /* input: {
    order: 10,
    name: "Calculator",
    type: "lab",
    languages: "React 16, Bootstrap 4, Sass",
    image: "calculator-640x340.png",
    alt: "Calculator",
    url: "https://calculator.chinhle.ca",
    enabled: true,
  }, */
  /* input: {
    order: 9,
    name: "Drum Machine",
    type: "lab",
    languages: "React 16, Bootstrap 4, Sass",
    image: "drum-machine-640x340.png",
    alt: "Drum Machine",
    url: "https://drum-machine.chinhle.ca",
    enabled: true,
  }, */
  /* input: {
    order: 8,
    name: "Markdown Previewer",
    type: "lab",
    languages: "React 16, Bootstrap 4",
    image: "markdown-previewer-640x340.png",
    alt: "Markdown Previewer",
    url: "https://markdown-previewer.chinhle.ca",
    enabled: true,
  }, */
  /* input: {
    order: 7,
    name: "Random Quote",
    type: "lab",
    languages: "React 16, Bootstrap 4, FontAwesome, Sass",
    image: "random-quote-640x340.png",
    alt: "Random Quote",
    url: "https://random-quote.chinhle.ca",
    enabled: true,
  }, */
  /* input: {
    order: 6,
    name: "Stock Trader",
    type: "lab",
    languages: "Vue 2, Google Web Services, Bootstrap 4",
    image: "stock-trader-vue-640x340.png",
    alt: "Stock Trader",
    url: "https://stock-trader-vue-6bd8c.web.app/",
    enabled: true,
  },
  /* input: {
    order: 5,
    name: "Burger Builder",
    type: "lab",
    languages: "React 16, Google Web Services, Bootstrap 4",
    image: "burger-builder-react-640x340.png",
    alt: "Burger Builder",
    url: "https://burger-builder-react-8801d.web.app/",
    enabled: true,
  }, */
  /* input: {
    order: 4,
    name: "Recipe Book",
    type: "lab",
    languages: "Angular 7, Google Web Services, Bootstrap 4",
    image: "recipe-book-ng-640x340.png",
    alt: "Recipe Book",
    url: "https://recipe-book-ng-183d5.firebaseapp.com/",
    enabled: true,
  }, */
  /* input: {
    order: 3,
    name: "Videotron",
    type: "work",
    languages: "AngularJS (v1.5), jQuery, Java, Oracle Commerce",
    image: "videotron-mobility-640x340-en.jpg",
    alt: "Videotron",
    url: "https://www.videotron.com/",
    enabled: true,
  }, */
  /* input: {
    order: 2,
    name: "clubillico",
    type: "work",
    languages: "AngularJS (v1.6), Java, Oracle",
    image: "clubillico-640x340-en.jpg",
    alt: "clubillico",
    url: "https://clubillico.videotron.com/",
    enabled: true,
  }, */
  /* input: {
    order: 1,
    name: "illicoweb",
    type: "work",
    languages: "AngularJS (v1.6), jQuery, Java, Oracle",
    image: "illicoweb-640x340-en.jpg",
    alt: "illicoweb",
    url: "https://illicoweb.videotron.com/",
    enabled: true,
  }, */
};
