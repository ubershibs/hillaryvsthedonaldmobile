import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Board from './Board.jsx';
import * as Actions from '../actions/creators';

const GameContainer = ({grid, width, height, ) => {


  return <Board />
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  grid: state.board.grid,
  width: state.board.width,
  height: state.board.height,
  position: state.character.position
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
)(GameContainer);
