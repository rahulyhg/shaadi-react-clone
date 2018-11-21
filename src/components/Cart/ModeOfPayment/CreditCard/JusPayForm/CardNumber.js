import PropTypes from 'prop-types';
import React from 'react';
import s from '../../styles';
import ErrorText from '../../ErrorText';

const CardNumber = props => {
  const cardErrorTextProps = {
    id: 'credit_card_error',
    name: props.cardBrand === 'AMEX' ? 'cardNumAmex' : 'cardNum',
    show: !!(props.formErrors.cardNum === false),
  };
  return (
    <s.InputWrapper>
      <s.BankHeading>Card Number</s.BankHeading>
      <s.FieldWrapper>
        <s.FormInput className={`card_number_div`} id={`iframe_card_number`} isCardImage {...props} />
        <s.AcceptCards>Accepted Cards</s.AcceptCards>
        <s.VisaIcon />
        <s.MasterIcon /> {props.currentTab === 'DebitCard' && props.currency === 'INR' && <s.MaestroIcon />}
      </s.FieldWrapper>
      <ErrorText {...cardErrorTextProps} />
    </s.InputWrapper>
  );
};
CardNumber.propTypes = {
  ...PropTypes.jusPayCreditCardCommon,
  cardImage: PropTypes.string.isRequired,
  currentTab: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  cardBrand: PropTypes.string.isRequired,
};
export default CardNumber;
