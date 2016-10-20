import React from 'react';

class Square extends React.Component {
  render() {
    return (
      <div
        className={"square level" + this.props.fill}>
        {this.props.children}
      </div>
    )
  }
}

export default Square;
