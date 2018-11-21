import PropTypes from 'prop-types';
import React from 'react';
import s from '../../styles';
import ErrorText from '../../ErrorText';

const CvvNumber = props => {
  const cvvErrorTextProps = {
    id: 'cvv_error',
    name: 'cvv',
    show: !!(props.formErrors.cvv === false),
  };
  return (
    <s.FlexHeading>
      CVV<br />
      <s.FieldWrapper>
        <s.SmallFormInput id={`iframe_security_code`} className="security_code_div" isMarginTop isCvv {...props} />
        <s.CvvText isMarginTop isMarginLeft>
          3 digit number printed on your back side of card
        </s.CvvText>
      </s.FieldWrapper>
      <ErrorText {...cvvErrorTextProps} />
    </s.FlexHeading>
  );
};
CvvNumber.propTypes = {
  ...PropTypes.jusPayCreditCardCommon,
};
export default CvvNumber;
