const paymentFormURL = 'https://pay.shaadi.com/placeorder';
const monthArr = (start, end) => [...Array(1 + end - start).keys()].map(v => `${(start + v < 10 && `0`) + (start + v)}`);
const yearArr = (last, current) =>
  Array(last - current + 1)
    .fill()
    .map((_, idx) => current + idx);

const getExtras = (isExtraChecked, extra) => (isExtraChecked && Number(extra)) || 0;

const getApproxCurrencyValue = (amount, isShaadiCareChecked, isProfileBoosterChecked, shaadiCare, spotlight) =>
  Number(amount) + getExtras(isShaadiCareChecked, shaadiCare) + getExtras(isProfileBoosterChecked, spotlight);

const luhnAlgorithm = value => {
  let nCheck = 0;
  let cDigit = 0;
  let nDigit = 0;
  let bEven = false;
  const valueReplaced = value.replace(/\D/g, '');

  for (let n = valueReplaced.length - 1; n >= 0; n -= 1) {
    cDigit = valueReplaced.charAt(n);
    nDigit = parseInt(cDigit, 10);

    if (bEven) {
      nDigit *= 2;
      const nDigitMultipledBy2 = nDigit;
      if (nDigitMultipledBy2 > 9) {
        nDigit -= 9;
      }
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
};

const doorStepAndAtBankValidation = (isCurrentTab, formfield, formErrors, fieldName, value) => {
  switch (fieldName) {
    case 'cust_city': {
      formErrors.city = !!value;
      formfield.city = value;
      break;
    }
    case 'cust_name': {
      formErrors.contactPersonName = !!value;
      formfield.contactPersonName = value;
      break;
    }
    case 'cust_phone': {
      const personPhoneNo = value.replace(/\s/g, '');
      if (!/[^0-9-+ ]+/.test(personPhoneNo) && personPhoneNo.length <= 15) {
        formErrors.personPhoneNo = true;
        if (isCurrentTab) {
          formfield.personPhoneNo = value;
        } else {
          formfield.personPhoneNo = personPhoneNo;
        }
      }
      if (personPhoneNo.length < 1) {
        formErrors.personPhoneNo = false;
      }
      break;
    }
    case 'cust_address1': {
      formErrors.address = !!value;
      formfield.address = value;
      break;
    }
    default: {
      break;
    }
  }
  return { formfield, formErrors };
};

const shaadiAndUaeCentreValidation = (isCurrentTab, formfield, formErrors, fieldName, value) => {
  switch (fieldName) {
    case 'shaadiCenterCity':
    case 'uaeCity': {
      formErrors.city = !!value;
      formErrors.centre = '';
      if (isCurrentTab) {
        formfield.shaadiCentre = '';
      } else {
        formfield.uaeCentre = '';
      }
      formfield.city = value;
      break;
    }
    case 'centreadd': {
      formErrors.centre = !!value;
      if (isCurrentTab) {
        formfield.shaadiCentre = value;
      } else {
        formfield.uaeCentre = value;
      }
      break;
    }
    default: {
      break;
    }
  }
  return { formfield, formErrors };
};

const ccAndDcJusPayFormValidation = (formErrors, fieldName, value) => {
  switch (fieldName) {
    case 'cardNum': {
      formErrors.cardNum = formErrors.cardNum ? true : !!value;
      break;
    }
    case 'cardMonth': {
      formErrors.cardMonth = formErrors.cardMonth ? true : !!value;
      break;
    }
    case 'cardYear': {
      formErrors.cardYear = formErrors.cardYear ? true : !!value;
      break;
    }
    case 'cvv': {
      formErrors.cvv = formErrors.cvv ? true : !!value;
      break;
    }
    case 'cardHolderName': {
      formErrors.cardHolderName = formErrors.cardHolderName ? true : !!value;
      break;
    }
    default: {
      break;
    }
  }
  formErrors.trySubmit = true;
  return { formErrors };
};

const displayCardImages = {
  MASTERCARD: 'master_card',
  VISA: 'visa_card',
  MAESTRO: 'maestro_card',
};

const cardNumberHandler = (formErrors, emptyStatus, validityStatus, eventHandler) => {
  let cardImage = '';
  if (emptyStatus) {
    formErrors.cardNum = validityStatus ? !(eventHandler.card_brand === 'AMEX') : '';
    const cardImageParam = displayCardImages[eventHandler.card_brand] || '';
    if (cardImageParam === 'maestro_card') {
      formErrors.cardMonth = true;
      formErrors.cardYear = true;
      formErrors.cvv = true;
    }
    cardImage = cardImageParam;
  } else {
    formErrors.cardNum = formErrors.cardNum === false ? false : '';
    cardImage = '';
  }
  return { formErrors, cardImage };
};

const jusPayEventHandler = (eventHandler, formErrorsVal, cardImageName, brand) => {
  let cardBrand = brand;
  let cardImage = cardImageName;
  let formErrors = formErrorsVal;
  const fieldName = eventHandler.target_element;
  const submitStatus = formErrors.trySubmit === true ? false : '';
  const emptyStatus = eventHandler.empty === false;
  const validityStatus = !!(fieldName === 'card_exp_year' || fieldName === 'card_exp_month'
    ? eventHandler.expiry_valid
    : eventHandler.valid);
  const fieldStatus = validityStatus ? true : submitStatus;
  switch (fieldName) {
    case 'card_number': {
      const cardDetails = cardNumberHandler(formErrors, emptyStatus, validityStatus, eventHandler);
      formErrors = cardDetails.formErrors;
      cardImage = cardDetails.cardImage;
      cardBrand = eventHandler.card_brand || '';
      break;
    }
    case 'card_exp_month':
    case 'card_exp_year': {
      formErrors.cardMonth = fieldStatus;
      formErrors.cardYear = fieldStatus;
      break;
    }
    case 'security_code': {
      formErrors.cvv = fieldStatus;
      break;
    }
    case 'name_on_card': {
      formErrors.cardHolderName = fieldStatus;
      break;
    }
    default: {
      break;
    }
  }
  return { formErrors, cardImage, cardBrand };
};
const orderIdGeneration = (totalPayableProps, cartSubmitProps, paymentActionHandler) => {
  const { isShaadiCareChecked, isProfileBoosterChecked } = totalPayableProps;
  const { cartId, mopId, mopName, accessToken } = cartSubmitProps;
  paymentActionHandler('getOrderIdApi', isShaadiCareChecked, isProfileBoosterChecked, cartId, mopId, mopName, accessToken);
};

const featuredJusPayBank = {
  NB_HDFC: 'HDFC Bank',
  NB_ICICI: 'ICICI Bank',
  NB_AXIS: 'Axis Bank',
  NB_PNB: 'Punjab National Bank',
  NB_IDBI: 'IDBI Bank',
  NB_SBI: 'State Bank of India',
};
const netBankingDropDownProps = {
  type: 'medium',
  name: 'bank_code',
  id: 'bank_code',
  list: '',
  defaultText: 'Select Bank',
  onChange: '',
  value: '',
  formErrors: '',
  label: 'Top Banks',
  listKey: 'bank_code',
  listValue: 'bank_code',
  listDisplay: 'bank_name',
  otherList: '',
  otherLabel: 'All Banks',
  refValue: '',
  className: 'payment_method',
};
const netBankingFormValidation = (formErrors, fieldValue, bankCodeRef) => {
  let isFormSubmit = '';
  formErrors.bankName = !!fieldValue;
  const selectedBank = bankCodeRef.current.options[bankCodeRef.current.selectedIndex].text;
  const bankName = fieldValue;
  const validateField = { bankName };
  const validateFormActive = Object.keys(validateField).map(field => validateField[field]);
  if (!validateFormActive.includes('') && !validateFormActive.includes(false)) {
    isFormSubmit = true;
  } else {
    isFormSubmit = false;
  }
  return { formErrors, selectedBank, bankName, isFormSubmit };
};
export {
  paymentFormURL,
  getApproxCurrencyValue,
  monthArr,
  yearArr,
  luhnAlgorithm,
  doorStepAndAtBankValidation,
  shaadiAndUaeCentreValidation,
  ccAndDcJusPayFormValidation,
  jusPayEventHandler,
  featuredJusPayBank,
  orderIdGeneration,
  netBankingDropDownProps,
  netBankingFormValidation,
};
