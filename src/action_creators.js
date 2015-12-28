export function setState(state) {
    return {
        type: 'SET_STATE',
        state: state
    };
}
export function setGame(game) {
    return {
        type: 'SET_GAME',
        game: game
    };
}
export function setBuzzorder(buzzorder) {
    return {
        type: 'SET_BUZZORDER',
        buzzorder: buzzorder
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
export function eventRefresh() {
    return event({
        event: 'refresh'
    });
}
export function eventReconnectBuzzer(playerId) {
    return event({
        event: 'reconnect',
        player: playerId
    });
}
export function eventDisconnectBuzzer(playerId) {
    return event({
        event: 'disconnect',
        player: playerId
    });
}
export function eventStartGame() {
    return event({
        event: 'start'
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

export function eventUpdateScore(player_id, new_score) {
    return event({
        event: 'update_score',
        player: player_id,
        score: new_score
    });
}

function eventAnswer(type) {
    return event({
        event: type
    });
}
export function eventAnswerWin() {
    return eventAnswer('win');
}
export function eventAnswerFail() {
    return eventAnswer('fail');
}
export function eventAnswerOops() {
    return eventAnswer('oops');
}
export function eventAnswerExit() {
    return eventAnswer('exit');
}

function eventConnect(type, device) {
    return event({
        event: 'connect_buzzergroup',
        type: type,
        device: device
    });
}
export function eventConnectKeyboard(device) {
    return eventConnect('keyboard', device)
}
export function eventConnectSerial(device) {
    return eventConnect('serial', device)
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


export function logMessage(msg) {
    return {
        type: 'LOG',
        log: {
            msg: msg
        }
    };
}