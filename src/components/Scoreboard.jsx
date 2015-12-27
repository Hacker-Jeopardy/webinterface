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
            const winner = cat.getIn(['winner', i]);

            if (winner == null) {
                return points;
            } else if (!winner) {
                return 'nobody';
            } else {
                return players.getIn([winner, 'name'])  || 'unknown';
            }
        };
        const getWinnerStyle = (i, cat) => {
            const winner = cat.getIn(['winner', i]);

            if (winner == null) {
                return {};
            } else {
                // nobody color
                let color = 'lightgrey';

                // player color
                if (winner)
                    color = players.getIn([winner, 'color']);

                return { backgroundColor: color };
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
                        <td style={getWinnerStyle(i, cat)} onClick={this.select} data-category={cat_index} data-answer={i}>
                            {getWinner(points, i, cat)}
                        </td>
                    )}
                </tr>
            )}
            </tbody>
        </table>);
    }
});