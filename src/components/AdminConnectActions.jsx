import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    propTypes: {
        host: React.PropTypes.string,
        onConnectKeyboard: React.PropTypes.func,
        onConnectSerial: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            device: '/dev/tty'
        };
    },
    connectKeyboard: function(event) {
        this.props.onConnectKeyboard(this.state.device);
    },
    connectSerial: function(event) {
        this.props.onConnectSerial(this.state.device);
    },

    render: function() {
        const {device} = this.props;

        return (
            <fieldset>
                <input id="device" name="device" placeholder="/dev/tty" value={device} onChange={this.changeDevice} ref="device" />
                <button value="keyboard" onClick={this.connectKeyboard} className="pure-button button-xlarge">
                    Keyboard
                </button>
                <button value="serial" onClick={this.connectSerial} className="pure-button button-xlarge">
                    Serial
                </button>
            </fieldset>
        );
    },

    changeDevice: function(event) {
        this.setState({device: event.target.value});
    }
});