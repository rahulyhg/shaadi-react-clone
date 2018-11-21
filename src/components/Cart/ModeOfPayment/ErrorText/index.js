import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';

const errorMsg = {
  city: 'Please select valid City.',
  uaeCenter: 'Please select nearest UAE Exchange Branch to confirm the order.',
  cardNum: 'Please enter a valid Card number.',
  cardNumAmex: 'This card is not supported.',
  cardMonth: 'Please select valid expiry date.',
  cardYear: 'Please select valid expiry date.',
  cvv: 'Please enter a valid CVV number.',
  cardHolderName: 'Please enter the name of card holder.',
  bankName: 'Please select prefered Bank.',
  otp: 'The OTP you have entered is incorrect.',
  contactPersonName: 'Please enter a valid Name.',
  personPhoneNo: 'Please enter a valid Phone number.',
  address: 'Please enter a valid Address.',
  shaadiCenter: 'Please select nearest shaadi centre to confirm the order.',
};
const ErrorText = props => {
  const { id = '', show, name, isPosCenter } = props;
  return (
    <s.ErrorTextContainer id={id}>
      <s.ErrorText isPosCenter={isPosCenter}>{show && errorMsg[name]}</s.ErrorText>
    </s.ErrorTextContainer>
  );
};
ErrorText.defaultProps = {
  id: '',
  isPosCenter: false,
  name: '',
  show: false,
};
ErrorText.propTypes = {
  id: PropTypes.string.isRequired,
  isPosCenter: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default ErrorText;
