import withAuth from '../withAuth';
import phoneSettings from './phoneSettings';

export default (source, uid, type, args) => (dispatch, getState) => {
  withAuth(({ auth }, history) => {
    const params = { source, self: auth.uid, type, args };
    console.log(`%c phone settings action: ${type}`, 'color: blue; font-size: 24px;', { source, uid, type }, args);

    switch (type) {
      case 'getPhoneSetting':
        phoneSettings(uid, args, params)(dispatch, getState);
        break;
      case 'postPhoneSetting':
        phoneSettings(uid, args, params)(dispatch, getState);
        break;
      default:
        console.log('%c TO DO in doPrivacySettingsAction', 'font-size: 16px; color: blue;', params);
    }
  });
};
