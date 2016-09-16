import Immutable from 'immutable';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connectToServer } from '../actions/index';
import inputField from '../fields/input';

class Connect extends Component {
  static displayName = 'Connect';
  static propTypes = {
    handleSubmit: React.PropTypes.func,
    reset: React.PropTypes.func,
    connect: React.PropTypes.func,
    pristine: React.PropTypes.bool,
    submitting: React.PropTypes.bool,
  };
  static defaultProps = {};

  onSubmit(data) {
    this.props.connect(data.host, data.port, data.ssl);
  }

  render() {
    const { handleSubmit, reset, pristine, submitting } = this.props;
    return (
      <form onSubmit={ handleSubmit(data => this.onSubmit(data)) }>
        <h3>Connect</h3>

        <Field name="host" label="Host" type="text" component={ inputField } />
        <Field name="port" label="Port" type="number" min="0" max="65535" component={ inputField } />
        <Field name="ssl" label="SSL" type="checkbox" component={ inputField } />

        <button type="submit" disabled={ submitting }>Submit</button>
        <button type="button" disabled={ pristine || submitting } onClick={ reset }>Reset</button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  values = Immutable.fromJS(values);

  if (!values.get('host')) {
    errors.host = 'Required';
  }

  const port = values.get('port');
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    errors.port = 'No Valid Port';
  }

  return errors;
};

const ConnectForm = reduxForm({
  form: 'Connect',
  getFormState: (state) => state.get('form').toJS(),
  validate,
})(Connect);

export default connect(state => ({
  initialValues: state.getIn(['config', 'server']).toJS(),
}), dispatch => bindActionCreators({
  connect: connectToServer,
}, dispatch))(ConnectForm);
