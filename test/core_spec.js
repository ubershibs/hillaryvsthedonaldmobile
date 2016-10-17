import {expect} from 'chai';
import {List, Map} from 'immutable';

import {setBoard, updateSquare, resetCharacter, setLevels, pickupWeapon} from '../src/core';

describe('game logic', () => {

  describe('createBoard', () => {

    it('adds the squares to the state', () => {
      const state = Map();
      const board = List.of(1, 1, 1, 1, 0, 1, 1, 1, 1);
      const width = 3;
      const height = 3;
      const nextState = setBoard(state, width, height, board);
      expect(nextState).to.equal(Map({
        board: Map({ grid: List.of(1, 1, 1, 1, 0, 1, 1, 1, 1), width: 3, height: 3})
      }));
      expect(state).to.equal(Map());
    });

    it('converts the data to an immutable type', () => {
      const state = Map();
      const board = [1, 1, 1, 1, 0, 1, 1, 1, 1];
      const width = 3;
      const height = 3;
      const nextState = setBoard(state, width, height, board);
      expect(nextState).to.equal(Map({
        board: Map({ grid: List.of(1, 1, 1, 1, 0, 1, 1, 1, 1), width: 3, height: 3})
      }));
      expect(state).to.equal(Map());
    });

  });

  describe('updateSquare', () => {

    it('changes the value a square', () => {
      const state = Map({
        board: Map({ grid: List.of(1, 1, 1, 1, 0, 1, 1, 1, 1), width: 3, height: 3})
      });
      const newValue = 2;
      const x = 2;
      const y = 2;
      const nextState = updateSquare(state, x, y, newValue);
      expect(nextState).to.equal(Map({
        board: Map({ grid: List.of(1, 1, 1, 1, 0, 1, 1, 1, 2), width: 3, height: 3})
      }));
    });

  });

  describe('resetCharacter', () => {

    it('adds the character to the state', () => {
      const state = Map();
      const character = Map({level: 1, xp: 0, health: 100, weapon: 0});
      const nextState = resetCharacter(state, character);
      expect(nextState).to.equal(Map({
        character: Map({level: 1, xp: 0, health: 100, weapon: 0})
      }));
      expect(state).to.equal(Map());
    });

  });

  describe('setLevels', () => {

    it('changes the desired characteristic by the correct amount', () => {
      const characterState = Map({ level: 1, xp: 80, health: 75, weapon: 0});
      const nextState = setLevels(characterState, 'level', 1);
      expect(nextState).to.equal(Map({ level: 2, xp: 80, health: 75, weapon: 0}));
      expect(characterState).to.equal(Map({ level: 1, xp: 80, health: 75, weapon: 0}));

    });

  });

  describe('pickupWeapon', () => {

    it('changes the characters weapon', () => {
      const characterState = Map({ level: 1, xp: 80, health: 70, weapon: 0});
      const nextState = pickupWeapon(characterState, 6);
      expect(nextState).to.equal(Map({ level: 1, xp: 80, health: 70, weapon: 6}));
      expect(characterState).to.equal(Map({ level: 1, xp: 80, health: 70, weapon: 0}));
    });

  });
});
