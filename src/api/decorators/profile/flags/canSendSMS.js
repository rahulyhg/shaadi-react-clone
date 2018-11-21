export default relationshipActions => {
  const { instant_contact } = relationshipActions || {}; // eslint-disable-line
  const { can_send_sms } = instant_contact || false; // eslint-disable-line
  return can_send_sms === true; // eslint-disable-line
};
