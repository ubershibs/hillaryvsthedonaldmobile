import React from 'react';

const Square = ({children, fill = false}) => (
  <div
    className="square"
    style={{
      backgroundColor:  fill > 0 ? fill === 2 ? 'blue' : '#000' : '#fff'
    }}
  >
    {children}
  </div>
);

export default Square;
