import types from '../../action_types';

const initialState = {
  isVerifiedMobile: false,
  mobile: '',
  country: '',
  countryCode: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.VERIFIED_MOBILE_SUCCESS: {
      const { response: { data: { data: contactData } } } = action;
      const {
        details: { mobile, mobile_verified: mobileVerified = 'N', mobile_country: mobileCountry = '', mob_isd: countryCode = '' },
      } = contactData[Object.keys(contactData)[0]];
      return {
        ...state,
        isVerifiedMobile: !!(mobileVerified === 'Y' && mobileCountry === 'India'),
        mobile,
        country: mobileCountry,
        countryCode,
      };
    }
    case types.VERIFIED_MOBILE_REQUEST: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
