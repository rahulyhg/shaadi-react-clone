import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';
import getOptGrp from '../../../helpers/getOptGrp';
import api from '../../../api';

class StateField extends PureComponent {
  state = {
    options: [],
    isLoading: true,
  };
  componentDidMount = () => {
    const { country } = this.props;
    api.get('/lookup/state', { params: { country } }).then(response =>
      this.setState({
        options: getOptGrp({
          ...response.data,
          frequentLabel: 'Frequently Used',
          otherLabel: 'All States',
        }),
        isLoading: false,
      }),
    );
  };
  componentWillUnmount = () => this.props.updateInputState({ canShowError: false });
  getOptionLabel = option => option.label || option;
  getOptionValue = option => option.options || option;
  render = () => (
    <ResponsiveFormFieldWithOptions
      name="state"
      id="state"
      maxLength={100}
      placeholder="Search here"
      getOptionLabel={this.getOptionLabel}
      getOptionValue={this.getOptionValue}
      label={`State ${this.props.getHeOrSheOrYou().toLowerCase()} live${this.props.isPostedBySelf() ? '' : 's'} in?`}
      isMultiColumn
      {...this.state}
      {...this.props}
    />
  );
}

StateField.propTypes = {
  country: PropTypes.string.isRequired,
  getHeOrSheOrYou: PropTypes.func.isRequired,
  isPostedBySelf: PropTypes.func.isRequired,
  updateInputState: PropTypes.func.isRequired,
};

const getContext = context => {
  const { isZipCountry, getHeOrSheOrYou, isPostedBySelf, country } = context.user;
  const isVisible = !isZipCountry() || context.form.zipStatus.checked;
  !isVisible && context.form.state.value && context.form.updateInputValue('state')('');
  return {
    ...context.form.state,
    isVisible,
    updateInputState: context.form.updateInputState('state'),
    getHeOrSheOrYou,
    isPostedBySelf,
    country,
    isRequired: true,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(StateField));
