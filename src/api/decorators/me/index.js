import thumbnail from './thumbnail';

const baseValue = {
  uid: '',
  display_name: '',
  gender: '',
  isMobileVerified: false,
  thumbnail: thumbnail(undefined, {}),
  mobileNumber: '',
  mobileCountry: '',
};

export default function(base = baseValue, payload = {}, contactDetails = {}) {
  const { account, basic } = payload;
  const { details } = contactDetails;

  const { memberlogin } = account || {};
  const { display_name, gender } = basic || {};

  return {
    ...base,
    uid: memberlogin,
    display_name,
    gender,
    isMobileVerified: (details && details.mobile_verified && details.mobile_verified === 'Y') || false,
    thumbnail: thumbnail(base.thumbnail, payload),
    mobileNumber: (details && details.mobile) || '',
    mobileCountry: (details && details.mobile_country) || '',
  };
}
