import {setBoard, updateSquare, resetCharacter, setLevels, pickupWeapon, setPosition, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_BOARD':
      return setBoard(state, action.width, action.height, action.board);
    case 'UPDATE_SQUARE':
      return updateSquare(state, action.x, action.y, action.newValue);
    case 'RESET_CHARACTER':
      return resetCharacter(state, action.character);
    case 'SET_LEVELS':
      return state.update('character',
        characterState => setLevels(characterState, action.characteristic, action.delta));
    case 'PICKUP_WEAPON':
      return state.update('character',
        characterState => pickupWeapon(characterState, action.weapon));
    case 'SET_POSITION':
      return state.update('character',
        characterState => setPosition(characterState, action.newCoords));
  }
  return state;
}
