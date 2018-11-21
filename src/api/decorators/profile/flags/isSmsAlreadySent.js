export default relationshipActions => {
  const { instant_contact } = relationshipActions || {}; // eslint-disable-line
  const {isSmsAlreadySent} = instant_contact || false; // eslint-disable-line
  return isSmsAlreadySent === true;
};
