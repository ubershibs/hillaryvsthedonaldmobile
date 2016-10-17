export function setBoard(width, height, board) {
  return {
    type: 'SET_BOARD',
    width,
    height,
    board: board || new Array(width * height).fill(0)
  };
}

export function updateSquare(x, y, newValue) {
  return {
    type: 'UPDATE_SQUARE',
    x,
    y,
    newValue
  };
}

export function resetCharacter(character) {
  return {
    type: 'RESET_CHARACTER',
    character: character || {level: 1, xp: 0, health: 100, weapon: 0}
  };
}

export function setLevels(characteristic, delta) {
  return {
    type: 'SET_LEVELS',
    characteristic,
    delta
  };
}

export function pickupWeapon(weapon) {
  return {
    type: 'PICKUP_WEAPON',
    weapon
  };
}

export function setPosition(newCoords) {
  return {
    type: 'SET_POSITION',
    newCoords
  };
}
