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
      }
    };
    this.handleKey = this.handleKey.bind(this);
    this.checkMove = this.checkMove.bind(this);
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
  componentDidMount() {
    window.addEventListener('keydown', this.handleKey, false);
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
    if (newSqValue == 1) {
      validMove = false;
      this.setState({ message: { type: 'alert', text: 'You hit a wall' } })
    } else {
      validMove = true;
      this.setState({ message: { type: 'inform', text: 'Use arrow keys to move' } })
    } (newSqValue > 10 && newSqValue <= 20) {
      validMove = fightVilain(newSqValue);
    }
    if (validMove == true) {
      grid[this.state.position[1] * this.state.boardSize.width + this.state.position[0]] = 0;
      grid[newY * this.state.boardSize.width + newX] = 2;
      this.setState({grid: grid, position: [newX, newY]});
    }
  }
  fightVilain(type) {
    if (type == 11) {
      this.setState({ message: { text: 'You have encoutered a level 1 surrogate', type: 'hit' } ;
    } else if (type == 12) {
      this.setState({ message: { text: 'You have encountered a level 2 surrogate', type: 'hit' } });
    }
  }
}

export default App;
