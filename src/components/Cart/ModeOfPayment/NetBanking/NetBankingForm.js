import PropTypes from 'prop-types';
import React from 'react';
import createRef from 'create-react-ref/lib/createRef';
import s from '../styles';
import TotalPayable from '../TotalPayable';
import ErrorText from '../ErrorText';
import PaymentDropDown from '../PaymentDropDown';
import HiddenValues from '../HiddenValues';
import { paymentFormURL, netBankingFormValidation } from '../../utils';

const defaultBank = {
  HDF: 'HDFC Bank',
  ICI: 'ICICI Bank',
  UTI: 'Axis Bank',
  SBI: 'State Bank of India',
  IDB: 'IDBI Bank',
  PNB: 'Punjab National Bank',
};
class NetBankingForm extends React.Component {
  state = {
    bankName: '',
    selectedBank: '',
    formErrors: {
      bankName: '',
    },
    isFormSubmit: false,
    isVisibleLoader: false,
  };
  onChangeValue = event => {
    this.fieldValidation(event.target.name, event.target.value);
  };
  onBankClick = bankCode => {
    const fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.bankName = true;
    const selectedBank = defaultBank[bankCode];
    this.setState({ bankName: bankCode, formErrors: fieldValidationErrors, isFormSubmit: true, selectedBank });
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
    if (this.state.isFormSubmit) {
      this.setState({
        isVisibleLoader: true,
        isFormSubmit: false,
      });
      this.submitFormRef.current.submit();
    }
  };
  render() {
    const { bankList: { topBanks = [], otherBanks = [] }, totalPayableProps, cartSubmitProps } = this.props;
    const { formErrors, isVisibleLoader, bankName, selectedBank } = this.state;
    const totalPayableNewProps = { ...totalPayableProps, placeOrder: this.placeOrder, isVisibleLoader };
    const errorTextProps = {
      id: 'netbanking_error',
      name: 'bankName',
      show: !!(formErrors.bankName === false),
    };
    const hiddenValuesProps = { ...cartSubmitProps, ...totalPayableProps, bankName: selectedBank };
    const paymentDropDownProps = {
      type: 'medium',
      name: 'bank_code',
      id: 'bank_code',
      list: topBanks,
      defaultText: 'Select Bank',
      onChange: this.onChangeValue,
      value: bankName,
      formErrors,
      label: 'Top Banks',
      listKey: 'bank_code',
      listValue: 'bank_code',
      listDisplay: 'bank_name',
      otherList: otherBanks,
      otherLabel: 'All Banks',
      refValue: this.bankCodeRef,
    };
    return (
      <form ref={this.submitFormRef} name="cartform" method="post" action={paymentFormURL}>
        <s.NetBanking>
          <s.BankHeading>Popular Banks</s.BankHeading>
          <s.BankContainer>
            {Object.keys(defaultBank).map(
              (bankCode, i) =>
                i <= 2 && (
                  <s.BankWrapper key={bankCode} onClick={e => this.onBankClick(bankCode)}>
                    <s.RadioButton type="radio" name="bankname" value={bankCode} checked={bankName === bankCode} />
                    {bankCode === 'HDF' && <s.HdfcIcon />}
                    {bankCode === 'ICI' && <s.IciciIcon />}
                    {bankCode === 'UTI' && <s.AxisIcon />}
                  </s.BankWrapper>
                ),
            )}
          </s.BankContainer>
          <s.BankContainer>
            {Object.keys(defaultBank).map(
              (bankCode, i) =>
                i > 2 && (
                  <s.BankWrapper key={bankCode} onClick={e => this.onBankClick(bankCode)}>
                    <s.RadioButton type="radio" name="bankname" value={bankCode} checked={bankName === bankCode} />
                    {bankCode === 'SBI' && <s.SbiIcon />}
                    {bankCode === 'IDB' && <s.IdbiIcon />}
                    {bankCode === 'PNB' && <s.PunjabIcon />}
                  </s.BankWrapper>
                ),
            )}
          </s.BankContainer>
          <s.BankHeading>All Bank</s.BankHeading>
          <s.SelectContainer>
            <s.SelectArrow>
              <PaymentDropDown {...paymentDropDownProps} />
            </s.SelectArrow>
          </s.SelectContainer>
          <ErrorText {...errorTextProps} />
          <HiddenValues {...hiddenValuesProps} />
        </s.NetBanking>
        <TotalPayable {...totalPayableNewProps} />
      </form>
    );
  }
}
NetBankingForm.propTypes = {
  bankList: PropTypes.shape(PropTypes.cartBankList).isRequired,
  totalPayableProps: PropTypes.shape(PropTypes.cartTotalPayable).isRequired,
  cartSubmitProps: PropTypes.shape(PropTypes.cartSubmitProps).isRequired,
};
export default NetBankingForm;
