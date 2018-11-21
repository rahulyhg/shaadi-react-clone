/* eslint camelcase: 0 */
import types from '../../../action_types';
import alerts from '../../lib/alerts';
import { search as t } from '../../lib/content';

export default (uid, args, params) => (payload, { error }) => {
  const { source, dispatch, getState } = params;

  let tooltip = error.type === 'formatted' ? t.error({ error }) : t.loudError({ error }, 'Error');

  if (['limit_exceeded', 'Invitation limit exceeded.'].includes(error.message)) {
    const uids = args[0] || [];
    const profile = getState().profiles[uid || uids[0]] || { uid, name: uid, himHer: 'Them', shortlists: { count: 0 } };
    const selfProfile = getState().profiles.self || {};
    let justNowText = 'Invitation limit exceeded';
    if (!selfProfile.flags || selfProfile.flags.isPremium === false) {
      tooltip = t.connectLimitExceed();
    } else {
      tooltip = t.connectLimitExceedPremium();
      justNowText +=
        '! Under our fair usage policy, you cannot send more than 200 Premium Invitations in a day. You can continue to Search and browse Profiles.';
    }
    dispatch({
      type: types.EOI_FAIL,
      payload: { ...payload, modal: 'inviteDailyLimit', justNowText, justNowIcon: 'invite_limit_exceed' },
    });
    if (!selfProfile.flags || selfProfile.flags.isPremium === false) {
      dispatch({ type: types.MODAL_SHOW, payload: { modal: 'inviteDailyLimit', uid, source, name: profile.name } });
    }
  } else if (error.message === 'Your profile is currently hidden.') {
    tooltip = t.hiddenProfile();
    dispatch({ type: types.EOI_FAIL, payload });
  } else {
    dispatch({ type: types.EOI_FAIL, payload });
  }
  if (source !== 'profile') {
    alerts.show(dispatch, [source, 'eoi', { uid }], tooltip, 10);
  }
  return null;
};
