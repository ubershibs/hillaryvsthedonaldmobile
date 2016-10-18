import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import {AppContainer} from 'react-hot-loader';
import reducer from './reducer';
import App from './components/App';
import DevTools from './containers/DevTools';

const logger = createLogger();

const squareValues = [
  'open', // 0
  'wall', // 1
  'Hillary', // 2
  'Donald', // 3
  // Weapons

]
const initialState = {
  board: {
    width: 20,
    height: 10,
    grid: [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]
  },
  character: {
    position: [2,2],
    level: 1,
    xp: 0,
    health: 100,
    weapon: 0
  }
};

const enhancer = compose(
  applyMiddleware(logger),
  DevTools.instrument()
);

const store = createStore(reducer, initialState, enhancer);
const rootElement = document.getElementById('root');

render(
  <AppContainer>
    <Provider store={store}>
      <div>
        <App />
        <DevTools />
      </div>
    </Provider>
  </AppContainer>,
  rootElement
);

// For hot-reloading on code change:
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <div>
            <NextApp />
            <DevTools />
          </div>
        </Provider>
      </AppContainer>,
      rootElement
    );
  });
}

window.addEventListener("keydown", checkKey, false);

const checkKey = (e) => {
  e = e || window.event;

  switch(e.keyCode) {
    case 37:
      console.log("Left key");
      moveCharacter([-1, 0]);
      break;
    case 38:
      console.log("Up key");
      moveCharacter([0, 1]);
      break;
    case 39:
      console.log("Right key");
      moveCharacter([1, 0]);
      break;
    case 40:
      console.log("Down key");
      moveCharacter([0, -1]);
      break;
  }
};

function moveCharacter(newCoords) {
  const state = store.getState();
  const oldCoords = store.character.position;
  const oldValue = store.board.grid[oldCoords[1] * store.board.height + oldCoords[0]];
  const newValue = store.board.grid[newCoords[1] * store.board.height + newCoords[0]];
  let validMove = true;
  if (newValue === 1) {
    validMove = false;
  } else if (newValue == 3) {
    // Boss Fight
    validMove = false;
  } else if (newValue > 10 && newValue < 20) {
    // Fight
    validMove = false;
  } else if (newValue >= 20 && newValue < 30) {
    // Pick up health item
    validMove = false;
  }
  if (validMove) {
    store.disptach(updateSquare(newCords[0], newCoords[1], 2));
    store.dispatch(updateSquare(store.character.position[0], store.character.position[1], 0));
    store.dispatch(setPosition(newCoords));
  }
}
