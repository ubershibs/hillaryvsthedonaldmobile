import React from 'react';
require('../styles/styles.scss');

class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rows = [];
    for (let y = 0; y < this.props.boardSize.height; y++) {
      const row = [];
      for (let x = 0; x < this.props.boardSize.width; x++) {
        row.push(
          <Square
            key={x}
            fill={this.props.grid[y * this.props.boardSize.width + x]}
          />
        );
      }
      rows.push(<Row key={y}>{row}</Row>);
    }
    return <div>{rows}</div>;
  }
}

const Row = ({children}) => <div className="row">{children}</div>;

const Square = ({children, fill = false}) => (
  <div className={getBackgroundColor(fill)} >
    {fill}{children}
  </div>
);

export default Board;

function getBackgroundColor(fill) {
  switch (fill) {
    case 1:
      return "square wall";
    case 2:
      return "square character";
    case 11:
      return "square level1";
    case 12:
      return "square level2";
    case 5:
      return "square heart";
    default:
      return "square floor";
  }
}
