/* eslint camelcase: 0 */
import types from '../../../action_types';
import apiAction from '../apiAction';
import apiGetShortlists from './apiGetShortlists';
import apiCreateShortlist from './apiCreateShortlist';
import alerts from '../../lib/alerts';
import { search as searchContent, profile as profileContent } from '../../lib/content';
import { nextProfileUrl, gotoNextProfile } from '../utils';

export default (uid, args, params) => {
  const { source, self, type, dispatch, getState, history } = params;
  const profile = getState().profiles[uid] || { uid, name: uid, shorlists: { selected: [] } };
  const master = getState().session.shortlists.items;

  switch (type) {
    case 'loadShortlist':
      return apiGetShortlists(uid, params);
    case 'addToShortlist': {
      const data = { list_ids: args[0], prev_list_ids: profile.shortlists.selected };
      const target = data.list_ids.length === 0 ? 'default' : 'shortlisted';
      const tooltip = searchContent.shortlisted(profile.name, data.list_ids, master);
      const justNowText = searchContent.shortlistedJustNow(profile.name, data.list_ids, master)[0];
      const justNowIcon = 'shortlisted';
      const onSuccess = payload => {
        const nextUrl = nextProfileUrl(history, source, payload);
        const currentProfile = nextUrl && `/profile${history.location.search}`;

        dispatch({ type: types.EOI_SUCCESS, payload: { ...payload, justNowText, justNowIcon } });
        if (nextUrl) {
          const alertMessage = profileContent.shortlist(profile.name, profile.himHer, profile.uid, currentProfile);
          gotoNextProfile({ history, dispatch, nextUrl, alertMessage, getState });
        }
        return source !== 'profile' && alerts.show(dispatch, [source, 'eoi', { uid }], tooltip, 10);
      };
      const onFail = (payload, m) => {
        alerts.show(dispatch, [source, 'eoi', { uid }], searchContent.error(m), 8);
        dispatch({ type: types.EOI_FAIL, payload });
      };
      return apiAction(uid, 'shortlisted', target, params, data, onSuccess, onFail);
    }
    case 'createShortlist': {
      const name = args[0];
      return apiCreateShortlist(uid, name, params);
    }
    default:
      console.log('TO DO shortlistAction', type, { source, uid, args, self });
      return null;
  }
};
