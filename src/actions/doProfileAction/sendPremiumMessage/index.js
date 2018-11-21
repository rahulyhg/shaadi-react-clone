/* eslint camelcase: 0 */
import types from '../../../action_types';
import api from '../../../api';
import { profile as tProfile } from '../../lib/content';
import { nextProfileUrl, gotoNextProfile } from '../utils';
import getCurrentFullDateTimestamp from '../../../helpers/getCurrentFullDateTimestamp';

export default (uid, args, params) => {
  const { dispatch, history, source, getState } = params;
  const profile = getState().profiles[uid];

  const payload = {
    connectionStatus: profile.flags.connectionStatus,
    nextUrl: getState().profilePage.pagination.nextUrl || null,
    source: 'profile',
    type: 'accept',
    nextUid: getState().profilePage.pagination.nextUid || null,
  };
  const nextUrl = nextProfileUrl(history, source, payload);
  const currentProfile = nextUrl && `/profile${history.location.search}`;
  const settings = getState().session.settings;
  const accountType = getState().session.accountType;

  const p8 = s => {
    const ts = +new Date();
    const p = `${Math.random().toString(16)}000000000`.substr(2, 8);
    return s === 1 ? `-${p.substr(0, 4)}-${p.substr(4, 4)}` : s === 0 ? p : `-${ts}`;
  };
  const guid = (k1, k2) => {
    const k3 = 'web';
    return (k3 ? `${k3}-` : '') + (k1 ? `${k1}-` : '') + (k2 || '') + p8(1) + p8(2);
  };
  const messageId = guid(params.self, uid);

  const asTime = msecs => {
    const t = new Date(msecs);
    return `${t.getHours() > 12 ? t.getHours() - 12 : t.getHours()}:${t.getMinutes()}${t.getHours() >= 12 ? 'PM' : 'AM'}`;
  };
	const t = (new Date() / 1); // eslint-disable-line prettier/prettier
  const time = asTime(t);

  const data = {
    message_id: messageId,
    message: args[0],
    raw_message: args[0],
    platform: 'web',
    status: 'sent',
    type: 'chat',
    recipient_id: uid,
    client_time: time,
    server_time: getCurrentFullDateTimestamp(),
  };

  api.post('/sendMessage', data).then(response => {
    dispatch({ type: types.MODAL_HIDE });

    const alertMessage = tProfile.accept(
      profile.name,
      profile.himHer,
      currentProfile,
      uid,
      settings.showUpgradeLinks,
      accountType,
      profile.heShe,
    );
    gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
  });
};
