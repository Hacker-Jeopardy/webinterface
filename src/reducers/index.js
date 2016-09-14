import { reducer as formReducer } from 'redux-form';
import jeopardyReducer from './jeopardy_reducer';
import configReducer from './config_reducer';

const reducers = {
  title: (state = '') => state,
  jeopardy: jeopardyReducer,
  config: configReducer,
  form: formReducer,
};

export default reducers;
