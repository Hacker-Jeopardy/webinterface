import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        state: React.PropTypes.string,
        onAddPlayer: React.PropTypes.func,
        onUpdatePlayerName: React.PropTypes.func,
        onConfirmPlayer: React.PropTypes.func
    },

    addPlayer: function(event) {
        let color = '#000000';
        this.props.onAddPlayer(color);
    },

    changePlayerName: function(event) {
        const playerName = event.target.value;
        this.props.onUpdatePlayerName(playerName);
    },

    confirmPlayer: function(event) {
        this.props.onConfirmPlayer();
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
                </fieldset>
            );
        }
    }
});