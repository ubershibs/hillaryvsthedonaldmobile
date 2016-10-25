import React from 'react';
require('../styles/styles.scss');

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.handleLeft = this.handleLeft.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.handleRight = this.handleRight.bind(this);
  }
  render() {
    return (
      <div className="controls">
        <button className="arrow" onClick={this.handleLeft}>&larr;</button>
        <button className="arrow" onClick={this.handleUp}>&uarr;</button>
        <button className="arrow" onClick={this.handleDown}>&darr;</button>
        <button className="arrow" onClick={this.handleRight}>&rarr;</button>
      </div>
    );
  }
  handleLeft(e) {
    e.preventDefault();
    this.props.onChange(-1, 0);
  }
  handleUp(e) {
    e.preventDefault();
    this.props.onChange(0, -1);
  }
  handleDown(e) {
    e.preventDefault();
    this.props.onChange(0, 1);
  }
  handleRight(e) {
    e.preventDefault();
    this.props.onChange(1, 0);
  }
}

export default Controls;
