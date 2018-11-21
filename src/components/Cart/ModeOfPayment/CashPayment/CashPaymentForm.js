import PropTypes from 'prop-types';
import React from 'react';
import createRef from 'create-react-ref/lib/createRef';
import s from '../styles';
import TotalPayable from '../TotalPayable';
import ErrorText from '../ErrorText';
import PaymentDropDown from '../PaymentDropDown';
import HiddenValues from '../HiddenValues';
import Centers from '../Centers';
import { shaadiAndUaeCentreValidation, paymentFormURL } from '../../utils';

class CashPaymentForm extends React.Component {
  state = {
    centers: [],
    formFields: {
      city: '',
      uaeCentre: '',
    },
    formErrors: {
      city: '',
      centre: '',
    },
    isFormSubmit: false,
    isVisibleLoader: false,
  };
  onCityChange = event => {
    this.onChangeValue(event);
    const { uaeCentersCityList } = this.props;
    const centers = uaeCentersCityList.centers.filter(f => f.city === event.target.value);

    if (centers.length === 1) {
      const mEvent = { target: { name: 'centreadd', value: `${centers.map(item => item.id)[0]}` } };
      this.onChangeValue(mEvent);
    }
    this.setState({ centers });
  };
  onUaeCentre = event => {
    this.onChangeValue(event);
  };
  onChangeValue = event => {
    this.fieldValidation(event.target.name, event.target.value);
  };
  submitFormRef = createRef();
  fieldValidation = (fieldName, fieldValue) => {
    const { formErrors, formFields } = this.state;
    const returnValidation = shaadiAndUaeCentreValidation(false, formFields, formErrors, fieldName, fieldValue);
    this.setState({ formFields: returnValidation.formfield, formErrors: returnValidation.formErrors });

    const { city, centre } = this.state.formErrors;
    const validateField = { city, centre };
    const validateFormActive = Object.keys(validateField).map(field => validateField[field]);
    if (!validateFormActive.includes('') && !validateFormActive.includes(false)) {
      this.setState({ isFormSubmit: true });
    } else {
      this.setState({ isFormSubmit: false });
    }
  };
  placeOrder = () => {
    let fieldData = '';
    const { city, uaeCentre } = this.state.formFields;
    fieldData = { uaeCity: city, centreadd: uaeCentre };
    for (const fieldName of Object.keys(fieldData)) {
      this.fieldValidation(fieldName, fieldData[fieldName]);
    }
    if (this.state.isFormSubmit) {
      this.setState({
        isVisibleLoader: true,
        isFormSubmit: false,
      });
      this.submitFormRef.current.submit();
    }
  };
  render() {
    const { uaeCentersCityList: { cities = [] }, totalPayableProps, cartSubmitProps } = this.props;
    const { formErrors, formFields, centers, isVisibleLoader } = this.state;
    const totalPayableNewProps = { ...totalPayableProps, placeOrder: this.placeOrder, isVisibleLoader };
    const errorTextProps = {
      id: 'cash_payment_error',
      name: formErrors.city === true && formErrors.centre === false ? 'uaeCenter' : 'city',
      show: !!((formErrors.city === true && formErrors.centre === false) || formErrors.city === false),
    };
    const centersProps = {
      formErrors,
      centers,
      onSelectCentre: this.onUaeCentre,
      showHeading: false,
      checkboxId: 'uaeCentre',
      autoHeightMax: 180,
    };
    const hiddenValuesProps = { ...cartSubmitProps, ...totalPayableProps };
    const paymentValuesProps = {
      type: 'big',
      name: 'uaeCity',
      id: 'cust_city',
      list: cities,
      defaultText: 'Select City',
      onChange: this.onCityChange,
      value: formFields.city,
      formErrors,
    };
    return (
      <form ref={this.submitFormRef} name="cartform" method="post" action={paymentFormURL}>
        <s.CashPayment>
          <s.DefaultText>
            Pay cash at your nearest UAE Exchange <s.UaeXchangeIcon />
          </s.DefaultText>
          <s.SpacerTen />
          <s.BankHeading>Locate your nearest UAE Exchange Branch in</s.BankHeading>
          <s.SelectCashPayment>
            <s.SelectArrow>
              <PaymentDropDown {...paymentValuesProps} />
            </s.SelectArrow>
          </s.SelectCashPayment>
          {centers && centers.length > 0 && <Centers {...centersProps} />}
          <ErrorText {...errorTextProps} />
          <HiddenValues {...hiddenValuesProps} />
        </s.CashPayment>
        <TotalPayable {...totalPayableNewProps} />
      </form>
    );
  }
}
CashPaymentForm.propTypes = {
  uaeCentersCityList: PropTypes.shape(PropTypes.cartCentersCityList).isRequired,
  totalPayableProps: PropTypes.shape(PropTypes.cartTotalPayable).isRequired,
  cartSubmitProps: PropTypes.shape(PropTypes.cartSubmitProps).isRequired,
};
export default CashPaymentForm;
