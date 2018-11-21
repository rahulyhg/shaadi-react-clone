import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';
import api from '../../../api';

class HighestCollegeField extends PureComponent {
  state = {
    options: [],
    isLoading: false,
  };
  componentDidMount = () => this.fetchOptions(this.props.value);
  componentWillUnmount = () => this.timeOut && clearTimeout(this.timeOut);
  afterInputChange = ({ value }) => this.fetchOptions(value);
  fetchOptions = value => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({ isLoading: true });
      api
        .get('/lookup/college', { params: { college: value || 'a' } })
        .then(response => this.setState({ options: response.data, isLoading: false }))
        .catch(response => this.setState({ isLoading: false }));
    }, 300);
  };
  render = () => (
    <ResponsiveFormFieldWithOptions
      name="highestCollege"
      id="highestCollege"
      placeholder="Type college name here"
      label={`Highest degree college ${this.props.getHeOrSheOrYou().toLowerCase()} attended`}
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

HighestCollegeField.propTypes = {
  getHeOrSheOrYou: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const getContext = context => {
  const isVisible = !['', 'High school', 'Less than high school', 'Trade school'].includes(context.form.educationLevel.value);
  !isVisible && context.form.college1.value && context.form.college1.updateInputValue('');
  return {
    ...context.form.college1,
    isVisible,
    getHeOrSheOrYou: context.user.getHeOrSheOrYou,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(HighestCollegeField));
