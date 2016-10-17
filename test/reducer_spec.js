/* eslint-env node, mocha */
import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_BOARD', () => {
    const initialState = Map();
    const action = { type: 'SET_BOARD', width: 3, height: 3, board: [1, 1, 1, 1, 2, 1, 1, 1, 1] };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      board: { grid: [1, 1, 1, 1, 2, 1, 1, 1, 1], width: 3, height: 3 }
    }));
    expect(initialState).to.equal(Map());
  });

  it('handles UPDATE_SQUARE', () => {
    const initialState = Map({
      board: Map({ grid: List.of(1, 1, 1, 1, 2, 1, 1, 1, 1), width: 3, height: 3 })
    });
    const action = {type: 'UPDATE_SQUARE', x: 2, y: 2, newValue: 2};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(Map({
      board: Map({ grid: List.of(1, 1, 1, 1, 2, 1, 1, 1, 2), width: 3, height: 3 })
    }));
  });

  it('handles RESET_CHARACTER', () => {
    const initialState = fromJS({
      board: [],
      character: {}
    });
    const action = {type: 'RESET_CHARACTER', character: { level: 1, xp: 0, health: 100, weapon: 0 }};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      board: [],
      character: { level: 1, xp: 0, health: 100, weapon: 0 }
    }));
  });

  it('handles SET_LEVELS', () => {
    const initialState = fromJS({
      board: [],
      character: { level: 1, xp: 0, health: 100, weapon: 0 }
    });
    const action = {type: 'SET_LEVELS', characteristic: 'health', delta: -5};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      board: [],
      character: { level: 1, xp: 0, health: 95, weapon: 0 }
    }));
  });

  it('handles PICKUP_WEAPON', () => {
    const initialState = fromJS({
      board: {},
      character: { level: 1, xp: 0, health: 100, weapon: 0 }
    });
    const action = {type: 'PICKUP_WEAPON', weapon: 4};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      board: {},
      character: { level: 1, xp: 0, health: 100, weapon: 4 }
    }));
  });

  it('can be used with reduce', () => {
    const board = [1, 1, 1, 1, 2, 1, 1, 1, 1];
    const width = 3;
    const height = 3;
    const character = fromJS({level: 1, xp: 0, health: 100, weapon: 0});
    const action = [
      {type: 'SET_BOARD', width, height, board},
      {type: 'UPDATE_SQUARE', x: 2, y: 2, newValue: 2},
      {type: 'RESET_CHARACTER', character},
      {type: 'SET_LEVELS', characteristic: 'xp', delta: 50},
      {type: 'SET_LEVELS', characteristic: 'health', delta: -20},
      {type: 'PICKUP_WEAPON', weapon: 4}
    ];
    const finalState = action.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      board: { grid: [1, 1, 1, 1, 2, 1, 1, 1, 2], width: 3, height: 3 },
      character: { level: 1, xp: 50, health: 80, weapon: 4 }
    }));
  });
});
