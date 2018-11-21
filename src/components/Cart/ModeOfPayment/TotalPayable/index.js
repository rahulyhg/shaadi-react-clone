import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import DisplayAmount from '../../../Common/DisplayAmount';
import SvgLoader from '../../../Common/SvgLoader';
import { getApproxCurrencyValue } from '../../utils';

const TotalPayable = ({
  amount,
  currency,
  placeOrder,
  isVisibleLoader,
  approxCurrency,
  isSymbolCodeCurrency,
  buttonText,
  approxAmount,
  isShaadiCareChecked,
  isProfileBoosterChecked,
  shaadiCare,
  spotlight,
  isTextVisible,
  isCallAssistant,
  isPayAtDoor,
  isPosCenter,
  buttonRef,
  buttonId,
}) => {
  const totalApproxAmount = getApproxCurrencyValue(approxAmount, isShaadiCareChecked, isProfileBoosterChecked, shaadiCare, spotlight);
  return (
    <s.TotalWrapper isPosCenter={isPosCenter}>
      <s.PayNowBtn
        innerRef={buttonRef}
        disabled={isVisibleLoader}
        onClick={placeOrder}
        name="pay"
        id={buttonId || 'PayNowBtn'}
        isPosCenter={isPosCenter}
      >
        {!isVisibleLoader && buttonText}
        {isVisibleLoader && <SvgLoader isVisible isPaymentLoader isPremiumCarousel />}
      </s.PayNowBtn>
      <s.TotalPayable isPosCenter={isPosCenter}>
        *Total Payable:&nbsp;
        {!isSymbolCodeCurrency &&
          approxCurrency && <DisplayAmount amount={totalApproxAmount} currency={approxCurrency} fractionAllowed={2} />}
        {!isSymbolCodeCurrency && approxCurrency && ' (Approx. '}
        <DisplayAmount amount={amount} currency={currency} />
        {!isSymbolCodeCurrency && approxCurrency && ')'}
      </s.TotalPayable>
      {(isTextVisible || isCallAssistant || isPayAtDoor) && (
        <s.NoteContainer>
          {isTextVisible && `We will take you to your bank where you can make payment and get your membership activated instantly.`}
          {isCallAssistant && `Call 1-860-200-3456 for assistance.`}
          {isPayAtDoor &&
            `We will contact you within 2 days between 10:00 AM to 6:00 PM to schedule a pick up. Your order will be activated within 48 hours of Cheque/ DD clearance.`}
        </s.NoteContainer>
      )}
      <s.SecureIcon />
    </s.TotalWrapper>
  );
};
TotalPayable.defaultProps = {
  isSymbolCodeCurrency: false,
  currency: '',
  amount: 0,
  approxCurrency: '',
  buttonText: '',
  isVisibleLoader: false,
  approxAmount: 0,
  isShaadiCareChecked: false,
  isProfileBoosterChecked: false,
  shaadiCare: 0,
  spotlight: 0,
  isTextVisible: false,
  isCallAssistant: false,
  isPayAtDoor: false,
  isPosCenter: false,
  buttonRef: {
    current: {},
  },
  buttonId: '',
};

TotalPayable.propTypes = {
  isSymbolCodeCurrency: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  approxCurrency: PropTypes.string.isRequired,
  placeOrder: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  isVisibleLoader: PropTypes.bool.isRequired,
  approxAmount: PropTypes.number.isRequired,
  isShaadiCareChecked: PropTypes.bool.isRequired,
  isProfileBoosterChecked: PropTypes.bool.isRequired,
  shaadiCare: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  spotlight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isTextVisible: PropTypes.bool,
  isCallAssistant: PropTypes.bool,
  isPayAtDoor: PropTypes.bool,
  isPosCenter: PropTypes.bool,
  buttonRef: PropTypes.shape({
    current: PropTypes.object,
  }).isRequired,
  buttonId: PropTypes.string,
};

export default TotalPayable;
