export default form => ({
  trait: {
    about_me: form.description.value,
  },
  health_info: {
    special_cases: form.disability.checked ? 'None' : 'Physical Disability',
  },
  'contact-details': {
    mobile_isd: form.countryCode.value,
    mobile_country: form.countryCode.country,
    mobile: form.mobileNumber.value,
  },
});
