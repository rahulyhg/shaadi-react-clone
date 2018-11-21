import PropTypes from 'prop-types';
import React from 'react';
import createRef from 'create-react-ref/lib/createRef';
import s from '../styles';
import TotalPayable from '../TotalPayable';
import HiddenValues from '../HiddenValues';
import { paymentFormURL } from '../../utils';

class PaypalForm extends React.Component {
  state = {
    isFormSubmit: true,
    isVisibleLoader: false,
  };
  submitFormRef = createRef();
  placeOrder = () => {
    if (this.state.isFormSubmit) {
      this.setState({
        isVisibleLoader: true,
        isFormSubmit: false,
      });
      this.submitFormRef.current.submit();
    }
  };
  render() {
    const { totalPayableProps, cartSubmitProps } = this.props;
    const { isVisibleLoader } = this.state;
    const totalPayableNewProps = { ...totalPayableProps, placeOrder: this.placeOrder, isVisibleLoader };
    const hiddenValuesProps = { ...cartSubmitProps, ...totalPayableProps };
    return (
      <form ref={this.submitFormRef} name="cartform" method="post" action={paymentFormURL}>
        <s.PayPal id="payPal">
          <s.BankHeading>Pay Using your PayPal account.</s.BankHeading>
          <s.DefaultText>
            We will take you to secure site where you can make payment using your PayPal account and get your membership activated
            instantly.
          </s.DefaultText>
          <HiddenValues {...hiddenValuesProps} />
        </s.PayPal>
        <TotalPayable {...totalPayableNewProps} />
      </form>
    );
  }
}
PaypalForm.propTypes = {
  totalPayableProps: PropTypes.shape(PropTypes.cartTotalPayable).isRequired,
  cartSubmitProps: PropTypes.shape(PropTypes.cartSubmitProps).isRequired,
};
export default PaypalForm;
