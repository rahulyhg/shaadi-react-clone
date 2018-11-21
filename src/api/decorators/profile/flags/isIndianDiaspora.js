export default payload => {
  const indianishCountries = ['India', 'Afghanistan', 'Bangladesh', 'Bhutan', 'Maldives', 'Nepal', 'Pakistan', 'Sri Lanka'];
  const { origin, profileBrief } = payload;
  const { location = { country: profileBrief ? profileBrief.country : null } } = payload;

  if (!location && !origin) {
    return null;
  }
  if (location && indianishCountries.includes(location.country)) {
    return true;
  }
  if (origin && origin.grewup_in && origin.grewup_in.some(c => indianishCountries.includes(c))) {
    return true;
  }
  return false;
};
