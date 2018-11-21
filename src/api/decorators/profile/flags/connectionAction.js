export default (account, connect, otherUid, other = {}, extra = {}) => {
  if (other && other.hidden_reason) {
    return 'profile_hidden_deactivated';
  }

  if (connect && connect.connect_status) {
    return connect.connect_status;
  }

  // if (account && connect && otherUid) {
  //  return null;
  // }
  return null;
};
