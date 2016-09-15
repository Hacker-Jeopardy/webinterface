import { expect } from '../test_helper';
import * as events from '../../src/actions/events';
import { SEND_EVENT } from '../../src/actions/types';

describe('actions', () => {
  let action;

  const testActionType = () => {
    it('has type SEND_EVENT', () => {
      expect(action.type).to.equals(SEND_EVENT);
    });
  };

  describe('events', () => {
    describe('sendEvent()', () => {
      const eventType = events.EVENT_READY;

      beforeEach(() => {
        action = events.sendEvent(eventType);
      });

      testActionType();

      it('has the correct event type', () => {
        expect(action.payload.event).to.equals(eventType);
      });

      describe('data', () => {
        const test = 'test';
        beforeEach(() => {
          action = events.sendEvent(eventType, { test });
        });

        it('appends data to payload', () => {
          expect(action.payload.test).to.equals(test);
        });

        it('leaves event type in payload untouched', () => {
          expect(action.payload.event).to.equals(eventType);
        });
      });
    });

    const testEvent = (funcName, eventType, data = {}) => {
      describe(`${funcName}()`, () => {
        beforeEach(() => {
          action = events[funcName](...Object.keys(data).map(key => data[key]));
        });

        testActionType();

        it('has the correct event type', () => {
          expect(action.payload.event).to.equals(eventType);
        });

        Object.keys(data).map(key => {
          it(`has the correct ${key} value`, () => {
            expect(action.payload[key]).to.equals(data[key]);
          });
        });
      });
    };

    const buzzerType = events.BUZZER_TYPE_KEYBOARD;
    const devicePath = 'devicePath';
    const playerId = 1234;
    testEvent('connectBuzzer', events.EVENT_CONNECT_BUZZER, { type: buzzerType, device: devicePath});
    testEvent('reconnectBuzzer', events.EVENT_RECONNECT_BUZZER, { player: playerId });
    testEvent('disconnectBuzzer', events.EVENT_DISCONNECT_BUZZER, { player: playerId });

    const roundId = 'round1';
    testEvent('selectRound', events.EVENT_DISCONNECT_BUZZER, { round: roundId });

    const color = '#00FF55';
    const playerName = 'Player 1';
    testEvent('addPlayer', events.EVENT_ADD_PLAYER, { color });
    testEvent('updatePlayerName', events.EVENT_UPDATE_PLAYER_NAME, { name: playerName });

    const categoryIndex = 13, answerIndex = 37;
    testEvent('selectAnswer', events.EVENT_SELECT_ANSWER, { category: categoryIndex, answer: answerIndex });

    const newScore = 42;
    testEvent('updateScore', events.EVENT_UPDATE_SCORE, { player: playerId, score: newScore });
  });

});
