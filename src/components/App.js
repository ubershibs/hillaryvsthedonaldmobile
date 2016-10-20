import React from 'react';
import Board from '../containers/Board';
import Legend from '../containers/Legend';
import Message from '../components/Message';
require('../styles/styles.scss');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      boardSize: {
        width: 20,
        height: 10
      },
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
      ],
      position: [2,2],
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
      villains: []
    };
    this.handleKey = this.handleKey.bind(this);
    this.checkMove = this.checkMove.bind(this);
    this.placeVillains = this.placeVillains.bind(this);
    this.placeHealth = this.placeHealth.bind(this);
    this.fightVillain = this.fightVillain.bind(this);
  }
  render() {
    return (
      <div>
        <Legend character={this.state.character} />
        <Board boardSize={this.state.boardSize} grid={this.state.grid} position={this.state.position} />
        <div className="messageBox">
          <Message message={this.state.message.text} type={this.state.message.type} />
        </div>
      </div>
    )
  };
  componentWillMount() {
    this.placeVillains();
    this.placeHealth();
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKey, false);
  }
  placeVillains() {
    const levels = [0, 100, 250, 450, 700, 1000];
    const rooms = [{xRange: [0, 10], yRange: [0, 10]}, {xRange: [11, 20], yRange: [0, 10]}];
    const grid = this.state.grid;
    const villains = this.state.villains;
    let villain = 11;
    rooms.forEach(room => {
      for(let i = 0; i < 6; i++) {
        const coords = getRandomCoords(room, grid, this.state.boardSize.width);
        grid[coords[1] * this.state.boardSize.width + coords[0]] = villain;
        villains.push({
          position: coords,
          level: villain - 10,
          health: levels[villain - 10]
        })
      };
      villain++;
    });
    this.setState({ grid: grid, villains: villains });
  }
  placeHealth() {
    const rooms = [{xRange: [0, 10], yRange: [0, 10]}, {xRange: [11, 20], yRange: [0, 10]}];
    const grid = this.state.grid;
    rooms.forEach(room => {
      for(let i = 0; i < 2; i++) {
        const coords = getRandomCoords(room, grid, this.state.boardSize.width);
        grid[coords[1] * this.state.boardSize.width + coords[0]] = 5;
      };
    });
  }
  handleKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
      // up arrow
      e.preventDefault();
      this.checkMove(0,-1);
    } else if (e.keyCode == '40') {
      // down arrow
      e.preventDefault();
      this.checkMove(0, 1);
    } else if (e.keyCode == '37') {
      // left arrow
      e.preventDefault();
      this.checkMove(-1, 0);
    }
    else if (e.keyCode == '39') {
      // right arrow
      e.preventDefault();
      this.checkMove(1, 0);
    }
  }
  checkMove(x, y) {
    let validMove = true;
    const grid = this.state.grid;
    const newX = this.state.position[0] + x;
    const newY = this.state.position[1] + y;
    const newSqValue = grid[newY * this.state.boardSize.width + newX]
    console.log(newX  + 'x' + newY + ': ' + newSqValue);
    if (newSqValue === 1) {
      validMove = false;
      this.setState({ message: { type: 'alert', text: 'You hit a wall' } })
    } else if (newSqValue > 10 && newSqValue <= 20) {
      validMove = this.fightVillain(newSqValue);
    } else if (newSqValue === 5) {
      const level = this.state.character.level;
      const levels = [0, 100, 250, 450, 700, 1000];
      const boost = 0.3 * levels[level];
      const character = this.state.character;
      character.health = character.health + boost > levels[level] ? 100 : character.health + boost;
      this.setState({character: character, message: {text: "You collected a health booster.Health level is up 30%", type: 'good'}})
      validMove = true;
    } else {
      validMove = true;
      this.setState({ message: { type: 'inform', text: 'Use arrow keys to move' } })
    }
    if (validMove) {
      grid[this.state.position[1] * this.state.boardSize.width + this.state.position[0]] = 0;
      grid[newY * this.state.boardSize.width + newX] = 2;
      this.setState({grid: grid, position: [newX, newY]});
    }
  }
  fightVillain(type) {
    if (type == 11) {
      this.setState({ message: { text: 'You have encoutered a level 1 surrogate', type: 'hit' } });
    } else if (type == 12) {
      this.setState({ message: { text: 'You have encountered a level 2 surrogate', type: 'hit' } });
    }
  }
}

export default App;

function getRandomCoords(room, grid, width) {
  const x = Math.floor(Math.random() * (room.xRange[1] - room.xRange[0])) + room.xRange[0];
  const y = Math.floor(Math.random() * (room.yRange[1] - room.yRange[0])) + room.yRange[0];
  return grid[y * width + x] == 0 ? [x,y] : getRandomCoords(room, grid, width);
}
