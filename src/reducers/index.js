import { reducer as formReducer } from 'redux-form';

const reducers = {
  title: (state = '') => state,
  config: (state = {}) => state,
  form: formReducer,
};

export default reducers;
