import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const colors = {
    '#3CB371': 'mediumseagreen',
    '#DAA520': 'goldenrod',
    '#800080': 'purple',
    '#2F4F4F': 'darkslategrey',
    '#F08080': 'lightcoral',
    '#32CD32': 'limegreen',
    '#1E90FF': 'dodgerblue',
    '#FF4500': 'orangered',
    '#000000': 'black'
};
const color_keys = Object.keys(colors);

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        playerCount: React.PropTypes.number,
        onAddPlayer: React.PropTypes.func,
        onUpdatePlayerName: React.PropTypes.func,
        onConfirmPlayer: React.PropTypes.func,
        onStartGame: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            color: color_keys[this.props.playerCount % color_keys.length]
        };
    },

    changeColor: function(event) {
        this.setState({color: event.target.value});
    },

    addPlayer: function(event) {
        this.props.onAddPlayer(this.state.color);
    },
    changePlayerName: function(event) {
        const playerName = event.target.value;
        this.props.onUpdatePlayerName(playerName);
    },
    confirmPlayer: function(event) {
        this.props.onConfirmPlayer();
    },

    startGame: function(event) {
        this.props.onStartGame();
    },

    render: function() {
        const {newPlayer} = this.props;

        const getColor = (color) => {
            return (
                <option value={color}>
                    {colors[color]} ({color})
                </option>
            );
        };

        if(newPlayer) {
            return (
                <fieldset>
                    <input id="playerName" name="playerName" placeholder="Player Name" value={newPlayer.name} onChange={this.changePlayerName} ref="playerName" />
                    <button value="confirmPlayer" onClick={this.confirmPlayer} className="pure-button button-xlarge">
                        Confirm Player
                    </button>
                </fieldset>
            );
        } else {
            return (
                <fieldset>
                    <select name="playerColor" onChange={this.changeColor} value={this.state.color} ref="color">
                        {color_keys.map(getColor)}
                    </select>
                    <button value="addPlayer" onClick={this.addPlayer} className="pure-button button-xlarge">
                        Add Player
                    </button>

                    <button value="startGame" onClick={this.startGame} className="pure-button button-xlarge">
                        Start Game
                    </button>
                </fieldset>
            );
        }
    }
});