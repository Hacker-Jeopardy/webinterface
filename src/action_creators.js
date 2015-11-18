export function setState(state) {
    return {
        type: 'SET_STATE',
        state: state
    };
}

export function connect(server) {
    return {
        type: 'CONNECT',
        server: server
    };
}