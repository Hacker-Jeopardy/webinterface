import React from 'react';
import SelectServer from './SelectServer';

export default class App extends React.Component {
    render() {
        return (
            <SelectServer host={""} port={""} />
        );
    }
}

/*
 Howler = require('../../node_modules/howler/howler').Howler;

 var _think = new Howl({urls: [require('../sound/think.wav')], volume: 0.5, loop: true});
 _think.play();
 */