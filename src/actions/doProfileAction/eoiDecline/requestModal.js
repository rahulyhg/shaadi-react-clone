import types from '../../../action_types';

export default (uid, args, params) => {
  const { source, type, dispatch, getState } = params;
  const profile = getState().profiles[uid] || { uid, name: uid, himHer: 'Them', shortlists: { count: 0 } };
  const settings = getState().session.settings;

  const title = `Write to ${profile.name}`;
  const message = "Hi, I don't think we are the right match for each other. All the best for partner search.";
  const wishToSendMessage = type !== 'decline';
  dispatch({
    type: types.MODAL_SHOW,
    payload: { modal: 'sendDecline', title, message, uid, source, settings, wishToSendMessage, disabled: true },
  });
  return null;
};
