import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import CashPaymentForm from './CashPaymentForm';
import SvgLoader from '../../../Common/SvgLoader';

class CashPayment extends React.PureComponent {
  componentDidMount() {
    this.props.paymentActionHandler('uaeExchangeCitiesApi');
  }
  render() {
    const {
      currency = '',
      uaeCentersCityList,
      settings: { cashPaymentConvertedAmount },
      isShaadiCareChecked,
      isProfileBoosterChecked,
      isSymbolCodeCurrency,
      finalAmount: amount = 0,
      cartId,
      accessToken,
      mopId,
      mopName,
    } = this.props;
    const cartSubmitProps = { cartId, accessToken, mopId, mopName };
    const { cities = [] } = uaeCentersCityList;
    const {
      currency: approxCurrency = '',
      shaadi_care: shaadiCare = 0,
      spotlight = 0,
      value: approxAmount = 0,
    } = cashPaymentConvertedAmount;
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
    const cashPaymentFormProps = {
      uaeCentersCityList,
      totalPayableProps,
      cartSubmitProps,
      currency,
    };

    return (
      <s.MainDiv>
        {(cities.length > 0 && (
          <s.CartContent id="cash_payment">
            <CashPaymentForm {...cashPaymentFormProps} />
          </s.CartContent>
        )) || (
          <s.LoaderWrapper>
            <SvgLoader isVisible isBigLoader />
          </s.LoaderWrapper>
        )}
      </s.MainDiv>
    );
  }
}
CashPayment.propTypes = {
  ...PropTypes.cartSubmitProps,
  ...PropTypes.cartCommonProps,
  uaeCentersCityList: PropTypes.shape(PropTypes.cartCentersCityList).isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
};

export default CashPayment;
