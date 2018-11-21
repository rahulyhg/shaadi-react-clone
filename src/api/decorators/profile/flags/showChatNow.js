export default relationshipActions => {
  const { instant_contact } = relationshipActions || {}; // eslint-disable-line
  const { show_chat_now } = instant_contact || false; // eslint-disable-line
  return show_chat_now === true; // eslint-disable-line
};
