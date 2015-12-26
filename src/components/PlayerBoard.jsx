import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Connecting from 'components/Connecting';
import InternetExplorerPlaceholder from 'components/InternetExplorerPlaceholder';
import Scoreboard from 'components/Scoreboard';
import Answer from 'components/Answer';
import PlayerList from 'components/PlayerList';
import BuzzerList from 'components/BuzzerList';
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
        const {serverState, state, scoreboard, players, newPlayer, currentPlayer, answer, buzzorder} = this.props;

        if(serverState != 'connected') {
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
                            players={players}
                            newPlayer={newPlayer}
                            currentPlayer={currentPlayer} />
                    </div>
                );

            case 'answer':
                return (
                    <div id="app">
                        <header>Jeopardy!</header>
                        <Answer
                            answer={answer} />
                        <BuzzerList
                            buzzorder={buzzorder}
                            players={players} />
                        <PlayerList
                            players={players}
                            currentPlayer={currentPlayer} />
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
        serverState: state.getIn(['server', 'state']),
        state: state.getIn(['game', 'state']),
        scoreboard: state.getIn(['game', 'scoreboard']),
        players: state.getIn(['game', 'players']),
        newPlayer: state.getIn(['game', 'new_player']),
        currentPlayer: state.getIn(['game', 'current_player']),
        answer: state.getIn(['game', 'answer']),
        buzzorder: state.getIn(['game', 'buzzorder'])
    };
}, actionCreators)(PlayerBoardStandalone);