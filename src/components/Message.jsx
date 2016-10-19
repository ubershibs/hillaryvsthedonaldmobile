import React from 'react';

const Message = ({message, type}) => (
  <div
    className={type}
  >
    {message}
  </div>
);

export default Message;
