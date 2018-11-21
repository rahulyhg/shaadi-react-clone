import getProfileOptions from './getProfileOptions';

export default (uid, profileids, options, extras) => ({
  method: 'get',
  url: `/profiles/${uid}`,
  params: {
    profileids: profileids instanceof Array ? profileids.join(',') : String(profileids),
    options: getProfileOptions({ profileFieldSet: ['basic'] }, extras),
  },
});
