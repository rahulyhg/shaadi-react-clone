import api from '../../../api';

export default (profileid, { getState }) => {
  const { metadata, session } = getState();

  api.post('/profile/mark-profile-viewed', {
    memberlogin: session.uid,
    uid: profileid,
    isSameGender: false,
    markViewed: 'true',
    contact_status: 'not_contacted',
    ...metadata,
  });
};
