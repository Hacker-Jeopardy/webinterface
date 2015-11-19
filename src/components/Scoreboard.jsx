import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import InternetExplorerPlaceholder from 'components/InternetExplorerPlaceholder';
import CategoriesTable from 'components/CategoriesTable';

export const ScoreboardStandalone = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        state: React.PropTypes.string,
        scoreboard: React.PropTypes.object,
        players: React.PropTypes.object,
        answer: React.PropTypes.object
    },

    render: function() {
        const {state, scoreboard, players, answer} = this.props;
        console.log(this.props.state);
        console.log(this.props.scoreboard);
        console.log(this.props.players);
        console.log(this.props.answer);

        switch(state) {
            case 'new':
                return (
                    <InternetExplorerPlaceholder />
                );
                break;

            case 'setup':
            case 'scoreboard':
                // table
                return (
                    <CategoriesTable
                        points={scoreboard.get('points')}
                        categories={scoreboard.get('categories')}
                        players={players} />
                );
                break;

            case 'answer':
                // answer
                break;

            case 'double_jeopardy':
                // double_jeopardy
                break;

            case 'results':
                // results
                break;
        }

        return <p>// TODO</p>;
    }
});


export const Scoreboard = connect((state) => {
    return {
        state: state.getIn(['game', 'state']),
        scoreboard: state.getIn(['game', 'scoreboard']),
        players: state.getIn(['game', 'players']),
        answer: state.getIn(['game', 'answer'])
    };
}, actionCreators)(ScoreboardStandalone);