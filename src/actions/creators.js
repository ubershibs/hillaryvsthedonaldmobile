export const setBoard= ({width, height, board}) => ({
  type: 'SET_BOARD',
  width,
  height,
  board
});

export const updateSquare = ({x, y, newValue}) => ({
  type: 'UPDATE_SQUARE',
  x,
  y,
  newValue
});

export const resetCharacter = ({character}) => ({
  type: 'RESET_CHARACTER',
  character: character || {level: 1, xp: 0, health: 100, weapon: 0}
});

export const setLevels = ({characteristic, delta}) => ({
  type: 'SET_LEVELS',
  characteristic,
  delta
});

export const pickupWeapon = ({weapon}) => ({
  type: 'PICKUP_WEAPON',
  weapon
});

export const setPosition = ({newCoords}) => ({
  type: 'SET_POSITION',
  newCoords
});
