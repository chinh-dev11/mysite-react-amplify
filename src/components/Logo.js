import React from 'react';

const Logo = () => {
  const styleInline = {
    display: 'inline-block',
    fontStyle: 'normal',
    fontFamily: 'Comfortaa, Helvetica, sans-serif',
    color: '#fff',
    backgroundColor: '#000',
    fontSize: '1rem',
    padding: '0.5rem',
    borderRadius: '2rem',
  };
  return (
    <div>
      <i style={styleInline}>clê</i>
    </div>
  );
};

export default Logo;
