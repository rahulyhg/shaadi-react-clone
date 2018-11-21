export default connect => {
  if (connect) {
    return !!connect.deleted_by_to;
  }
  return null;
};
