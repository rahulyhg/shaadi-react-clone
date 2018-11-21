import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';
import getOptGrp from '../../../helpers/getOptGrp';
import statesHavingOtherDistricts from '../../../constants/list/statesHavingOtherDistricts.json';
import api from '../../../api';

class DistrictField extends PureComponent {
  state = {
    options: [],
    isLoading: true,
  };
  componentDidMount = () =>
    api.get('/lookup/district', { params: { state: this.props.state, country: this.props.country, listType: 'frequent' } }).then(response =>
      this.setState({
        options: getOptGrp({
          ...response.data,
          frequentLabel: 'Frequently Used',
          otherLabel: 'All Districts',
        }),
        isLoading: false,
      }),
    );
  componentWillUnmount = () => this.props.updateInputState({ canShowError: false });
  getOptionLabel = option => option.label || option;
  getOptionValue = option => option.options || option;
  render = () => (
    <ResponsiveFormFieldWithOptions
      name="district"
      id="district"
      placeholder="Search here"
      isMultiColumn
      maxLength={100}
      excludeForFilter={['other', 'others']}
      label={`District ${this.props.getHeOrSheOrYou().toLowerCase()} live${this.props.isPostedBySelf() ? '' : 's'} in?`}
      getOptionLabel={this.getOptionLabel}
      getOptionValue={this.getOptionValue}
      {...this.state}
      {...this.props}
    />
  );
}

DistrictField.propTypes = {
  state: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  getHeOrSheOrYou: PropTypes.func.isRequired,
  isPostedBySelf: PropTypes.func.isRequired,
  updateInputState: PropTypes.func.isRequired,
};

const getContext = context => {
  const isVisible =
    context.user.isIndian() && context.form.city.value === 'Other' && !!statesHavingOtherDistricts.includes(context.form.state.value);
  !isVisible && context.form.district.value && context.form.updateInputValue('district')('');
  return {
    ...context.form.district,
    isVisible,
    updateInputState: context.form.updateInputState('district'),
    getHeOrSheOrYou: context.user.getHeOrSheOrYou,
    isPostedBySelf: context.user.isPostedBySelf,
    state: context.form.state.value,
    country: context.user.country,
    isRequired: true,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(DistrictField));
