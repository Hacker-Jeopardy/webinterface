import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        points: React.PropTypes.string,
        categories: React.PropTypes.object,
        players: React.PropTypes.object
    },

    render: function() {
        const {points, categories, players} = this.props;
        const getWinner = (points, i, cat) => {
            let winner = cat.getIn(['winner', i]);

            // TODO
            if (winner == false) {
                return points;
            } else if (winner == null) {
                return 'nobody';
            } else {
                return players.getIn([winner, 'name'])  || 'unkown';
            }
        };
        const getWinnerClass = (points, i, cat) => {
            let winner = cat.getIn(['winner', i]);

            // TODO
            if (winner == false) {
                return '';
            } else if (winner == null) {
                return 'nobody';
            } else {
                //return players.getIn([winner, 'name'])  || 'unkown';
                return 'player1';
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
                    {categories.map(cat =>
                        <td className={getWinnerClass(points, i, cat)}>
                            {getWinner(points, i, cat)}
                        </td>
                    )}
                </tr>
            )}
            </tbody>
        </table>);
    }
});