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

    refresh: function(event) {
        this.props.onRefresh();
    },

    render: function() {
        const {playerCount, newPlayer} = this.props;
        const {
            onConnectKeyboard, onConnectSerial,
            onAddPlayer, onUpdatePlayerName, onConfirmPlayer, onStartGame,
            onAnswerWin, onAnswerFail, onAnswerOops, onAnswerExit
        } = this.props;

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
                <AdminAnswerActions
                    onAnswerWin={onAnswerWin}
                    onAnswerFail={onAnswerFail}
                    onAnswerOops={onAnswerOops}
                    onAnswerExit={onAnswerExit} />

                <fieldset>
                    <button value="refresh" onClick={this.refresh} className="pure-button button-xlarge">
                        Refresh State
                    </button>
                </fieldset>
            </div>
        );
    }
});