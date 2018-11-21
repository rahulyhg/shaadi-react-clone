import PropTypes from 'prop-types';
import React from 'react';
import s from '../../styles';
import ErrorText from '../../ErrorText';

const CardHolderName = props => {
  const holderNameErrorTextProps = {
    id: 'cardholder_error',
    name: 'cardHolderName',
    show: !!(props.formErrors.cardHolderName === false),
  };
  return (
    <s.InputWrapper>
      <s.BankHeading>Cardholder Name</s.BankHeading>
      <s.FormInput id={`iframe_name_on_card`} className="name_on_card_div" isCardHolder {...props} />
      <ErrorText {...holderNameErrorTextProps} />
    </s.InputWrapper>
  );
};
CardHolderName.propTypes = {
  ...PropTypes.jusPayCreditCardCommon,
};
export default CardHolderName;
