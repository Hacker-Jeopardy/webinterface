import Immutable from 'immutable';
import { SET_CONFIG } from '../actions/types';


const config = localStorage.getItem('config');
const INITIAL_STATE = Immutable.fromJS(
  config ? JSON.parse(config) : {
    server: {
      host: 'localhost',
      port: 4242,
      ssl: false,
    },
  }
);

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CONFIG: {
      const config = { ...state, ...action.payload };
      localStorage.setItem('config', config);
      return config;
    }
  }

  return state;
}
