import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        players: React.PropTypes.object
    },

    render: function() {
        const {players} = this.props;
        let playerIndex = 0;

        console.log(players);

        return (<table className="player-list">
            <tbody>
            <tr>
                {players.map((player, uid) => (
                    <td className={'player' + playerIndex++}>
                        {!player.get('active') ? '': (
                            <span className="player-active">
                                <i className="fa fa-circle"></i>
                            </span>
                        )}

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
                    </td>
                ))}
            </tr>
            </tbody>
        </table>);
    }
});