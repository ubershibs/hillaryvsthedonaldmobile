import React from 'react';

const style = {
  width: '24px',
  height: '24px',
  border: '1px solid black'
};

const Square = ({children, fill = false}) => (
  <div
    style={{
      ...style,
      backgroundColor:  fill > 0 ? fill === 2 ? 'blue' : '#000' : '#fff'
    }}
  >
    {children}
  </div>
);

export default Square;
