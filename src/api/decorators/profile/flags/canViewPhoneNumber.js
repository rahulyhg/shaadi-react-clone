export default relationshipActions => {
  const { instant_contact } = relationshipActions || {}; // eslint-disable-line
  const { can_view_phone_no } = instant_contact || false; // eslint-disable-line
  return can_view_phone_no === true; // eslint-disable-line
};
