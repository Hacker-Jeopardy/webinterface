import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        players: React.PropTypes.object,
        newPlayer: React.PropTypes.object,
        onReconnectBuzzer: React.PropTypes.func
    },

    reconnect: function(event) {
        const {onReconnectBuzzer} = this.props;

        if(onReconnectBuzzer) {
            const {player} = event.target.dataset;
            console.log(event.target.dataset);
            onReconnectBuzzer(player);
        }
    },

    render: function() {
        const {players, newPlayer} = this.props;
        const {onReconnectBuzzer} = this.props;
        let playerIndex = 0;

        // TODO color
        const renderPlayer = (player, playerId) => (
            <td className={'player' + playerIndex++}>
                {/* TODO !player.get('active') ? '': (
                    <span className="player-active">
                        <i className="fa fa-circle"></i>
                    </span>
                )*/}

                <span className="player-name">
                    {player.get('name')}
                </span>

                <span className="player-score">
                    {player.get('score')}
                </span>

                {player.get('connected') ? '': (
                    <span className="player-connected">
                        <i className="fa fa-plug"></i>
                    </span>
                )}

                {!onReconnectBuzzer ? '': (
                    <span className="player-reconnect" onClick={this.reconnect}>
                        <i className="fa fa-plus-circle" data-player={playerId}></i>
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