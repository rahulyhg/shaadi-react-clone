import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import ShaadiCenterForm from './ShaadiCenterForm';

class ShaadiCenter extends React.PureComponent {
  componentDidMount() {
    this.props.paymentActionHandler('shaadiCenterCitiesApi');
  }
  render() {
    const {
      currency = '',
      shaadiCentersCityList,
      settings: { shaadiCenterConvertedAmount },
      isShaadiCareChecked,
      isProfileBoosterChecked,
      isSymbolCodeCurrency,
      finalAmount: amount = 0,
      otpGenerationData,
      otpVerificationData,
      paymentActionHandler,
      cartId,
      accessToken,
      mopId,
      mopName,
      verifiedMobile,
    } = this.props;
    const cartSubmitProps = { cartId, accessToken, mopId, mopName };
    const {
      currency: approxCurrency = '',
      shaadi_care: shaadiCare = 0,
      spotlight = 0,
      value: approxAmount = 0,
    } = shaadiCenterConvertedAmount;
    const buttonText = 'Proceed';
    const totalPayableProps = {
      buttonText,
      isSymbolCodeCurrency,
      amount,
      currency,
      approxAmount,
      approxCurrency,
      isShaadiCareChecked,
      isProfileBoosterChecked,
      shaadiCare,
      spotlight,
    };
    const shaadiCenterFormProps = {
      shaadiCentersCityList,
      totalPayableProps,
      cartSubmitProps,
      currency,
      verifiedMobile,
      paymentActionHandler,
      otpGenerationData,
      otpVerificationData,
    };
    return (
      <s.MainDiv>
        <ShaadiCenterForm {...shaadiCenterFormProps} />
      </s.MainDiv>
    );
  }
}
ShaadiCenter.propTypes = {
  ...PropTypes.cartSubmitProps,
  ...PropTypes.cartCommonProps,
  shaadiCentersCityList: PropTypes.shape(PropTypes.cartCentersCityList).isRequired,
  otpGenerationData: PropTypes.shape(PropTypes.cartOtpGenerationData).isRequired,
  otpVerificationData: PropTypes.shape(PropTypes.cartOtpVerificationData).isRequired,
  verifiedMobile: PropTypes.shape(PropTypes.cartVerifiedMobile).isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
};

export default ShaadiCenter;
