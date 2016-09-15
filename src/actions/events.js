import { SEND_EVENT } from './types';

export const EVENT_READY = 'ready';
export const EVENT_REFRESH = 'refresh';
export const EVENT_RECONNECT_BUZZER = 'reconnect';
export const EVENT_DISCONNECT_BUZZER = 'disconnect';
export const EVENT_START_GAME = 'start';
export const EVENT_SELECT_ROUND = 'select_round';
export const EVENT_ADD_PLAYER = 'add_player';
export const EVENT_UPDATE_PLAYER_NAME = 'update_player_name';
export const EVENT_CONFIRM_PLAYER = 'confirm_player';
export const EVENT_SELECT_ANSWER = 'select_answer';
export const EVENT_UPDATE_SCORE = 'update_score';
export const EVENT_ANSWER_WIN = 'win';
export const EVENT_ANSWER_FAIL = 'fail';
export const EVENT_ANSWER_OOPS = 'oops';
export const EVENT_ANSWER_EXIT = 'exit';
export const EVENT_CONNECT_BUZZER = 'connect_buzzergroup';

export const BUZZER_TYPE_KEYBOARD = 'keyboard';
export const BUZZER_TYPE_SERIAL = 'serial';

export function sendEvent(event, data) {
  return {
    type: SEND_EVENT,
    payload: { event, ...data },
  };
}

export function connectBuzzer(type, devicePath) {
  return sendEvent(EVENT_CONNECT_BUZZER, { type, device: devicePath });
}
export function reconnectBuzzer(playerId) {
  return sendEvent(EVENT_RECONNECT_BUZZER, { player: playerId });
}
export function disconnectBuzzer(playerId) {
  return sendEvent(EVENT_DISCONNECT_BUZZER, { player: playerId });
}

export function selectRound(roundId) {
  return sendEvent(EVENT_DISCONNECT_BUZZER, { round: roundId });
}

export function addPlayer(color) {
  return sendEvent(EVENT_ADD_PLAYER, { color });
}
export function updatePlayerName(playerName) {
  return sendEvent(EVENT_UPDATE_PLAYER_NAME, { name: playerName });
}

export function selectAnswer(categoryIndex, answerIndex) {
  return sendEvent(EVENT_SELECT_ANSWER, { category: categoryIndex, answer: answerIndex });
}

export function updateScore(playerId, newScore) {
  return sendEvent(EVENT_UPDATE_SCORE, { player: playerId, score: newScore });
}
