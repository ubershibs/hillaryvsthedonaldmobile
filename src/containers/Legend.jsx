import React from 'react';
require('../styles/styles.scss');

class Legend extends React.Component {
  render() {
    const levels = [0, 100, 250, 450, 700, 1000];
    const weapons = [['Free Speech', 0],['Yale Law Degree', 5],['Grammy for Best Spoken Word Album', 10],['Democratic Party nomination', 15]];
    const health = this.props.character.health / levels[this.props.character.level] * 100;
    return (
      <div>
        <h3>Hillary's Stats</h3>
        <p><strong>Level:</strong> {this.props.character.level}</p>
        <p><strong>Health:</strong> {health}&#37</p>
        <p><strong>XP:</strong> {this.props.character.xp} / {levels[this.props.character.level]}</p>
        <p><strong>Armed with:</strong> {weapons[this.props.character.weapon][0]}</p>
      </div>
    )
  };
}


export default Legend;
