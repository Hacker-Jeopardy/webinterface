export function setState(state) {
    return {
        type: 'SET_STATE',
        state: state
    };
}

function mergeServer(server) {
    return {
        type: 'SERVER',
        server: server
    };
}
function setServerState(state) {
    return mergeServer({
        state: state
    });
}
export function onConnect(server) {
    return mergeServer({
        state: 'connecting',
        host: server.host,
        port: server.port
    });
}
export function onReconnect() {
    return setServerState('connecting');
}
export function onConnected() {
    return setServerState('connected');
}
export function onDisconnected() {
    return setServerState('disconnected');
}

function event(data) {
    return {
        type: 'EVENT',
        event: data
    };
}
export function eventReady() {
    return event({
        event: 'ready'
    });
}
export function eventSelectRound(round_id) {
    return event({
        event: 'select_round',
        round: round_id
    });
}
export function eventAddPlayer(color) {
    return event({
        event: 'add_player',
        color: color
    });
}
export function eventUpdatePlayerName(playername) {
    return event({
        event: 'update_player_name',
        name: playername
    });
}
export function eventConfirmPlayer() {
    return event({
        event: 'confirm_player'
    });
}
export function eventSelectAnswer(category_index, answer_index) {
    return event({
        event: 'select_answer',
        category: category_index,
        answer: answer_index
    });
}

export function clearEvent() {
    return {
        type: 'CLEAR_EVENT'
    };
}

function error(type, msg) {
    return {
        type: 'ERROR',
        error: {
            type: type,
            msg: msg
        }
    };
}
export function logError(msg) {
    return error('error', msg);
}
export function logException(msg) {
    return error('exception', msg);
}
