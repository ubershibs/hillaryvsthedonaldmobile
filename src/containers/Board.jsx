import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Row from '../components/Row';
import Square from '../components/Square';
import * as Actions from '../actions/creators';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rows = [];
    for (let y = 0; y < this.props.height; y++) {
      const row = [];
      for (let x = 0; x < this.props.width; x++) {
        row.push(
          <Square
            key={x}
            fill={this.props.grid[y * this.props.width + x]}
          />
        );
      }
      rows.push(<Row key={y}>{row}</Row>);
    }
    return <div >{rows}</div>;
  }
  componentDidMount() {
    window.addEventListener('keydown', this.checkKey.bind(this));
  }
  checkKey(e) { //
    e = e || window.event;
    switch(e.keyCode) {
      case '38': // Up
        e.preventDefault();
        checkMove(0, 1);
        break;
      case '40': // Down
        e.preventDefault();
        checkMove(0, 1);
        break;
      case '37': // Left
        e.preventDefault();
        checkMove(-1, 0);
        break;
      case '39': // Right
        e.preventDefault();
        checkMove(1, 0);
        break;
    }
  }
  checkMove(deltaX, deltaY) {
    const newX = this.props.position[0] + deltaX;
    const newY = this.props.position[0] + deltaY;
    const newSquareValue = this.props.grid[newY * this.props.width + newX];
    console.log(newX + 'x' + newY + ': ' + newSquareValue);
    if (newSquareValue == 0) {
      this.props.actions.setPosition([newX, newY]);
      this.props.actions.updateSquare(newX, newY, 2);
      this.props.actions.updateSquare(this.props.position[0],this.props.position[1], 0);
    }
  }
};

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  grid: state.board.grid,
  width: state.board.width,
  height: state.board.height,
  position: state.character.positionm
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
});

/**
 * Connect the component to
 * the Redux store.
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
