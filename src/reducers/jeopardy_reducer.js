import { SET_JEOPARDY_STATE } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_JEOPARDY_STATE:
      return { ...state, ...action.payload };
  }

  return state;
}
