export default relationshipActions => {
  const { instant_contact } = relationshipActions || {}; // eslint-disable-line
  const { show_post_on_wall } = instant_contact || false; // eslint-disable-line
  return show_post_on_wall === true; // eslint-disable-line
};
