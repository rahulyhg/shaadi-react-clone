import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';
import getOptGrp from '../../../helpers/getOptGrp';
import api from '../../../api';

class CityField extends PureComponent {
  state = {
    options: [],
    isLoading: false,
  };
  componentDidMount = () => !this.props.isDisabled && this.fetchOptions();
  componentDidUpdate = prevProps => {
    if (prevProps.state.value === this.props.state.value) {
      return;
    }
    if (!this.props.isDisabled) {
      this.fetchOptions();
      this.props.updateInputState('city')({ value: '' });
    } else {
      this.props.updateInputState('city')({ value: '', canShowError: false });
    }
  };
  componentWillUnmount = () => this.props.updateInputState('city')({ canShowError: false });
  setOptions = response =>
    this.setState({
      options: getOptGrp({
        ...response.data,
        frequentLabel: 'Frequently Used',
        otherLabel: 'All Cities',
      }),
      isLoading: false,
    });
  getOptionLabel = option => option.label || option.city_label;
  getOptionValue = option => option.options || option.city_label;
  fetchOptions = () => {
    const { state: { value: state }, country } = this.props;
    this.setState({ isLoading: true });
    api.get('/lookup/city', { params: { state, country } }).then(this.setOptions);
  };
  render = () => (
    <ResponsiveFormFieldWithOptions
      name="city"
      id="city"
      placeholder="Search here"
      isMultiColumn
      canSearch
      maxLength={100}
      excludeForFilter={['other', 'others']}
      getOptionLabel={this.getOptionLabel}
      getOptionValue={this.getOptionValue}
      onClick={this.onClick}
      {...this.state}
      {...this.props}
    />
  );
}

CityField.propTypes = {
  state: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
  country: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isPostedBySelf: PropTypes.func.isRequired,
  getHeOrSheOrYou: PropTypes.func.isRequired,
  updateInputState: PropTypes.func.isRequired,
};

const getContext = context => {
  const isVisible = !context.user.isZipCountry() || context.form.zipStatus.checked;
  const isDisabled = !context.form.state.value || !!context.form.state.canShowError;
  !isVisible && context.form.city.value && context.form.updateInputValue('city')('');
  return {
    ...context.form.city,
    state: context.form.state,
    country: context.user.country,
    isPostedBySelf: context.user.isPostedBySelf,
    getHeOrSheOrYou: context.user.getHeOrSheOrYou,
    isDisabled,
    isRequired: true,
    updateInputState: context.form.updateInputState,
    label: `City ${context.user.getHeOrSheOrYou().toLowerCase()} live${context.user.isPostedBySelf() ? '' : 's'} in?`,
    isVisible,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(CityField));
