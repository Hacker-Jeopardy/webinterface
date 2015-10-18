/*
Howler = require('../../node_modules/howler/howler').Howler;

var _think = new Howl({urls: [require('../sound/think.wav')], volume: 0.5, loop: true});
_think.play();
*/



function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function() {
    var content = document.getElementById('content');

    var templates = {};
    templates.select_server = require('../templates/select-server.mustache');

    content.innerHTML = templates.select_server({});
});