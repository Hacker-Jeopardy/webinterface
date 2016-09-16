import { expect } from '../test_helper';
import { connectToServer } from '../../src/actions/index';
import { CONNECT } from '../../src/actions/types';

describe('actions', () => {
  let action;

  describe('connectToServer()', () => {
    const eventType = CONNECT;
    const host = 'host', port = 1234, ssl = true;

    beforeEach(() => {
      action = connectToServer(host, port, ssl);
    });

    it('has type CONNECT', () => {
      expect(action.type).to.equals(eventType);
    });

    it('has the correct payload', () => {
      expect(action.payload).to.eql({ host, port, ssl });
    });
  });

});
