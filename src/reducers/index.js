import Immutable from 'immutable';
import { reducer as formReducer } from 'redux-form';
import jeopardyReducer from './jeopardy_reducer';
import configReducer from './config_reducer';

const reducers = {
  title: (state = '') => state,
  jeopardy: jeopardyReducer,
  config: configReducer,
  form: (state = Immutable.fromJS({}), action) => Immutable.fromJS(formReducer(state.toJS(), action)),
};

export default reducers;
