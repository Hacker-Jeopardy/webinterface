import {Map, fromJS} from 'immutable';

const INITIAL_STATE = fromJS({
    server: {},
    game: {},
    log: []
});

function setGame(state, game) {
    console.dir(state.toJS());

    // keep answer
    if(game.state == 'answer' && game.answer && !game.answer.data) {
        game.answer.data = state.getIn(['game', 'answer', 'data']);
    }

    state = state.set('game', fromJS(game));
    console.dir(state.toJS());

    return state;
}

function setBuzzorder(state, buzzorder) {
    let game = state.get('game').toJS();
    game.buzzorder = buzzorder;

    state = state.set('game', fromJS(game));
    console.dir(state.toJS());

    return state;
}

function addToLog(state, error) {
    let log = state.get('log');

    return state.set('log',
        log.push(fromJS(error))
    );
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_STATE':
            return state.merge(
                fromJS(action.state)
            );
        case 'SET_GAME':
            return setGame(state, action.game);
        case 'SET_BUZZORDER':
            return setBuzzorder(state, action.buzzorder);

        case 'SERVER':
            return state.mergeDeep(fromJS({
                server: action.server
            }));

        case 'EVENT':
            return state.set('event', fromJS(action.event));
        case 'CLEAR_EVENT':
            return state.remove('event');

        case 'LOG':
            return addToLog(state, action.log);
        case 'ERROR':
            return addToLog(state, action.error);

        default:
            console.warn('unkown action type: ' + action.type);
            console.dir(action);
            break;
    }

    return state;
}