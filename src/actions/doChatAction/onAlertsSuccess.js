import { parse } from 'qs';
import types from '../../action_types';
import withAuth from '../withAuth';

const sound = (getState, dispatch) =>
  new Promise((resolve, reject) => {
    if (getState().chat.settings.sound === 'off') {
      return resolve('failed');
    }
    return setTimeout(() => resolve('success'), 500);
  });

const contains = (arr, a) => arr.filter(aa => aa.alertId === a.alertId).length > 0;

const delay = 15;

export default (dispatch, getState, count, alerts, oldAlerts, source) => {
  withAuth(({ auth }, history) => {
    const queryParams = parse(history.location.search.slice(1));
    const getProfileId = queryParams.txtprofileid || String(queryParams.profileid).substr(1);
    if (getProfileId) {
      const viewingProfileAlert = alerts.filter(alert => String((alert.profile && alert.profile.uid) || '').substr(1) === getProfileId);
      if (viewingProfileAlert) {
        const { profile: { uid, photos: photo_details = {} } = {} } = viewingProfileAlert[0] || {};
        const { profiles: { [uid]: { photos: { status: oldPhotoDisplayStatus } = {} } = {} } = {} } = (getState && getState()) || {};
        if (photo_details && oldPhotoDisplayStatus !== photo_details.status) {
          dispatch({
            type: types.GET_OTHER_PROFILE_PHOTOS_SUCCESS,
            payload: { source, uid, data: { photo_details } },
          });
        }
      }
    }
    if (source === 1 && count > 0) {
      dispatch({
        type: types.NOTIFICATIONS_TOAST_SHOW,
        payload: { id: 'count', message: `You have new notifications`, autoHide: true },
      });
      setTimeout(() => dispatch({ type: types.NOTIFICATIONS_TOAST_HIDE, payload: { id: 'count' } }), delay * 1000);
    }
    if (source !== 1) {
      const freshAlerts = alerts.filter(a => a.shortMessage && !a.isRead && !contains(oldAlerts, a));
      if (freshAlerts.length === 0) {
        return;
      }
      const isMobile = getState().view.layout === 'mobile';
      freshAlerts.forEach(a => {
        dispatch({
          type: types.NOTIFICATIONS_TOAST_SHOW,
          payload: { id: a.alertId, message: a.shortMessage, uid: a.profile.uid, name: a.profile.name, autoHide: true },
        });
        setTimeout(() => dispatch({ type: types.NOTIFICATIONS_TOAST_HIDE, payload: { id: a.alertId } }), delay * 1000);
      });
      !isMobile &&
        sound(getState, dispatch).then(() => {
          dispatch({ type: types.BEEP_SOUND_PLAY });
          setTimeout(() => dispatch({ type: types.BEEP_SOUND_STOP }), 1500);
        });
    }
  });
};
