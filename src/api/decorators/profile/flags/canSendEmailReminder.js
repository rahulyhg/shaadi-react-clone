export default relationshipActions => {
  const { instant_contact } = relationshipActions || {}; // eslint-disable-line
  const { can_send_email_reminder } = instant_contact || false; // eslint-disable-line
  return can_send_email_reminder === true; // eslint-disable-line
};
