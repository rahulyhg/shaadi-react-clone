import types from '../../../action_types';
import apiGetDefaultDraft from '../apiGetDefaultDraft';

const defaultTypes = {
  connect: 'send',
  bulkConnect: 'send',
  accept: 'accepted',
  remind: 'send_reminder',
};

export default (uid, args, params) => {
  const { source, type, dispatch, getState } = params;
  const settings = getState().session.settings;
  const uids = args[0] || [];
  const profile = getState().profiles[uid || uids[0]] || { uid, name: uid, himHer: 'Them', shortlists: { count: 0 } };
  const messagesHash = {
    remind: 'Send a reminder with an Email',
    accept: `Chat with ${profile.name}`,
  };

  const isReply = args.length > 0 && !['similar_profile', 'my-shaadi'].includes(source);

  const title = isReply ? 'Send an Email to these Members' : messagesHash[type] || `Write to ${profile.name}`;
  const message = '';
  let payload = {
    modal: 'sendRequest',
    title,
    type,
    name: profile.name,
    heShe: profile.heShe,
    hisHer: profile.hisHer,
    himHer: profile.himHer,
    showMessageLayer: (params.showMessageLayer && params.showMessageLayer) || false,
    message,
    uid,
    source,
    settings,
    disabled: true,
    filtered: profile.flags.isFiltered,
  };
  if (isReply) {
    payload = {
      modal: 'sendRequest',
      title,
      type,
      name: profile.name,
      heShe: profile.heShe,
      hisHer: profile.hisHer,
      himHer: profile.himHer,
      message,
      uids,
      source,
      settings,
      disabled: true,
    };
  }
  if (type === 'accept') {
    payload = {
      modal: 'acceptPremium',
      name: profile.name,
      himHer: profile.himHer,
      hisHer: profile.hisHer,
      profilePhoto: source === 'inbox' || source === 'featured' ? profile.photoMedium : profile.photo,
      type,
      source,
      uid,
      presence: profile.presence,
      disabled: true,
      message,
    };
  }
  dispatch({
    type: types.MODAL_SHOW,
    payload,
  });

  apiGetDefaultDraft(defaultTypes[type] || type, uid, params);

  return null;
};
