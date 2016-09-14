import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {action} from '../actions/index';
import inputField from '../fields/input';

class Connect extends Component {
  static displayName = 'Connect';
  static propTypes = {
    handleSubmit: React.PropTypes.func,
  };
  static defaultProps = {};

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit(console.log) }>
        <h3>Connect</h3>

        <Field name="field1" label="Field 1" type="text" component={ inputField } />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.field1) {
    errors.field1 = 'Required';
  }

  return errors;

};

const ConnectForm = reduxForm({
  form: 'Connect',
  validate,
})(Connect);

export default connect(state => ({
  // prop: state.prop
}), dispatch => bindActionCreators({
  // action: action
}, dispatch))(ConnectForm);
