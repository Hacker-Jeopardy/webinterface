export function setState(state) {
    return {
        type: 'SET_STATE',
        state: state
    };
}

export function onConnect(server) {
    return {
        type: 'CONNECT',
        server: {
            state: 'connecting',
            host: server.host,
            port: server.port
        }
    };
}
export function onReconnect(server) {
    return {
        type: 'RECONNECT',
        server: {
            state: 'connecting'
        }
    };
}

export function onConnected() {
    return {
        type: 'CONNECTED',
        server: {
            state: 'connected'
        }
    };
}
export function onDisconnected() {
    return {
        type: 'DISCONNECTED',
        server: {
            state: 'disconnected'
        }
    };
}