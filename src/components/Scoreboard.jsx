import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        points: React.PropTypes.object,
        categories: React.PropTypes.object,
        players: React.PropTypes.object,
        onSelect: React.PropTypes.func
    },

    select: function(event) {
        if(this.props.onSelect) {
            const {category, answer} = event.target.dataset;
            this.props.onSelect(parseInt(category), parseInt(answer));
        }
    },

    render: function() {
        const {points, categories, players} = this.props;
        const getWinner = (points, i, cat) => {
            let winner = cat.getIn(['winner', i]);

            // TODO be more stupid
            if (winner == null) {
                return points;
            } else if (!winner) {
                return 'nobody';
            } else {
                return players.getIn([winner, 'name'])  || 'unknown';
            }
        };
        const getWinnerClass = (points, i, cat) => {
            let winner = cat.getIn(['winner', i]);

            // TODO use player color
            if (winner == null) {
                return '';
            } else if (!winner) {
                return 'nobody';
            } else {
                //return players.getIn([winner, 'name'])  || 'unknown';
                /*let w = cat.get('player');
                if(w) {
                    /*let index = 0;
                    players.map((player, player_id) => {
                        console.log(player);
                        console.log(player_id);
                        if(player_id == winner)
                            return 'player' + index;
                        else
                            index++;
                    });
                }*/

                return 'player' + winner;
            }
        };

        return (<table className="scoreboard">
            <thead>
                <tr>
                {categories.map(cat =>
                    <th>
                        {cat.get('name')}
                    </th>
                )}
                </tr>
            </thead>
            <tbody>
            {points.map((points, i) =>
                <tr>
                    {categories.map((cat, cat_index) =>
                        <td className={getWinnerClass(points, i, cat)} onClick={this.select} data-category={cat_index} data-answer={i}>
                            {getWinner(points, i, cat)}
                        </td>
                    )}
                </tr>
            )}
            </tbody>
        </table>);
    }
});