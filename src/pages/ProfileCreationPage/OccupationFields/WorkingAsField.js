import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';
import api from '../../../api';

class WorkingAsField extends PureComponent {
  state = {
    options: [],
    isLoading: true,
  };
  componentDidMount = () =>
    api
      .get('/lookup/working-as', { params: { country: this.props.country } })
      .then(response => this.setState({ options: response.data, isLoading: false }));
  componentDidUpdate = prevProps => {
    if (this.props.workingWith && this.props.industry === 'Non Working') {
      this.props.updateInputState({ value: '', industry: '' });
    }
  };
  componentWillUnmount = () => this.props.updateInputState({ canShowError: false });
  getOptionValue = option => option.id || option[Object.keys(option)[0]];
  getOptionLabel = option => option.text || Object.keys(option)[0];
  canShowOption = option => !this.props.workingWith || option.label !== 'Non Working';
  mutateSelectedOption = ({ value, group }) => ({ value, industry: group.label });
  render = () => (
    <ResponsiveFormFieldWithOptions
      name="workingAs"
      id="workingAs"
      placeholder="Search here"
      label="As"
      getOptionValue={this.getOptionValue}
      getOptionLabel={this.getOptionLabel}
      canShowOption={this.canShowOption}
      mutateSelectedOption={this.mutateSelectedOption}
      isMultiColumn
      {...this.state}
      {...this.props}
    />
  );
}

WorkingAsField.propTypes = {
  country: PropTypes.string.isRequired,
  industry: PropTypes.string.isRequired,
  workingWith: PropTypes.string.isRequired,
  updateInputState: PropTypes.func.isRequired,
};

const getContext = context => {
  const workingWith = context.form.workingWith.value;
  const isVisible = workingWith !== 'Not Working';
  !isVisible && context.form.workingAs.value && context.form.updateInputState('workingAs')({ value: '', industry: '' });
  return {
    ...context.form.workingAs,
    country: context.user.country,
    updateInputState: context.form.updateInputState('workingAs'),
    isVisible,
    workingWith,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(WorkingAsField));
