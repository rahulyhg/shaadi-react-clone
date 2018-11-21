import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import createRef from 'create-react-ref/lib/createRef';
import s from '../../styles';
import FeaturedBanks from './FeaturedBanks';
import TotalPayable from '../../TotalPayable';
import ErrorText from '../../ErrorText';
import PaymentDropDown from '../../PaymentDropDown';
import HiddenValues from '../../HiddenValues';
import doDomActions from '../../../../../actions/doDomActions';
import { featuredJusPayBank, orderIdGeneration, netBankingDropDownProps, netBankingFormValidation } from '../../../utils';

class NetBankingJusPayForm extends React.Component {
  state = {
    bankName: '',
    selectedBank: '',
    formErrors: {
      bankName: '',
    },
    orderId: '',
    isFormSubmit: false,
    isVisibleLoader: false,
  };
  componentDidMount() {
    this.props.doDomActions({ type: 'appendScript', script: './JusPayNetBankingSetup.js' });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.orderId !== this.props.orderId.id) {
      if (this.state.isFormSubmit === true) {
        this.updateAndSubmitForm(this.props.orderId.id);
      }
    }
  }
  onChangeValue = event => {
    this.fieldValidation(event.target.name, event.target.value);
  };
  onBankClick = bankCode => {
    const fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.bankName = true;
    const selectedBank = featuredJusPayBank[bankCode];
    this.setState({ bankName: bankCode, formErrors: fieldValidationErrors, isFormSubmit: true, selectedBank });
  };
  getOrderId = () => {
    orderIdGeneration(this.props.totalPayableProps, this.props.cartSubmitProps, this.props.paymentActionHandler);
  };
  updateAndSubmitForm = orderId => {
    this.setState({ orderId, isFormSubmit: false }, () => {
      document.getElementById('common_pay_btn').click();
    });
  };
  bankCodeRef = createRef();
  submitFormRef = createRef();
  fieldValidation = (fieldName, fieldValue) => {
    const returValidation = netBankingFormValidation(this.state.formErrors, fieldValue, this.bankCodeRef);
    this.setState({
      formErrors: returValidation.formErrors,
      selectedBank: returValidation.selectedBank,
      bankName: returValidation.bankName,
      isFormSubmit: returValidation.isFormSubmit,
    });
  };
  placeOrder = () => {
    this.fieldValidation('bankName', this.state.bankName);
    if (this.state.isVisibleLoader === false) {
      if (this.state.isFormSubmit) {
        this.setState({ isVisibleLoader: true });
        this.getOrderId();
      }
    }
  };
  render() {
    const { bankList: { topBanks = [], otherBanks = [] }, totalPayableProps, cartSubmitProps, orderId } = this.props;
    const { formErrors, isVisibleLoader, bankName, selectedBank } = this.state;
    const totalPayableNewProps = { ...totalPayableProps, placeOrder: this.placeOrder, isVisibleLoader };
    const errorTextProps = {
      id: 'netbanking_error',
      name: 'bankName',
      show: !!(formErrors.bankName === false),
    };
    const hiddenValuesProps = { ...cartSubmitProps, ...totalPayableProps, bankName: selectedBank };
    const paymentDropDownProps = {
      ...netBankingDropDownProps,
      list: topBanks,
      onChange: this.onChangeValue,
      value: bankName,
      formErrors,
      otherList: otherBanks,
      refValue: this.bankCodeRef,
    };
    return (
      <form className="juspay_inline_form" id="juspay_netbanking_form">
        <s.NetBanking>
          <s.BankHeading>Popular Banks</s.BankHeading>
          <s.BankContainer>
            <FeaturedBanks bankName={bankName} onBankClick={this.onBankClick} />
          </s.BankContainer>
          <s.BankContainer>
            <FeaturedBanks bankName={bankName} onBankClick={this.onBankClick} lastThree />
          </s.BankContainer>
          <s.BankHeading>All Bank</s.BankHeading>
          <s.SelectContainer>
            <s.SelectArrow>
              <PaymentDropDown {...paymentDropDownProps} />
            </s.SelectArrow>
          </s.SelectContainer>
          <ErrorText {...errorTextProps} />
          <s.InputHidden type="hidden" className="payment_method_type" value="NB" />
          <s.JusPayButton ref={this.submitFormRef} type="submit" className="make_payment" id="common_pay_btn" />
          <HiddenValues {...hiddenValuesProps} juspay orderId={orderId.id} />
        </s.NetBanking>
        <TotalPayable {...totalPayableNewProps} />
      </form>
    );
  }
}
NetBankingJusPayForm.propTypes = {
  bankList: PropTypes.shape(PropTypes.cartBankList).isRequired,
  totalPayableProps: PropTypes.shape(PropTypes.cartTotalPayable).isRequired,
  cartSubmitProps: PropTypes.shape(PropTypes.cartSubmitProps).isRequired,
  doDomActions: PropTypes.func.isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
  orderId: PropTypes.shape(PropTypes.cartOrderId).isRequired,
};

const selector = () => ({});
export default connect(selector, { doDomActions })(NetBankingJusPayForm);
