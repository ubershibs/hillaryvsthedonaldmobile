import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

// The Board
// Sets (or resets) the board
export function setBoard(state, width, height, board) {
  return state.set('board', Map({grid: List(board), width: width, height: height}));
}

// Change the contents of a cell from
export function updateSquare(state, x, y, newValue) {
  const width = state.getIn(['board', 'width']);
  return state.setIn(['board', 'grid', y * width + x], newValue);
}

// The Character
export function resetCharacter(state, character) {
  return state.set('character', Map(character));
}

export function setLevels(characterState, characteristic, delta) {
  return characterState.update(characteristic, original => original + delta);
}

export function pickupWeapon(characterState, weapon) {
  return characterState.set('weapon', weapon);
}

export function moveCharacter(characterState, newCoords) {
  return characterState.set('position', newCoords);
}
