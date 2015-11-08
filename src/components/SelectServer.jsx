import React from 'react';

export default React.createClass({
    getInitialState: function() {
        return {
            host: this.props.host,
            port: this.props.port
        };
    },

    onSubmit: function() {
        this.props.onConnect(this.state);
    },

    render: function() {
        return (
            <div className="box-center">
                <form id="select_server" className="pure-form" onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Select Jeopardy Server</legend>

                        <label htmlFor="server_host">Host</label>
                        <input id="server_host" name="host" placeholder="127.0.0.1" value={this.state.host} onChange={this.changeHost} ref="host" />

                        <label htmlFor="server_port">Port</label>
                        <input id="server_port" name="port" type="number" placeholder="4242" value={this.state.port} onChange={this.changePort} ref="port" min="0" max="65535" />
                    </fieldset>

                    <button type="submit" value="scoreboard" onClick={this.changeType} className="pure-button button-xlarge">
                        <i className="fa fa-table"></i> Scoreboard
                    </button>

                    <button type="submit" value="admin" onClick={this.changeType} className="pure-button button-xlarge">
                        <i className="fa fa-user-secret"></i> Admin
                    </button>
                </form>
            </div>
        );
    },

    changeHost: function(event) {
        this.setState({host: event.target.value});
    },
    changePort: function(event) {
        this.setState({port: event.target.value});
    },
    changeType: function(event) {
        this.setState({type: event.target.value});
    }
});