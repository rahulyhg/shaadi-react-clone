import PropTypes from 'prop-types';
import React from 'react';
import TopBand from './TopBand';
import OrderSummary from './OrderSummary';
import ModeOfPayment from './ModeOfPayment';
import MatchGuarantee from './MatchGuarantee';
import SvgLoader from '../Common/SvgLoader';
import s from './styles';

class Cart extends React.PureComponent {
  state = {
    isShaadiCareChecked: true,
    isProfileBoosterChecked: false,
    finalAmount: 0,
  };

  componentWillReceiveProps(nextProps) {
    const cartData = nextProps.cartPage.cart.cartData;
    this.setState({
      finalAmount:
        (cartData.settings &&
          cartData.settings.yourPrice +
            ((this.state.isShaadiCareChecked && cartData.settings.shaadiCareAmount) || 0) +
            ((this.state.isProfileBoosterChecked && cartData.settings.profileBoosterAmount) || 0)) ||
        0,
    });
  }

  doShaadiCareToggle = checked => {
    const cartData = this.props.cartPage.cart.cartData;
    this.setState({
      isShaadiCareChecked: checked,
      finalAmount:
        checked === true
          ? this.state.finalAmount + cartData.settings.shaadiCareAmount
          : this.state.finalAmount - cartData.settings.shaadiCareAmount,
    });
  };

  doProfileBoosterToggle = checked => {
    const cartData = this.props.cartPage.cart.cartData;
    this.setState({
      isProfileBoosterChecked: checked,
      finalAmount:
        checked === true
          ? this.state.finalAmount + cartData.settings.profileBoosterAmount
          : this.state.finalAmount - cartData.settings.profileBoosterAmount,
    });
  };

  render() {
    const {
      cartPage: {
        cart: {
          cartData: {
            cart_details: cartDetails = {},
            customer_details: customerDetails = {},
            mode_of_payment: modeOfPayment,
            settings = {},
            errorMsg,
            query,
          },
        },
        bankList,
        doorStep: doorStepCityList,
        shaadiCenters: shaadiCentersCityList,
        uaeCities: uaeCentersCityList,
        otpGeneration: otpGenerationData,
        otpVerification: otpVerificationData,
        orderId,
        verifiedMobile,
      },
      accessToken,
      cartPageExperiment,
      paymentActionHandler,
      juspayAB,
      juspayNetBankingAB,
    } = this.props;
    const { currency, id: cartId } = cartDetails;
    const { ip: ipAddress = '' } = customerDetails;
    const { finalAmount, isShaadiCareChecked, isProfileBoosterChecked } = this.state;
    const errorMsgDisplay = errorMsg || (query && query.error ? query.error : '');
    const { offerDiscountPerc, offerDiscountAmount, discountedPrice: offerDiscountedPercPrice, isPersonalisedPlan } = settings;
    const topBandProps = { offerDiscountPerc, offerDiscountAmount, offerDiscountedPercPrice, currency };
    const mopProps = {
      modeOfPayment,
      finalAmount,
      currency,
      settings,
      isShaadiCareChecked,
      isProfileBoosterChecked,
      cartPageExperiment,
      bankList,
      doorStepCityList,
      shaadiCentersCityList,
      uaeCentersCityList,
      otpGenerationData,
      otpVerificationData,
      cartId,
      accessToken,
      paymentActionHandler,
      customerDetails,
      verifiedMobile,
      orderId,
      juspayAB,
      juspayNetBankingAB,
    };
    const orderSummaryProps = {
      doProfileBoosterToggle: this.doProfileBoosterToggle,
      doShaadiCareToggle: this.doShaadiCareToggle,
      cartInfo: cartDetails,
      settings,
      finalAmount,
      isShaadiCareChecked,
      isProfileBoosterChecked,
    };
    const matchGuaranteeProps = { isPersonalisedPlan };
    return (
      <s.Cart>
        <TopBand {...topBandProps} />
        {errorMsgDisplay && (
          <s.ErrorWrapper>
            <s.ErrorIcon />
            <s.ErrorDefault>
              <s.ErrorBold>{errorMsgDisplay}</s.ErrorBold>
            </s.ErrorDefault>
          </s.ErrorWrapper>
        )}
        {(cartId && (
          <s.CartContent>
            <s.Content left>
              <ModeOfPayment {...mopProps} />
            </s.Content>
            <s.Content right>
              <OrderSummary {...orderSummaryProps} />
              <MatchGuarantee {...matchGuaranteeProps} />
            </s.Content>
          </s.CartContent>
        )) || (
          <s.LoaderWrapper>
            <SvgLoader isVisible isBigLoader />
          </s.LoaderWrapper>
        )}
        {ipAddress && (
          <s.IpAddressBand>
            By clicking on Pay Now, you authorize Shaadi.com to charge your card (details mentioned above). IP Address of this transaction
            is {ipAddress}
          </s.IpAddressBand>
        )}
      </s.Cart>
    );
  }
}
Cart.propTypes = {
  cartPage: PropTypes.objectOf(PropTypes.shape(PropTypes.cart)).isRequired,
  cartPageExperiment: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
  juspayAB: PropTypes.string.isRequired,
  juspayNetBankingAB: PropTypes.string.isRequired,
};

export default Cart;
