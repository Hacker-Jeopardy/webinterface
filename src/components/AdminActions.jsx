import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import AdminConnectActions from 'components/AdminConnectActions';
import AdminSetupActions from 'components/AdminSetupActions';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        state: React.PropTypes.string,
        onRefresh: React.PropTypes.func,
        onConnectKeyboard: React.PropTypes.func,
        onConnectSerial: React.PropTypes.func,
        onAddPlayer: React.PropTypes.func,
        onUpdatePlayerName: React.PropTypes.func,
        onConfirmPlayer: React.PropTypes.func,
        onStartGame: React.PropTypes.func
    },

    refresh: function(event) {
        this.props.onRefresh();
    },

    render: function() {
        const {state, newPlayer} = this.props;
        const {
            onConnectKeyboard, onConnectSerial,
            onAddPlayer, onUpdatePlayerName, onConfirmPlayer, onStartGame
        } = this.props;

        return (
            <div id="admin_actions" className="pure-form">
                <AdminConnectActions
                    onConnectKeyboard={onConnectKeyboard}
                    onConnectSerial={onConnectSerial} />
                <AdminSetupActions
                    newPlayer={newPlayer}
                    onAddPlayer={onAddPlayer}
                    onUpdatePlayerName={onUpdatePlayerName}
                    onConfirmPlayer={onConfirmPlayer}
                    onStartGame={onStartGame} />

                <fieldset>
                    <button value="refresh" onClick={this.refresh} className="pure-button button-xlarge">
                        Refresh State
                    </button>
                </fieldset>
            </div>
        );
    }
});