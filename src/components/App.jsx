import React from 'react';
import Board from './Board';
import Legend from './Legend';
import Message from './Message';
import Controls from './Controls';
import _ from 'lodash';
require('../styles/styles.scss');

class App extends React.Component {
  constructor() {
    super();
    this.state = this.resetState();
    this.handleKey = this.handleKey.bind(this);
    this.checkMove = this.checkMove.bind(this);
    this.placeVillains = this.placeVillains.bind(this);
    this.placeHealth = this.placeHealth.bind(this);
    this.fightVillain = this.fightVillain.bind(this);
    this.boostHealth = this.boostHealth.bind(this);
    this.toggleLights = this.toggleLights.bind(this);
    this.placeWeapons = this.placeWeapons.bind(this);
    this.boostWeapon = this.boostWeapon.bind(this);
    this.hideIntro = this.hideIntro.bind(this);
    this.fightTheDonald = this.fightTheDonald.bind(this);
    this.debounceHandleKey = this.debounceHandleKey.bind(this);
    this.getState = this.getState.bind(this);
    this.reset = this.reset.bind(this);
    this.resetState = this.resetState.bind(this);
  }
  render() {
    const viewMask = [];
    const boardSize = { width: 9, height: 9 };
    const viewMaskWidth = [this.state.position[0] - 4, this.state.position[0] + 4];
    const viewMaskHeight = [this.state.position[1] - 4, this.state.position[1] + 4];
    for (let y = viewMaskHeight[0]; y <= viewMaskHeight[1]; y++) {
      for (let x = viewMaskWidth[0]; x <= viewMaskWidth[1]; x++) {
        if (y < 0 || x < 0 || x >= this.state.boardSize.width || y >= this.state.boardSize.width) {
          viewMask.push(1);
        } else {
          viewMask.push(this.state.grid[y * 30 + x]);
        }
      };
    };
    return (
      <div>
        <h1>Hillary vs. The Donald</h1>
        <Legend character={this.state.character} toggleLights={this.toggleLights}/>
        <div className='messageBox'>
          <Message message={this.state.message.text} type={this.state.message.type} />
        </div>
         <Board onChange={this.hideIntro} reset={this.reset} gameStatus = {this.state.gameStatus} lights={this.state.lights} boardSize={boardSize} grid={viewMask} position={[4, 4]} />
         <Controls onChange={this.checkMove} />
      </div>
    );
  }
  getState() {
    const newState = {
      boardSize: {
        width: 30,
        height: 19
      },
      grid: [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
      ],
      position: [2, 2],
      character: {
        level: 1,
        xp: 0,
        health: 100,
        weapon: 0
      },
      message: {
        text: 'Use arrow keys to move',
        type: 'inform'
      },
      villains: [],
      theDonald: 1000,
      gameStatus: 3,
      lights: 'off'
    };
    return newState;
  }
  reset() {
    const newState = this.resetState();
    this.setState(newState);
  }
  resetState() {
    const newState = this.getState();
    const newState2 = this.placeVillains(newState);
    const newState3 = this.placeHealth(newState2);
    const newState4 = this.placeWeapons(newState3);
    return newState4;
  }
  componentDidMount() {
    window.addEventListener('keydown', this.debounceHandleKey, false);
  }
  componentWillUpdate() {
    const levels = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];
    const character = this.state.character;
    if (character.xp >= levels[character.level]) {
      character.level += 1;
      character.health = levels[character.level];
      this.setState({ character: character, message: { text: 'You levelled up!', type: 'good' } });
    }
    if (this.state.gameStatus === 0) {
      window.removeEventListener('keydown', this.handleKey, false);
    }
  }
  hideIntro(e) {
    this.setState({ gameStatus: 1 });
  }
  toggleLights(e) {
    let lights = this.state.lights;
    lights = lights === 'off' ? 'on' : 'off';
    this.setState({ lights: lights });
  }
  placeVillains(newState) {
    const levels = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];
    const rooms = [
      {xRange: [0, 10], yRange: [0, 10]},
      {xRange: [11, 20], yRange: [0, 10]},
      {xRange: [21, 30], yRange: [0, 10]},
      {xRange: [21, 30], yRange: [11, 19]},
      {xRange: [11, 20], yRange: [11, 19]},
      {xRange: [0, 10], yRange: [11, 19]}
    ];
    newState.villains = [];
    let villain = 11;
    rooms.forEach(room => {
      if (villain < 16) {
        for (let i = 0; i < 6; i++) {
          const coords = getRandomCoords(room, newState.grid, newState.boardSize.width);
          newState.grid[coords[1] * newState.boardSize.width + coords[0]] = villain;
          newState.villains.push({
            position: coords[1] * newState.boardSize.width + coords[0],
            level: villain - 10,
            health: levels[villain - 10]
          });
        };
      }
      villain++;
    });
    return newState;
  }
  placeHealth(newState) {
    const rooms = [
      {xRange: [0, 10], yRange: [0, 10]},
      {xRange: [11, 20], yRange: [0, 10]},
      {xRange: [21, 30], yRange: [0, 10]},
      {xRange: [21, 30], yRange: [11, 19]},
      {xRange: [11, 20], yRange: [11, 19]},
      {xRange: [0, 10], yRange: [11, 19]}
    ];
    rooms.forEach(room => {
      for (let i = 0; i < 4; i++) {
        const coords = getRandomCoords(room, newState.grid, newState.boardSize.width);
        newState.grid[coords[1] * newState.boardSize.width + coords[0]] = 5;
      };
    });
    return newState;
  }
  placeWeapons(newState) {
    const rooms = [
      {xRange: [11, 20], yRange: [0, 10]},
      {xRange: [21, 30], yRange: [0, 10]},
      {xRange: [21, 30], yRange: [11, 19]},
      {xRange: [11, 20], yRange: [11, 19]}
    ];
    rooms.forEach(room => {
      const coords = getRandomCoords(room, newState.grid, newState.boardSize.width);
      newState.grid[coords[1] * newState.boardSize.width + coords[0]] = 6;
    });
    return newState;
  }
  debounceHandleKey(e) {
    const arrows = [37, 38, 39, 40, 76];
    if (arrows.indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
    const debounced = _.debounce(this.handleKey, 250);
    debounced(e);
  }
  handleKey(e) {
    e = e || window.event;
    if (e.keyCode === 38) {
      // up arrow
      this.checkMove(0, -1);
    } else if (e.keyCode === 40) {
      // down arrow
      this.checkMove(0, 1);
    } else if (e.keyCode === 37) {
      // left arrow
      this.checkMove(-1, 0);
    } else if (e.keyCode === 39) {
      // right arrow
      this.checkMove(1, 0);
    } else if (e.keyCode === 76) {
      this.toggleLights();
    }
  }
  checkMove(x, y) {
    let validMove = true;
    const grid = this.state.grid;
    const newX = this.state.position[0] + x;
    const newY = this.state.position[1] + y;
    const newSqValue = grid[newY * this.state.boardSize.width + newX];
    if (newSqValue === 1) {
      validMove = false;
      this.setState({ message: { type: 'alert', text: 'You hit a wall' } });
    } else if (newSqValue > 10 && newSqValue <= 20) {
      validMove = this.fightVillain(newSqValue, newX, newY);
    } else if (newSqValue === 5) {
      this.boostHealth();
      validMove = true;
    } else if (newSqValue === 6) {
      this.boostWeapon();
      validMove = true;
    } else if (newSqValue === 3) {
      validMove = this.fightTheDonald();
    } else {
      validMove = true;
      this.setState({ message: { type: 'inform', text: 'Use arrow keys to move' } });
    }
    if (validMove) {
      grid[this.state.position[1] * this.state.boardSize.width + this.state.position[0]] = 0;
      grid[newY * this.state.boardSize.width + newX] = 2;
      this.setState({grid: grid, position: [newX, newY], lights: 'off'});
    }
  }
  boostHealth() {
    const level = this.state.character.level;
    const levels = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];
    const boost = Math.floor(0.80 * levels[level] * (Math.random() * (1 - 0.08) + 0.8));
    const character = this.state.character;
    character.health = character.health + boost > levels[level] ? levels[level] : character.health + boost;
    this.setState({character: character, message: {text: `Picked up booster - health is now ${character.health / levels[level] * 100}%`, type: 'good'}});
  }
  boostWeapon() {
    const weapons = ['Free Speech', 'a Yale Law Degree', 'a Grammy for Best Spoken Word Album', 'a private email server', 'the Democratic Party nomination'];
    const character = this.state.character;
    character.weapon += 1;
    character.xp += 20;
    this.setState({ character: character, message: `Picked up ${weapons[character.weapon]} (10% bonus)`, type: 'good' });
  }
  fightVillain(type, x, y) {
    const levels = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];
    const opponent = this.state.villains.find(villain => villain.position === y * this.state.boardSize.width + x);
    const villains = this.state.villains;
    const index = villains.indexOf(opponent);
    const you = this.state.character;
    opponent.health -= damageCalculation(you.level * 15, you.level * 25, you.weapon);
    villains[index] = opponent;
    if (opponent.health > 0) {
      you.health -= damageCalculation(opponent.level * 10, opponent.level * 20, 0);
      if (you.health > 0) {
        this.setState({ villains: villains, character: you, message: { text: `Level ${opponent.level} surrogate health: ${Math.floor(opponent.health / levels[opponent.level] * 100)}%. Yours: ${Math.floor(you.health / levels[you.level] * 100)}%.`, type: 'hit flash' } });
        return false;
      } else if (you.health <= 0) {
        you.health = 0;
        this.setState({ villains: villains, character: you, message: { text: `Level ${opponent.level} surrogate killed you. Game over.`, type: 'alert' }, gameStatus: 0 });
        return false;
      }
    } else if (opponent.health <= 0) {
      villains.splice(index, 1);
      you.xp += 25 * opponent.level;
      this.setState({ villains: villains, character: you, message: { text: `Level ${opponent.level} surrogate: You killed him.`, type: 'good' } });
      return true;
    }
  }
  fightTheDonald() {
    const levels = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];
    let theDonald = this.state.theDonald;
    const you = this.state.character;
    theDonald -= damageCalculation(you.level * 15, you.level * 25, you.weapon);
    if (theDonald > 0) {
      you.health -= damageCalculation(80, 140, 0);
      if (you.health > 0) {
        this.setState({ character: you, theDonald: theDonald, message: { text: `Hit! The Donald's health: ${Math.floor(theDonald / 1000 * 100)}%. Yours: ${Math.floor(you.health / levels[you.level] * 100)}%`, type: 'hit' } });
        return false;
      } else if (you.health <= 0) {
        you.health = 0;
        this.setState({ theDonald: theDonald, character: you, message: { text: 'The Donald defeated you. Better luck next time.', type: 'lose' }, gameStatus: 0 });
        return false;
      }
    } else if (theDonald <= 0) {
      this.setState({ theDonald: 0, character: you, message: { text: 'You defeated The Donald! Congrats, President-Elect Hillary', type: 'good' }, gameStatus: 2 });
      return true;
    }
  }
}

export default App;

function getRandomCoords(room, grid, width) {
  const x = Math.floor(Math.random() * (room.xRange[1] - room.xRange[0])) + room.xRange[0];
  const y = Math.floor(Math.random() * (room.yRange[1] - room.yRange[0])) + room.yRange[0];
  return grid[y * width + x] === 0 ? [x, y] : getRandomCoords(room, grid, width);
}

function damageCalculation(min, max, weapon) {
  const hit = Math.random() * (max - min) + min;
  const weaponBonus = hit * (weapon * 5 / 100);
  return Math.floor(hit + weaponBonus);
}
