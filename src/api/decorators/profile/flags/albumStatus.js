export default (payload, privacy = {}) => {
  const { photo_details } = payload;

  let albumStatus = 'noPhoto';
  // eslint-disable-next-line camelcase
  if (photo_details === undefined) {
    return albumStatus;
  }

  switch (photo_details.status) {
    case 'password_request_sent':
      albumStatus = 'passwordRequested';
      break;
    case 'password':
      albumStatus = 'requestPassword';
      break;
    case 'when_i_contact':
      albumStatus = 'visibleOnUpgrade';
      break;
    case 'only_when_i_contact':
      albumStatus = 'visibleOnAccept';
      break;
    case 'show_photo':
      albumStatus = 'default';
      break;
    case 'photo_request_sent':
      albumStatus = 'photoRequestSent';
      break;
    case 'none':
    case 'add_photo':
    case 'photo_request':
      albumStatus = 'noPhoto';
      break;
    case 'coming_soon':
      albumStatus = 'photoComingSoon';
      break;
    case 'member_photo_not_screened':
      albumStatus = 'photoUnderScreening';
      break;
    default:
      console.log('%c New photo status', 'font-size: 20px', privacy.photo, photo_details.status);
      albumStatus = 'default';
      break;
  }

  if (privacy.photo) {
    switch (privacy.photo.toLowerCase()) {
      case 'password':
        if (!['noPhoto', 'photoComingSoon', 'photoUnderScreening'].includes(albumStatus)) albumStatus = 'requestPassword';
        break;
      case 'when_i_contact':
      case 'when i contact':
        albumStatus = 'visibleOnUpgrade';
        break;
      case 'only_when_i_contact':
        albumStatus = 'visibleOnAccept';
        break;
      case 'coming_soon':
      case 'coming soon':
        albumStatus = 'photoComingSoon';
        break;
      default:
        break;
    }
  }

  return albumStatus;
};
