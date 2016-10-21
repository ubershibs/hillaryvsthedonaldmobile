import React from 'react';
require('../styles/styles.scss');

class Legend extends React.Component {
  constructor(props) {
    super(props);
    this.toggleLights = this.toggleLights.bind(this);
  }
  toggleLights(e) {
    return this.props.toggleLights(e);
  }
  render() {
    const levels = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];
    const weapons = ['Free Speech', 'a Yale Law Degree', 'a Grammy for Best Spoken Word Album', 'a private email server', 'the Democratic Party nomination'];
    const health = Math.floor(this.props.character.health / levels[this.props.character.level] * 100);
    const weaponBonus = weapons[this.props.character.weapon] * 5;
    return (
      <div className="legendBox">
        <div className="legend1">
          <h3>Hillary's Stats</h3>
          <ul>
            <li><strong>Level:</strong> {this.props.character.level}</li>
            <li><strong>Health:</strong> {health}&#37;</li>
            <li><strong>XP:</strong> {this.props.character.xp} / {levels[this.props.character.level]}</li>
            <li><strong>Armed with:</strong> {weapons[this.props.character.weapon]} {weaponBonus ? `(${weaponBonus}% combat bonus)` : ''}</li>
          </ul>
          <Lights onChange={this.props.toggleLights}/>
        </div>
        <div className="legend2">
          <h3>Good Things</h3>
          <ul>
            <li><div className="hillary"></div> Hillary</li>
            <li><div className="heart"></div> Heart</li>
            <li><div className="weapon"></div> Weapon</li>
          </ul>
        </div>
        <div className="legend3">
        <h3>Bad Things</h3>
        <ul>
          <li><div className="surrogate"></div> Surrogates</li>
          <li><div className="kellyanne"></div> Kellyanne Conway</li>
          <li><div className="theDonald"></div> The Donald</li>
        </ul>
        </div>
      </div>
    )
  };
}

class Lights extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    return this.props.onChange(e);
  }
  render() {
    return (<button className="lights" onClick={this.handleClick}>Toggle Lights</button>)
  }
}
export default Legend;
