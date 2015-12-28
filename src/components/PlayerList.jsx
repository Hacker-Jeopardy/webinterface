import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        players: React.PropTypes.object,
        newPlayer: React.PropTypes.object,
        currentPlayer: React.PropTypes.string,
        onUpdateScore: React.PropTypes.func,
        onReconnectBuzzer: React.PropTypes.func,
        onDisconnectBuzzer: React.PropTypes.func
    },

    updateScore: function (event) {
        const {onUpdateScore} = this.props;

        if(onUpdateScore) {
            const {player, score} = event.target.dataset;

            let newScore = prompt("Enter new score", score);
            if(newScore != null) {
                onUpdateScore(player, parseInt(newScore));
            }
        }
    },

    reconnect: function(event) {
        const {onReconnectBuzzer} = this.props;

        if(onReconnectBuzzer) {
            const {player} = event.target.dataset;
            onReconnectBuzzer(player);
        }
    },

    disconnect: function(event) {
        const {onDisconnectBuzzer} = this.props;

        if(onDisconnectBuzzer) {
            const {player} = event.target.dataset;
            onDisconnectBuzzer(player);
        }
    },

    render: function() {
        const {players, newPlayer, currentPlayer} = this.props;
        const {onDisconnectBuzzer} = this.props;

        const getPlayerStyle = player => {
            return { backgroundColor: player.get('color') };
        };

        const renderPlayer = (player) => (
            <td style={getPlayerStyle(player)}>
                { !player.has('id') || player.get('id') != currentPlayer ? '': (
                    <span className="player-active">
                        <i className="fa fa-circle"></i>
                    </span>
                )}

                <span className="player-name">
                    {player.get('name')}
                </span>

                <span className="player-score" onClick={this.updateScore} data-player={player.get('id')} data-score={player.get('score')}>
                    {player.get('score')}
                </span>

                { player.get('connected') ? '': (
                    <span className={this.reconnect ? 'player-connected player-reconnect' : 'player-connected'} onClick={this.reconnect}>
                        <i className="fa fa-plug" data-player={player.get('id')}></i>
                    </span>
                )}

                { !player.has('id') || !player.get('connected') || !onDisconnectBuzzer ? '' : (
                    <span className='player-disconnect' onClick={this.disconnect}>
                        <i className="fa fa-times" data-player={player.get('id')}></i>
                    </span>
                )}
            </td>
        );

        return (
            <table className="player-list">
                <tbody>
                    <tr>
                        {players.map(renderPlayer)}
                        {!newPlayer ? null : renderPlayer(newPlayer)}
                    </tr>
                </tbody>
            </table>
        );
    }
});