const transitionHelper = {
  defaultStyle: {
    transition: 'opacity 1s ease',
    opacity: 0,
  },
  transitionStyles: {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  },
  defaultTimeout: {
    appear: 100,
    enter: 300,
    exit: 300,
  },
};

export default transitionHelper;
