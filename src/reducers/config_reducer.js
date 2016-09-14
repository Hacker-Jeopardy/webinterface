import { SET_CONFIG } from '../actions/types';

const INITIAL_STATE = localStorage.getItem('config') || {};

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
