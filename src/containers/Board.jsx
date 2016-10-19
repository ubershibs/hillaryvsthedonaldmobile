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
  <div
    className="square"
    style={{
      backgroundColor:  fill > 0 ? fill === 2 ? 'blue' : '#000' : '#fff'
    }}
  >
    {fill}{children}
  </div>
);

export default Board;
