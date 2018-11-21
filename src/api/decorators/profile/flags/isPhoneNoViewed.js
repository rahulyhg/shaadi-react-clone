export default relationshipActions => {
  const { instant_contact } = relationshipActions || {}; // eslint-disable-line
  const {isPhoneNoViewed} = instant_contact || false; // eslint-disable-line
  return isPhoneNoViewed === true;
};
