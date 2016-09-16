import { CONNECT } from './types';

export function connectToServer(host, port, ssl) {
  return {
    type: CONNECT,
    payload: { host, port, ssl },
  };
}
