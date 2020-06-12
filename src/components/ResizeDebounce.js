import React from 'react';
// import ReactDOM from "react-dom";

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this);
    }, ms);
  };
}

const ResizeDebounce = () => {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  React.useEffect(() => {
    console.log('useEffect');
    const debouncedHandleResize = debounce(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);
  return (
    <div>
      Rendered at
      {' '}
      {dimensions.width}
      {' '}
      x
      {' '}
      {dimensions.height}
    </div>
  );
};

export default ResizeDebounce;
