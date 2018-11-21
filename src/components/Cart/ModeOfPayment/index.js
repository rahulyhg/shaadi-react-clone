import PropTypes from 'prop-types';
import React from 'react';
import CreditCard from './CreditCard';
import Paypal from './Paypal';
import NetBanking from './NetBanking';
import PayAtDoorStep from './PayAtDoorStep';
import PaymentAtBank from './PaymentAtBank';
import ShaadiCenter from './ShaadiCenter';
import CashPayment from './CashPayment';
import s from './styles';
import Tabs from '../../Common/Tabs';
import Tab from '../../Common/Tabs/Tab';
import TabList from '../../Common/Tabs/TabList';
import TabPanels from '../../Common/Tabs/TabPanels';
import TabPanel from '../../Common/Tabs/TabPanel';

const ModeOfPayment = props => {
  const {
    currency = '',
    settings,
    isShaadiCareChecked,
    isProfileBoosterChecked,
    finalAmount,
    cartPageExperiment,
    bankList,
    doorStepCityList,
    shaadiCentersCityList,
    uaeCentersCityList,
    otpGenerationData,
    otpVerificationData,
    paymentActionHandler,
    cartId,
    accessToken,
    customerDetails,
    verifiedMobile,
    modeOfPayment,
    orderId,
    juspayAB,
    juspayNetBankingAB,
  } = props;
  const {
    isCreditCardMop,
    isDebitCardMop,
    isPaypalMop,
    isNetBankingMop,
    isPayAtDoorStepMop,
    isPaymentAtBankMop,
    isShaadiCentreMop,
    isCashPaymentMop,
    mopIds: { creditCardId, debitCardId, paypalId, netBankingId, payAtDoorStepId, paymentAtBankId, shaadiCenterId, cashPaymentId },
  } = settings;
  const isSymbolCodeCurrency = ['USD', 'GBP', 'INR'].includes(currency);
  const otpVerificationProps = {
    otpGenerationData,
    otpVerificationData,
  };
  const commonMopProps = {
    finalAmount,
    isSymbolCodeCurrency,
    settings,
    currency,
    isShaadiCareChecked,
    isProfileBoosterChecked,
    cartPageExperiment,
    paymentActionHandler,
    cartId,
    accessToken,
  };
  const getMopName = (mopid, types) => types.filter(f => f && f.id === mopid).map(f => f.mode)[0] || '';

  return (
    <s.MopShadow>
      <Tabs>
        <TabList getListStyle={s.getListStyle}>
          <Tab getStyle={s.getStyle}>
            {isCreditCardMop && (
              <s.CartList id="creditCardTab" className="creditCardTab">
                <s.CvvContainer>
                  <s.DebitIcon />Credit Card
                </s.CvvContainer>
              </s.CartList>
            )}
          </Tab>
          <Tab getStyle={s.getStyle}>
            {isDebitCardMop && (
              <s.CartList id="debitCardTab" className="debitCardTab">
                <s.CvvContainer>
                  <s.DebitIcon />Debit Card
                </s.CvvContainer>
              </s.CartList>
            )}
          </Tab>
          <Tab getStyle={s.getStyle}>
            {isPaypalMop && (
              <s.CartList id="paypalTab" className="paypalTab">
                <s.CvvContainer>
                  <s.PaypalIcon />Paypal
                </s.CvvContainer>
              </s.CartList>
            )}
          </Tab>
          <Tab getStyle={s.getStyle}>
            {isNetBankingMop && (
              <s.CartList id="netBankingTab" className="netBankingTab">
                <s.CvvContainer>
                  <s.NetBanIcon />
                  <s.NetBankText>
                    Net Banking<br />
                    <s.NetBankSmall>(For Indian Banks Only)</s.NetBankSmall>
                  </s.NetBankText>
                </s.CvvContainer>
              </s.CartList>
            )}
          </Tab>
          <Tab getStyle={s.getStyle}>
            {isPayAtDoorStepMop && (
              <s.CartList id="payAtDoorStepTab" className="payAtDoorStepTab">
                <s.CvvContainer>
                  <s.PayDoorIcon />Pay at Doorstep
                </s.CvvContainer>
              </s.CartList>
            )}
          </Tab>
          <Tab getStyle={s.getStyle}>
            {isPaymentAtBankMop && (
              <s.CartList id="paymentAtBankTab" className="paymentAtBankTab">
                <s.CvvContainer>
                  <s.PayBankIcon />Payment at Bank
                </s.CvvContainer>
              </s.CartList>
            )}
          </Tab>
          <Tab getStyle={s.getStyle}>
            {isShaadiCentreMop && (
              <s.CartList id="shaadiCentreTab" className="shaadiCentreTab">
                <s.CvvContainer>
                  <s.ShaadiCentreIcon />Shaadi.com Centre
                </s.CvvContainer>
              </s.CartList>
            )}
          </Tab>
          <Tab getStyle={s.getStyle}>
            {isCashPaymentMop && (
              <s.CartList id="cashPaymentTab" className="cashPaymentTab">
                <s.CvvContainer>
                  <s.CashBankIcon />Cash Payment
                </s.CvvContainer>
              </s.CartList>
            )}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {isCreditCardMop && (
              <CreditCard
                tab="CreditCard"
                mopId={creditCardId}
                mopName={getMopName(creditCardId, modeOfPayment)}
                orderId={orderId}
                juspayAB={juspayAB}
                {...commonMopProps}
              />
            )}
          </TabPanel>
          <TabPanel>
            {isDebitCardMop && (
              <CreditCard
                tab="DebitCard"
                mopId={debitCardId}
                mopName={getMopName(debitCardId, modeOfPayment)}
                orderId={orderId}
                juspayAB={juspayAB}
                {...commonMopProps}
              />
            )}
          </TabPanel>
          <TabPanel>
            {isPaypalMop && <Paypal mopId={paypalId} mopName={getMopName(paypalId, modeOfPayment)} {...commonMopProps} />}
          </TabPanel>
          <TabPanel>
            {isNetBankingMop && (
              <NetBanking
                mopId={netBankingId}
                mopName={getMopName(netBankingId, modeOfPayment)}
                bankList={bankList}
                orderId={orderId}
                juspayNetBankingAB={juspayNetBankingAB}
                {...commonMopProps}
              />
            )}
          </TabPanel>
          <TabPanel>
            {isPayAtDoorStepMop && (
              <PayAtDoorStep
                mopId={payAtDoorStepId}
                mopName={getMopName(payAtDoorStepId, modeOfPayment)}
                doorStepCityList={doorStepCityList}
                customerDetails={customerDetails}
                verifiedMobile={verifiedMobile}
                {...commonMopProps}
                {...otpVerificationProps}
              />
            )}
          </TabPanel>
          <TabPanel>
            {isPaymentAtBankMop && (
              <PaymentAtBank
                mopId={paymentAtBankId}
                mopName={getMopName(paymentAtBankId, modeOfPayment)}
                customerDetails={customerDetails}
                verifiedMobile={verifiedMobile}
                {...commonMopProps}
                {...otpVerificationProps}
              />
            )}
          </TabPanel>
          <TabPanel>
            {isShaadiCentreMop && (
              <ShaadiCenter
                mopId={shaadiCenterId}
                mopName={getMopName(shaadiCenterId, modeOfPayment)}
                shaadiCentersCityList={shaadiCentersCityList}
                verifiedMobile={verifiedMobile}
                {...commonMopProps}
                {...otpVerificationProps}
              />
            )}
          </TabPanel>
          <TabPanel>
            {isCashPaymentMop && (
              <CashPayment
                mopId={cashPaymentId}
                mopName={getMopName(cashPaymentId, modeOfPayment)}
                uaeCentersCityList={uaeCentersCityList}
                verifiedMobile={verifiedMobile}
                {...commonMopProps}
              />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </s.MopShadow>
  );
};
ModeOfPayment.propTypes = {
  finalAmount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  settings: PropTypes.shape(PropTypes.cartSettings).isRequired,
  isShaadiCareChecked: PropTypes.bool.isRequired,
  isProfileBoosterChecked: PropTypes.bool.isRequired,
  bankList: PropTypes.shape(PropTypes.cartBankList).isRequired,
  doorStepCityList: PropTypes.shape(PropTypes.cartDoorStepCityList).isRequired,
  shaadiCentersCityList: PropTypes.shape(PropTypes.cartCentersCityList).isRequired,
  uaeCentersCityList: PropTypes.shape(PropTypes.cartCentersCityList).isRequired,
  otpGenerationData: PropTypes.shape(PropTypes.cartOtpGenerationData).isRequired,
  otpVerificationData: PropTypes.shape(PropTypes.cartOtpVerificationData).isRequired,
  cartPageExperiment: PropTypes.string.isRequired,
  cartId: PropTypes.number.isRequired,
  accessToken: PropTypes.string.isRequired,
  modeOfPayment: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      mode: PropTypes.string.isRequired,
      order_amount: PropTypes.object.isRequired,
    }).isRequired,
  ).isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
  customerDetails: PropTypes.shape(PropTypes.cartCustomerDetails).isRequired,
  verifiedMobile: PropTypes.shape(PropTypes.cartVerifiedMobile).isRequired,
  orderId: PropTypes.shape(PropTypes.cartOrderId).isRequired,
  juspayAB: PropTypes.string.isRequired,
  juspayNetBankingAB: PropTypes.string.isRequired,
};

export default ModeOfPayment;
