import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ResponsiveFormFieldWithOptions from '../../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import withDeviceInfo from '../../../components/HOC/withDeviceInfo';
import CustomToolTip from '../../../components/Common/CustomToolTip';
import ShowHide from '../../../components/HOC/ShowHide';
import api from '../../../api';
import s from '../styles';

const getIncomeTooltipMsiteProps = isMobile =>
  isMobile
    ? {
        right: '-49px',
        afterRight: 'calc(25% - 5px)',
      }
    : undefined;

class AnnualIncomeField extends PureComponent {
  state = {
    options: [],
    isLoading: true,
  };
  componentDidMount = () => {
    this.props.value === 'Not applicable' && this.props.updateInputState({ value: '', default: false });
    api
      .get('/lookup/annual-income', { params: { country: this.props.country } })
      .then(response => this.setState({ options: response.data, isLoading: false }));
  };
  componentWillUnmount = () => this.timeOut && clearTimeout(this.timeOut);
  canShowOption = option => !(this.props.workingWith !== 'Not Working' && option.label === 'Not applicable');
  render = () => (
    <Fragment>
      <ResponsiveFormFieldWithOptions
        name="income"
        id="income"
        getOptionValue={({ id }) => id}
        getOptionLabel={({ text }) => text}
        placeholder="Select"
        label={`${this.props.getHisOrHerOrYour()} annual income`}
        canShowOption={this.canShowOption}
        isReadOnly
        {...this.state}
        {...this.props}
      />
      <s.incomeRequired>
        <s.incomeTooltipLabel>Why is income required?</s.incomeTooltipLabel>
        <CustomToolTip id="tooltip-income" tooltipMargin="2px 8px 0 2px" {...getIncomeTooltipMsiteProps(this.props.isMobile())}>
          Your income will be used for matchmaking. You can hide your income from others using Privacy Settings.
        </CustomToolTip>
      </s.incomeRequired>
    </Fragment>
  );
}

AnnualIncomeField.propTypes = {
  country: PropTypes.string.isRequired,
  workingWith: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  getHisOrHerOrYour: PropTypes.func.isRequired,
  isMobile: PropTypes.func.isRequired,
  updateInputValue: PropTypes.func.isRequired,
  updateInputState: PropTypes.func.isRequired,
};

const getContext = context => {
  const { workingWith: { value: workingWith }, income } = context.form;
  const isVisible = workingWith !== 'Not Working';
  !isVisible &&
    income.value !== 'Not applicable' &&
    context.form.updateInputState('income')({ value: 'Not applicable', default: true, canShowError: false });
  return {
    ...income,
    isVisible,
    updateInputState: context.form.updateInputState('income'),
    workingWith,
    getHisOrHerOrYour: context.user.getHisOrHerOrYour,
    country: context.user.country,
    isRequired: true,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(withDeviceInfo(ShowHide(AnnualIncomeField)));
