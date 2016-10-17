import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Row from '../components/Row';
import Square from '../components/Square';
import * as Actions from '../actions/creators';

const Board = ({width, height, grid, actions}) => {
  const handleKey = (e) => {
    e = e || window.event;

    if (e.keyCode == '38') {
      // up arrow
      console.log('Key Up!');
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }
  };

  let rows = [];

  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(
        <Square
          key={x}
          fill={grid[y * width + x]}
        />
      );
    }
    rows.push(<Row key={y}>{row}</Row>);
  }

  return <div onKeyDown={handleKey}>{rows}</div>;
};

function checkKey(e) {



}
/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  grid: state.board.grid,
  width: state.board.width,
  height: state.board.height
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
