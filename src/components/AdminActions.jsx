import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import AdminConnectActions from 'components/AdminConnectActions';
import AdminSetupActions from 'components/AdminSetupActions';
import AdminAnswerActions from 'components/AdminAnswerActions';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        state: React.PropTypes.string,
        playerCount: React.PropTypes.number,
        buzzerCount: React.PropTypes.number,
        onRefresh: React.PropTypes.func,
        onConnectKeyboard: React.PropTypes.func,
        onConnectSerial: React.PropTypes.func,
        onAddPlayer: React.PropTypes.func,
        onUpdatePlayerName: React.PropTypes.func,
        onConfirmPlayer: React.PropTypes.func,
        onStartGame: React.PropTypes.func,
        onAnswerWin: React.PropTypes.func,
        onAnswerFail: React.PropTypes.func,
        onAnswerOops: React.PropTypes.func,
        onAnswerExit: React.PropTypes.func
    },

    render: function() {
        const {state, playerCount, buzzerCount, newPlayer} = this.props;
        const {
            onRefresh, onConnectKeyboard, onConnectSerial,
            onAddPlayer, onUpdatePlayerName, onConfirmPlayer, onStartGame,
            onAnswerWin, onAnswerFail, onAnswerOops, onAnswerExit
        } = this.props;

        switch(state) {
            case 'setup':
                return (
                    <div id="admin_actions" className="pure-form">
                        <AdminConnectActions
                            onConnectKeyboard={onConnectKeyboard}
                            onConnectSerial={onConnectSerial} />
                        <AdminSetupActions
                            playerCount={playerCount}
                            newPlayer={newPlayer}
                            onAddPlayer={onAddPlayer}
                            onUpdatePlayerName={onUpdatePlayerName}
                            onConfirmPlayer={onConfirmPlayer}
                            onStartGame={onStartGame} />

                        <fieldset>
                            <button value="refresh" onClick={onRefresh} className="pure-button button-xlarge">
                                Refresh State
                            </button>
                        </fieldset>
                    </div>
                );

            case 'scoreboard':
                return (
                    <div id="admin_actions" className="pure-form">
                        <AdminConnectActions
                            onConnectKeyboard={onConnectKeyboard}
                            onConnectSerial={onConnectSerial} />

                        <fieldset>
                            <button value="refresh" onClick={onRefresh} className="pure-button button-xlarge">
                                Refresh State
                            </button>
                        </fieldset>
                    </div>
                );

            case 'answer':
                return (
                    <div id="admin_actions" className="pure-form">
                        <AdminConnectActions
                            onConnectKeyboard={onConnectKeyboard}
                            onConnectSerial={onConnectSerial} />
                        <AdminAnswerActions
                            buzzerCount={buzzerCount}
                            onAnswerWin={onAnswerWin}
                            onAnswerFail={onAnswerFail}
                            onAnswerOops={onAnswerOops}
                            onAnswerExit={onAnswerExit} />

                        <fieldset>
                            <button value="refresh" onClick={onRefresh} className="pure-button button-xlarge">
                                Refresh State
                            </button>
                        </fieldset>
                    </div>
                );
                break;

            case 'double_jeopardy':
                // double_jeopardy
                break;

            case 'results':
                // results
                break;

            case 'new':
            default:
                console.error('unknown state: ' + state);
                break;
        }
    }
});