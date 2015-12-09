import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Connecting from 'components/Connecting';
import InternetExplorerPlaceholder from 'components/InternetExplorerPlaceholder';
import AdminActions from 'components/AdminActions';
import SelectRound from 'components/SelectRound';
import Scoreboard from 'components/Scoreboard';
import PlayerList from 'components/PlayerList';
import ErrorMessage from 'components/ErrorMessage';
import Log from 'components/Log';

export const AdminBoardStandalone = React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        state: React.PropTypes.string,
        rounds: React.PropTypes.object,
        scoreboard: React.PropTypes.object,
        players: React.PropTypes.object,
        answer: React.PropTypes.object
    },

    render: function() {
        const {server_state, state, rounds, scoreboard, players, newPlayer, answer} = this.props;
        const {
            eventSelectRound,
            eventConnectKeyboard, eventConnectSerial,
            eventAddPlayer, eventUpdatePlayerName, eventConfirmPlayer,
            eventSelectAnswer
        } = this.props;

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
                        <header>Jeopardy!</header>
                        <SelectRound
                            rounds={rounds}
                            onSelect={eventSelectRound} />
                    </div>
                );

            case 'setup':
            case 'scoreboard':
                // table
                return (
                    <div id="app">
                        <header>
                            Jeopardy!
                            <h1>{scoreboard.get('name')}</h1>
                        </header>

                        <div className="pure-g">
                            <div className="pure-u-2-3">
                                <Scoreboard
                                    points={scoreboard.get('points')}
                                    categories={scoreboard.get('categories')}
                                    players={players}
                                    onSelect={eventSelectAnswer} />
                            </div>
                            <div className="pure-u-1-3">
                                <AdminActions
                                    newPlayer={newPlayer}
                                    onConnectKeyboard={eventConnectKeyboard}
                                    onConnectSerial={eventConnectSerial}
                                    onAddPlayer={eventAddPlayer}
                                    onUpdatePlayerName={eventUpdatePlayerName}
                                    onConfirmPlayer={eventConfirmPlayer} />
                                <Log />
                            </div>
                        </div>
                        <PlayerList
                            players={players} />
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


export const AdminBoard = connect((state) => {
    return {
        server_state: state.getIn(['server', 'state']),
        state: state.getIn(['game', 'state']),
        rounds: state.getIn(['game', 'rounds']),
        scoreboard: state.getIn(['game', 'scoreboard']),
        players: state.getIn(['game', 'players']),
        newPlayer: state.getIn(['game', 'new_player']),
        answer: state.getIn(['game', 'answer'])
    };
}, actionCreators)(AdminBoardStandalone);