import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Connecting from 'components/Connecting';
import InternetExplorerPlaceholder from 'components/InternetExplorerPlaceholder';
import Scoreboard from 'components/Scoreboard';
import PlayerList from 'components/PlayerList';
import ErrorMessage from 'components/ErrorMessage';

export const PlayerBoardStandalone = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        state: React.PropTypes.string,
        scoreboard: React.PropTypes.object,
        players: React.PropTypes.object,
        answer: React.PropTypes.object
    },

    render: function() {
        const {server_state, state, scoreboard, players, answer} = this.props;

        if(server_state != 'connected') {
            return (
                <div id="app">
                    <header>Jeopardy!</header>
                    <Connecting />
                </div>
            );
        }

        switch(state) {
            case 'new':
                return (
                    <div id="app">
                        <InternetExplorerPlaceholder />
                    </div>
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
                    </div>
                );

            case 'answer':
                return (
                    <div id="app">
                        <header>Jeopardy!</header>
                        <Answer
                            answer={scoreboard.get('answer')} />
                        <PlayerList
                            players={players} />
                    </div>
                );
                break;

            case 'double_jeopardy':
                // double_jeopardy
                break;

            case 'results':
                // results
                break;

            default:
                console.error('unknown state: ' + state);
                break;
        }

        return (
            <div id="app">
                <ErrorMessage/>
            </div>
        );
    }
});


export const PlayerBoard = connect((state) => {
    return {
        server_state: state.getIn(['server', 'state']),
        state: state.getIn(['game', 'state']),
        scoreboard: state.getIn(['game', 'scoreboard']),
        players: state.getIn(['game', 'players']),
        answer: state.getIn(['game', 'answer'])
    };
}, actionCreators)(PlayerBoardStandalone);