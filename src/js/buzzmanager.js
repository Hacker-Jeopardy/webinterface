var BuzzManager = function() {
    this._url = 'ws://localhost:4242/';
    this._websocket = null;
    this._reconnectIntervall = null;
    this._open = false;
    this._DouglasAdamsHandshake = false;
    this.events = {
        onOpen: function(event){ console.log('websocket opend'); console.log(event); },
        onClose: function(event){ console.log('websocket closed'); console.log(event); },
        onNewKeyboard: function(keyboard){ console.log('new keyboard: %s', keyboard); },
        onKeyboardDisconnected: function(keyboard){ console.log('keyboard disconnected: %s', keyboard); },
        onKeyboardBuzzed: function(keyboard){ console.log('keyboard buzzed: %s', keyboard); },
    };

    this.initWebsocket();
};

BuzzManager.prototype.reconnect = function() {
    console.log('reconnect');
    console.log(this);

    if(!this._open) {
        this.initWebsocket();
    }
};

BuzzManager.prototype.initWebsocket = function() {
    try {
        this._DouglasAdamsHandshake = false;
        this._websocket = new WebSocket(this._url, ['protocolOne', 'protocolTwo']);

        var that = this;
        this._websocket.onopen = function(e){ that._onopen(e); };
        this._websocket.onmessage = function(e){ that._onmessage(e); };
        this._websocket.onerror = function(e){ that._onerror(e); };
        this._websocket.onclose = function(e){ that._onclose(e); };
    } catch(e) {
        console.log(e);
    }
};

BuzzManager.prototype.isOpen = function() {
    return this._open;
};

BuzzManager.prototype.refresh = function() {
    console.log('Refresh Keyboards.');
    this._websocket.send('REFRESH');
};

BuzzManager.prototype._onmessage = function(event) {
    console.log(event);

    // handshake
    if(!this._DouglasAdamsHandshake) {
        if(event.data === '42') {
            this._DouglasAdamsHandshake = true;
            this.refresh();
            $('#menu-websocket-error').hide();
        } else {
            console.log('Waiting for Websocket handshake. Ignored Message.');
            //notification.warning('Waiting for Websocket handshake...', 'Houston, We've Got a Problem');
        }

        return;
    }

    var data = JSON.parse(event.data);

    switch(data.event) {
        case 'status':
            var keyboards = data.keyboards;

            for(var i=0; i < keyboards.length; i++) {
                this.events.onNewKeyboard(keyboards[i]);
            }
            break;

        case 'disconnect':
            var keyboard = data.keyboard;

            this.events.onKeyboardDisconnected(keyboard);
            break;

        case 'buzz':
            var keyboard = data.keyboard;

            this.events.onKeyboardBuzzed(keyboard);
            break;

        default:
            console.log('ignored unknown websocket message:');
            console.log(data);
            break;
    }
};

BuzzManager.prototype._onopen = function() {
    this._open = true;
    this.events.onOpen();
    this._websocket.send('Answer to the Ultimate Question of Life, The Universe, and Everything');

    //notification.info('The Websocket is up.');

    if(this._reconnectIntervall !== null) {
        clearInterval(this._reconnectIntervall);
        this._reconnectIntervall = null;
    }
};

BuzzManager.prototype._onerror = function(event) {
    console.log('Websocket error:');
    console.log(event);

    //notification.error('The Websocket is broken.', 'Houston, We've Got a Problem');
};

BuzzManager.prototype._onclose = function() {
    this._open = false;
    this.events.onClose();

    $('#menu-websocket-error').show();
    //notification.warning('The Websocket went down.', 'Houston, We've Got a Problem');

    if(this._reconnectIntervall === null) {
        var that = this;
        this._reconnectIntervall = setInterval(function(){ that.reconnect(); }, 5000);
    }
};

var buzzer = new BuzzManager();
