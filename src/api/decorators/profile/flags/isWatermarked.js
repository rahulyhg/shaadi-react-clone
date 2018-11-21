export default payload => {
  const { photo_details } = payload;
  // eslint-disable-next-line camelcase
  if (photo_details === undefined) return true;

  switch (photo_details.status) {
    case 'none':
    case 'add_photo':
    case 'photo_request':
      return false;
    default:
      return true;
  }
};
