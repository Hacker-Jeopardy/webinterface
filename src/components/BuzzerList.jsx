import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        buzzorder: React.PropTypes.object,
        players: React.PropTypes.object
    },

    render: function() {
        const {buzzorder, players} = this.props;

        const getPlayerName = player_id => {
            return !players ? '' : players.get(player_id).get('name');
        };

        // TODO idk
        const renderBuzzer = (buzzer_time, player_id) => (
            <td className={'player' + player_id}>
                <span className="player-name">
                    {getPlayerName(player_id)}
                </span>

                <span className="buzzer-time">
                    + {buzzer_time} ms
                </span>
            </td>
        );

        return (
            <table className="buzzer-list">
                <tbody>
                    <tr>
                        {buzzorder.map(renderBuzzer)}
                    </tr>
                </tbody>
            </table>
        );
    }
});