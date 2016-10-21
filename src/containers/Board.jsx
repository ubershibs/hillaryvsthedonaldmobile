import React from 'react';
require('../styles/styles.scss');

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    return this.props.onChange(e);
  }
  render() {
    const intro = (
      <div onClick={this.handleClick} className="intro">
        <h2>Welcome</h2>
        <p>In this game, you play the role of Hillary. Hillary is trying to find and slay her enemy, The Donal, but his merry band of surrogates will do everything they can to stop her. Collect health boosters and new weapons as you progress. You'll need to level up a few times before you're strong enough to defeat the big guy. Best of luck!</p>
        <p className="small">Use the arrow keys to navigate. Press 'L' to toggle the lights. Click anywhere to begin.</p>
      </div>
    )
    const gameOverWin = (
      <div className="win">
        <h2>Congratulations!</h2>
        <p>You single-handedly slayed The Donald and his band of surrogates. Congrats!</p>
      </div>
    )
    const gameOver = (
      <div className="lose">
        <h2>Game over</h2>
        <p>You died. Reload this page to play again.</p>
      </div>
    );
    let rows = [];
    for (let y = 0; y < this.props.boardSize.height; y++) {
      const row = [];
      for (let x = 0; x < this.props.boardSize.width; x++) {
        row.push(
          <Square
            key={x}
            thisSquare={[x, y]}
            fill={this.props.grid[y * this.props.boardSize.width + x]}
            position = {this.props.position}
            width = {this.props.boardSize.width}
            lights = {this.props.lights}
          />
        );
      }
      rows.push(<Row key={y}>{row}</Row>);
    }
    const gameOn = (<div className="board">{rows}</div>);
    if (this.props.gameStatus === 1) {
      return gameOn;
    } else if (this.props.gameStatus === 0) {
      return gameOver;
    } else if (this.props.gameStatus === 2) {
      return gameOverWin;
    } else {
      return intro;
    }
  }
}

const Row = ({children}) => <div className="row">{children}</div>;

const Square = ({children, position, lights, thisSquare, width, fill = false}) => (
  <div className={getBackgroundColor(fill, position, lights, thisSquare, width)} >
    {children}
  </div>
);

export default Board;

function getBackgroundColor(fill, position, lights, thisSquare, width) {
  const sqIndex = thisSquare[1] * width + thisSquare[0];
  let sqFill;
  switch (fill) {
    case 1:
      sqFill = "square wall";
      break;
    case 2:
      sqFill = "square character";
      break;
    case 11:
      sqFill = "square level1";
      break;
    case 12:
      sqFill = "square level2";
      break;
    case 13:
      sqFill = "square level3";
      break;
    case 14:
      sqFill = "square level4";
      break;
    case 15:
      sqFill = "square level5";
      break;
    case 5:
      sqFill = "square heart";
      break;
    case 6:
      sqFill = "square weapon";
      break;
    case 3:
      sqFill = "square theDonald";
      break;
    default:
      sqFill = "square floor";
      break;
  }
  const posIndex = position[1] * width + position[0];
  const visibleArea = [posIndex, posIndex - 1, posIndex - 2, posIndex + 1, posIndex + 2, posIndex - width, posIndex - width + 1, posIndex - width - 1, posIndex - width - width, posIndex + width, posIndex + width + 1, posIndex + width - 1, posIndex + width + width];
  if (lights === 'on') {
    return sqFill;
  } else {
    if (visibleArea.indexOf(sqIndex) > -1) {
      return sqFill
    } else {
      return "square dark";
    }
  }
}
