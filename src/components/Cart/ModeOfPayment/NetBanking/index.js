import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import NetBankingForm from './NetBankingForm';
import NetBankingJusPayForm from './JusPayForm/NetBankingJusPayForm';
import SvgLoader from '../../../Common/SvgLoader';

class NetBanking extends React.PureComponent {
  componentDidMount() {
    const isJusPay = !!(this.props.juspayNetBankingAB === 'B');
    this.props.paymentActionHandler('bankListApi', isJusPay);
  }
  render() {
    const {
      currency = '',
      bankList,
      settings: { netBankingConvertedAmount },
      isShaadiCareChecked,
      isProfileBoosterChecked,
      isSymbolCodeCurrency,
      finalAmount: amount = 0,
      cartPageExperiment,
      cartId,
      accessToken,
      mopId,
      mopName,
      paymentActionHandler,
      orderId,
      juspayNetBankingAB,
    } = this.props;
    const cartSubmitProps = { cartId, accessToken, mopId, mopName };
    const { topBanks = [] } = bankList;
    const {
      currency: approxCurrency = '',
      shaadi_care: shaadiCare = 0,
      spotlight = 0,
      value: approxAmount = 0,
    } = netBankingConvertedAmount;
    const buttonText = cartPageExperiment && cartPageExperiment === 'C' ? 'Next' : 'Pay Now';
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
      isTextVisible: true,
    };
    const netBankingFormProps = {
      bankList,
      totalPayableProps,
      cartSubmitProps,
    };
    const showJusPayForm = !!(juspayNetBankingAB === 'B');
    return (
      <s.MainDiv>
        {(topBanks.length > 0 && (
          <s.CartContent id="net_banking">
            {!showJusPayForm ? (
              <NetBankingForm {...netBankingFormProps} />
            ) : (
              <NetBankingJusPayForm orderId={orderId} paymentActionHandler={paymentActionHandler} {...netBankingFormProps} />
            )}
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
NetBanking.propTypes = {
  ...PropTypes.cartSubmitProps,
  ...PropTypes.cartCommonProps,
  bankList: PropTypes.shape(PropTypes.cartBankList).isRequired,
  cartPageExperiment: PropTypes.string.isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
  orderId: PropTypes.shape(PropTypes.cartOrderId).isRequired,
  juspayNetBankingAB: PropTypes.string.isRequired,
};

export default NetBanking;
