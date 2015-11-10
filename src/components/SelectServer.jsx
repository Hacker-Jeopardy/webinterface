import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const SelectServer = React.createClass({
    getInitialState: function() {
        return {
            host: this.props.host,
            port: this.props.port
        };
    },

    connect: function(event) {
        let data = {
            host: this.state.host,
            port: this.state.port,
            type: event.target.value
        };

        this.props.connect(data);
    },

    render: function() {
        return (
            <div className="box-center">
                <form id="select_server" className="pure-form">
                    <fieldset>
                        <legend>Select Jeopardy Server</legend>

                        <label htmlFor="server_host">Host</label>
                        <input id="server_host" name="host" placeholder="127.0.0.1" value={this.state.host} onChange={this.changeHost} ref="host" />

                        <label htmlFor="server_port">Port</label>
                        <input id="server_port" name="port" type="number" placeholder="4242" value={this.state.port} onChange={this.changePort} ref="port" min="0" max="65535" />
                    </fieldset>

                    <button type="submit" value="scoreboard" onClick={this.connect} className="pure-button button-xlarge">
                        <i className="fa fa-table"></i> Scoreboard
                    </button>

                    <button type="submit" value="admin" onClick={this.connect} className="pure-button button-xlarge">
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
        this.setState({port: parseInt(event.target.value)});
    }
});

function mapStateToProps(state) {
    return {
        host: state.getIn(['server', 'host']),
        port: state.getIn(['server', 'port'])
    };
}

export const SelectServerContainer = connect(
    mapStateToProps,
    actionCreators
)(SelectServer);