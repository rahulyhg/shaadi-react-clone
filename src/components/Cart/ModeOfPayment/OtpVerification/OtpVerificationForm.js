import PropTypes from 'prop-types';
import React from 'react';
import createRef from 'create-react-ref/lib/createRef';
import s from '../styles';
import TotalPayable from '../TotalPayable';
import ErrorText from '../ErrorText';
import HiddenValues from '../HiddenValues';
import SvgLoader from '../../../Common/SvgLoader';
import { paymentFormURL } from '../../utils';

class OtpVerificationForm extends React.Component {
  state = {
    time: {},
    seconds: 60,
    gotResponse: false,
    otpFormFields: {
      otpVal1: '',
      otpVal2: '',
      otpVal3: '',
      otpVal4: '',
      otp: '',
    },
    formErrors: {
      otp: '',
    },
    isFormSubmit: false,
    isVisibleLoader: false,
    shouldVerifyOtp: false,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.otpGenerationData.loading === false && this.state.gotResponse === false) {
      this.setState({ gotResponse: true });
    }
    if (
      this.props.otpGenerationData.loading === true &&
      nextProps.otpGenerationData.loading === false &&
      nextProps.otpGenerationData.errorMsg === '' &&
      nextProps.otpGenerationData.attempt <= 3
    ) {
      this.startTimer();
    }

    if (nextProps.otpVerificationData.success && this.state.isFormSubmit === true) {
      this.submitFormRef.current.submit();
    } else if (nextProps.otpVerificationData.errorMsg !== '') {
      this.setState({
        isVisibleLoader: false,
        isFormSubmit: false,
        otpFormFields: { otpVal1: '', otpVal2: '', otpVal3: '', otpVal4: '', otp: '' },
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  timer = 0;
  otpNumber1 = createRef();
  otpNumber2 = createRef();
  otpNumber3 = createRef();
  otpNumber4 = createRef();
  payNowBtnRef = createRef();
  submitFormRef = createRef();
  secondsToTime = secs => Math.ceil((secs % (60 * 60)) % 60);
  startTimer = () => {
    this.setState({ time: { s: this.secondsToTime(60) }, seconds: 60 });
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  };
  countDown = () => {
    const seconds = this.state.seconds - 1;
    this.setState({
      time: { s: this.secondsToTime(seconds) },
      seconds,
    });
    if (seconds === 0) {
      clearInterval(this.timer);
      this.timer = 0;
    }
  };
  handleOtpInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    const keyCode = e.keyCode || e.which;
    this.otpValidationForm(keyCode, name, value);
  };
  otpValidationForm = (keyCode, fieldName, value) => {
    const fieldValidationErrors = this.state.formErrors;
    const otpVerFormfield = this.state.otpFormFields;
    let fieldVal = value.replace(/\s/g, '');
    const regExp = new RegExp(/[^0-9\s]+/);
    fieldVal = regExp.test(fieldVal) === false ? fieldVal : '';
    const isValidKeyCode = !![48, 49, 50, 51, 52, 53, 54, 55, 56, 57].includes(keyCode);
    switch (fieldName) {
      case 'otp_1': {
        otpVerFormfield.otpVal1 = fieldVal;
        if (isValidKeyCode && keyCode !== undefined && otpVerFormfield.otpVal1 !== '') {
          this.otpNumber2.current.focus();
        }
        if (keyCode === 8 && otpVerFormfield.otpVal1 === '') {
          this.otpNumber1.current.focus();
        }
        break;
      }
      case 'otp_2': {
        otpVerFormfield.otpVal2 = fieldVal;
        if (isValidKeyCode && keyCode !== undefined && otpVerFormfield.otpVal2 !== '') {
          this.otpNumber3.current.focus();
          otpVerFormfield.otpVal3 = keyCode ? String.fromCharCode(keyCode) : '';
        }
        if (keyCode === 8 && otpVerFormfield.otpVal2 === '') {
          this.otpNumber1.current.focus();
          otpVerFormfield.otpVal1 = '';
        }
        break;
      }
      case 'otp_3': {
        otpVerFormfield.otpVal3 = fieldVal;
        if (isValidKeyCode && keyCode !== undefined && otpVerFormfield.otpVal3 !== '') {
          this.otpNumber4.current.focus();
          otpVerFormfield.otpVal4 = keyCode ? String.fromCharCode(keyCode) : '';
        }
        if (keyCode === 8 && otpVerFormfield.otpVal3 === '') {
          this.otpNumber2.current.focus();
          otpVerFormfield.otpVal2 = '';
        }
        break;
      }
      case 'otp_4': {
        otpVerFormfield.otpVal4 = fieldVal;
        if (isValidKeyCode && keyCode !== undefined && otpVerFormfield.otpVal4 === '') {
          this.otpNumber4.current.focus();
        }
        if (keyCode === 8 && otpVerFormfield.otpVal4 === '') {
          this.otpNumber3.current.focus();
          otpVerFormfield.otpVal3 = '';
        }
        break;
      }
      default: {
        break;
      }
    }
    const tempOtpValue = `${otpVerFormfield.otpVal1}${otpVerFormfield.otpVal2}${otpVerFormfield.otpVal3}${otpVerFormfield.otpVal4}`;
    fieldValidationErrors.otp = !!(tempOtpValue.length === 4);
    otpVerFormfield.otp = tempOtpValue;
    if (fieldValidationErrors.otp === true && keyCode === 13) {
      this.payNowBtnRef.current.focus();
    }
    this.setState({ otpFormFields: otpVerFormfield, formErrors: fieldValidationErrors });
  };
  resendOTP = type => {
    const { mobile, country, countryCode } = this.props.verifiedMobile;
    this.props.paymentActionHandler('otpGenerationApi', mobile, country, countryCode);
  };
  placeOrder = () => {
    const { otpVal1, otpVal2, otpVal3, otpVal4 } = this.state.otpFormFields;
    const fieldData = { otpVal1, otpVal2, otpVal3, otpVal4 };
    for (const fieldName of Object.keys(fieldData)) {
      this.otpValidationForm(fieldName, fieldData[fieldName], 'submit');
    }

    if (this.state.isFormSubmit) {
      this.setState({
        isVisibleLoader: true,
        isFormSubmit: false,
      });
      this.submitFormRef.current.submit();
    } else if (this.state.formErrors.otp === true && this.state.isFormSubmit === false) {
      this.setState({ isVisibleLoader: true, isFormSubmit: true });
      this.props.paymentActionHandler('otpVerificationApi', this.state.otpFormFields.otp);
    }
  };
  render() {
    const {
      otpGenerationData: { loading, attempt = 0, errorMsg: generationError },
      otpVerificationData: { errorMsg },
      totalPayableProps,
      cartSubmitProps,
      formFields,
      otpPage,
    } = this.props;
    const { gotResponse, time, otpFormFields, isVisibleLoader } = this.state;
    const { otpVal1, otpVal2, otpVal3, otpVal4 } = otpFormFields;
    const isError = errorMsg !== '' || false;
    const showResend = !loading && attempt < 3 && generationError === '';
    const totalPayableNewProps = {
      ...totalPayableProps,
      placeOrder: this.placeOrder,
      isVisibleLoader,
      buttonRef: this.payNowBtnRef,
      buttonId: `${otpPage}Btn`,
    };
    const errorTextProps = {
      id: 'otp_error',
      name: 'otp',
      show: !!isError,
      isPosCenter: true,
    };
    const hiddenValuesProps = { ...cartSubmitProps, ...totalPayableProps, otpPage, formFields };
    const commonOtpProps = {
      maxLength: '1',
      onChange: event => this.handleOtpInput(event),
      onKeyDown: event => this.handleOtpInput(event),
      isError,
      autoComplete: 'off',
      pattern: '[0-9]*',
    };
    const otpFirstProps = {
      name: 'otp_1',
      id: 'otp_1',
      value: otpVal1,
      returnKeyType: 'next',
      autoFocus: 'autoFocus',
      innerRef: this.otpNumber1,
    };
    const otpSecondProps = { name: 'otp_2', id: 'otp_2', value: otpVal2, returnKeyType: 'next', innerRef: this.otpNumber2 };
    const otpThirdProps = { name: 'otp_3', id: 'otp_3', value: otpVal3, returnKeyType: 'next', innerRef: this.otpNumber3 };
    const otpFourthProps = { name: 'otp_4', id: 'otp_4', value: otpVal4, innerRef: this.otpNumber4 };
    return (
      <form ref={this.submitFormRef} name="cartform" method="post" action={paymentFormURL}>
        {(gotResponse && (
          <s.CartContent id="otp_verification">
            <s.OtpVerification>
              <s.OtpHeading id="otp_heading">
                Please enter the 4 digit OTP sent to your<br />
                registered mobile number
              </s.OtpHeading>
              <s.OtpWrapper>
                <s.OtpNumber {...otpFirstProps} {...commonOtpProps} />
                <s.OtpNumber {...otpSecondProps} {...commonOtpProps} />
                <s.OtpNumber {...otpThirdProps} {...commonOtpProps} />
                <s.OtpNumber {...otpFourthProps} {...commonOtpProps} />
              </s.OtpWrapper>
              <ErrorText {...errorTextProps} />
              <s.OtpNote>
                {showResend && `If you do not receive the OTP in ${time.s} second `}
                {(showResend && time.s === 0 && <s.EditLink onClick={e => this.resendOTP()}>Resend OTP</s.EditLink>) ||
                  (showResend && time.s !== 0 && <span>Resend OTP</span>)}
              </s.OtpNote>
              <HiddenValues {...hiddenValuesProps} />
            </s.OtpVerification>
            <TotalPayable {...totalPayableNewProps} />
          </s.CartContent>
        )) || (
          <s.LoaderWrapper>
            <SvgLoader isVisible isBigLoader />
          </s.LoaderWrapper>
        )}
      </form>
    );
  }
}
OtpVerificationForm.defaultProps = {
  formFields: {},
};
OtpVerificationForm.propTypes = {
  ...PropTypes.otpHiddenProps,
  totalPayableProps: PropTypes.shape(PropTypes.cartTotalPayable).isRequired,
  otpGenerationData: PropTypes.shape(PropTypes.cartOtpGenerationData).isRequired,
  otpVerificationData: PropTypes.shape(PropTypes.cartOtpVerificationData).isRequired,
  paymentActionHandler: PropTypes.func.isRequired,
  otpPage: PropTypes.string.isRequired,
  cartSubmitProps: PropTypes.shape(PropTypes.cartSubmitProps).isRequired,
  verifiedMobile: PropTypes.shape(PropTypes.cartVerifiedMobile).isRequired,
};
export default OtpVerificationForm;
