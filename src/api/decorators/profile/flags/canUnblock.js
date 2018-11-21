export default (connect = {}) => {
  if (connect && connect.can_cancel) {
    return connect.can_unblock === 'Y';
  }
  return false;
};
