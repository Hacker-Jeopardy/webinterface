import React from 'react';
import SelectServer from './SelectServer';

export default React.createClass({
    getInitialState: function() {
        return {
            server: {
                host: this.props.host,
                port: this.props.port
            }
        };
    },

    onConnect: function(data) {
        console.log(data);

        this.setState({
            server: {
                host: data.host,
                port: data.port
            }
        });
    },

    render: function() {
        return (
            <SelectServer host={this.state.server.host} port={this.state.server.port} onConnect={this.onConnect} />
        );
    }
});

/*
 Howler = require('../../node_modules/howler/howler').Howler;

 var _think = new Howl({urls: [require('../sound/think.wav')], volume: 0.5, loop: true});
 _think.play();
 */