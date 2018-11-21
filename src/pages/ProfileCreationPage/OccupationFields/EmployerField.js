import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';
import api from '../../../api';

class EmployerField extends PureComponent {
  state = {
    options: [],
    isLoading: false,
  };
  componentDidMount = () => this.fetchOptions(this.props.value);
  afterInputChange = ({ value }) => this.fetchOptions(value);
  fetchOptions = value => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ isLoading: true });
      api
        .get('/lookup/employer', { params: { employer: value || 'a' } })
        .then(response => this.setState({ options: response.data, isLoading: false }))
        .catch(response => this.setState({ isLoading: false }));
    }, 300);
  };
  render = () => (
    <ResponsiveFormFieldWithOptions
      name="employer"
      id="employer"
      placeholder={`Type ${this.props.suffix} name here`}
      label={`${this.props.getHisOrHerOrYour()} ${this.props.suffix} name (current)`}
      maxLength={100}
      afterInputChange={this.afterInputChange}
      getOptionValue={({ full_name }) => full_name}
      getOptionLabel={({ full_name }) => full_name}
      canShowKeepAs
      hideArrow
      hideNoResultFound
      noFilter
      {...this.state}
      {...this.props}
    />
  );
}

EmployerField.propTypes = {
  getHisOrHerOrYour: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
};

const getContext = context => {
  const workingWith = context.form.workingWith.value;
  const isVisible = !['Not Working', ''].includes(workingWith);
  !isVisible && context.form.employer.value && context.form.employer.updateInputValue('');
  const suffix = workingWith === 'Business / Self Employed' ? 'business' : 'employer';
  return {
    ...context.form.employer,
    isVisible,
    suffix,
    getHisOrHerOrYour: context.user.getHisOrHerOrYour,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(EmployerField));
