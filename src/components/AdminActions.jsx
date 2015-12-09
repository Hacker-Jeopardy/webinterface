import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import AdminConnectActions from 'components/AdminConnectActions';
import AdminPlayerActions from 'components/AdminPlayerActions';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        state: React.PropTypes.string,
        onConnectKeyboard: React.PropTypes.func,
        onConnectSerial: React.PropTypes.func,
        onAddPlayer: React.PropTypes.func,
        onUpdatePlayerName: React.PropTypes.func,
        onConfirmPlayer: React.PropTypes.func
    },

    render: function() {
        const {state, newPlayer} = this.props;
        const {
            onConnectKeyboard, onConnectSerial,
            onAddPlayer, onUpdatePlayerName, onConfirmPlayer
        } = this.props;

        return (
            <div id="admin_actions" className="pure-form">
                <AdminConnectActions
                    onConnectKeyboard={onConnectKeyboard}
                    onConnectSerial={onConnectSerial} />
                <AdminPlayerActions
                    newPlayer={newPlayer}
                    onAddPlayer={onAddPlayer}
                    onUpdatePlayerName={onUpdatePlayerName}
                    onConfirmPlayer={onConfirmPlayer}  />
            </div>
        );
    }
});