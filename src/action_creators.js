export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function connect(entry) {
    return {
        type: 'CONNECT',
        entry
    };
}