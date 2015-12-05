import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import InternetExplorerPlaceholder from 'components/InternetExplorerPlaceholder';
import Scoreboard from 'components/Scoreboard';
import PlayerList from 'components/PlayerList';

export const AdminBoardStandalone = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        state: React.PropTypes.string,
        scoreboard: React.PropTypes.object,
        players: React.PropTypes.object,
        answer: React.PropTypes.object
    },

    render: function() {
        const {state, scoreboard, players, answer} = this.props;

        switch(state) {
            case 'new':
                return (
                    <p>// TODO</p>
                );

            case 'setup':
            case 'scoreboard':
                // table
                return (
                    <div id="app">
                        <header>Jeopardy!</header>
                        <Scoreboard
                            points={scoreboard.get('points')}
                            categories={scoreboard.get('categories')}
                            players={players} />
                        <PlayerList
                            players={players} />
                        <p>// TODO</p>
                    </div>
                );

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


export const AdminBoard = connect((state) => {
    return {
        state: state.getIn(['game', 'state']),
        scoreboard: state.getIn(['game', 'scoreboard']),
        players: state.getIn(['game', 'players']),
        answer: state.getIn(['game', 'answer'])
    };
}, actionCreators)(AdminBoardStandalone);