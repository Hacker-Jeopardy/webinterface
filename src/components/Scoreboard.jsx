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

            // TODO
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

            // TODO
            if (winner == false) {
                return '';
            } else if (winner == null) {
                return 'nobody';
            } else {
                //return players.getIn([winner, 'name'])  || 'unknown';
                return 'player' + i;
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