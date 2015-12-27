import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const colors = [
    '#3CB371', // mediumseagreen
    '#DAA520', // goldenrod
    '#800080', // purple
    '#2F4F4F', // darkslategrey
    '#F08080', // lightcoral
    '#32CD32', // limegreen
    '#1E90FF', // dodgerblue
    '#FF4500', // orangered
    '#000000'  // black
];

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        playerCount: React.PropTypes.number,
        onAddPlayer: React.PropTypes.func,
        onUpdatePlayerName: React.PropTypes.func,
        onConfirmPlayer: React.PropTypes.func,
        onStartGame: React.PropTypes.func
    },

    addPlayer: function(event) {
        const color = colors[this.props.playerCount % colors.length];
        this.props.onAddPlayer(color);
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