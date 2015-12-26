import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        state: React.PropTypes.string,
        onAddPlayer: React.PropTypes.func,
        onUpdatePlayerName: React.PropTypes.func,
        onConfirmPlayer: React.PropTypes.func,
        onStartGame: React.PropTypes.func
    },

    addPlayer: function(event) {
        // TODO color
        let color = '#000000';
        let colorArray = [
            '#3CB371',
            '#DAA520',
            '#800080',
            '#2F4F4F',
            '#F08080',
            '#32CD32',
            '#1E90FF',
            '#FF4500'
        ];

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