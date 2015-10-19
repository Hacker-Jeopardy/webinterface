import React from 'react';

export default class SelectServer extends React.Component {
    constructor (props) {
        super(props);
        this.state = { host: '', port: '' };
        console.log(this);
        console.log(props);
    }

    componentDidMount() {
        console.log('SelectServer mounted.');
    }

    render() {
        var { host, port } = this.props;
        return (
            <div className="box-center">
                <form id="select_server" className="pure-form">
                    <fieldset>
                        <legend>Select Jeopardy Server</legend>

                        <label htmlFor="server_host">Host</label>
                        <input id="server_host" name="host" placeholder="127.0.0.1" value={host} onChange={this.changeHost} ref="host" pattern="(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))|(((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))" />

                        <label htmlFor="server_port">Port</label>
                        <input id="server_port" name="port" type="number" placeholder="4242" value={port} onChange={this.changePort} ref="port" min="0" max="65535" />
                    </fieldset>

                    <button type="submit" value="scoreboard" className="pure-button button-xlarge">
                        <i className="fa fa-table"></i> Scoreboard
                    </button>

                    <button type="submit" value="admin" className="pure-button button-xlarge">
                        <i className="fa fa-user-secret"></i> Admin
                    </button>
                </form>
            </div>
        );
    }

    changeHost(event) {
        this.setState({host: event.target.value});
    }
    changePort(event) {
        this.setState({port: event.target.value});
    }
}