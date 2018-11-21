/* eslint camelcase: 0 */
import { parse } from 'qs';
import alerts from '../lib/alerts';
import { profile as tProfile } from '../lib/content';

export default (uid, dispatch, getState, location) => {
  if (!uid || uid.length === 0 || uid === 'default') {
    return;
  }
  const { set_profiles_back } = parse(location.search.slice(1));
  const alertMessage = tProfile.premiumMatchmailToast;

  if (set_profiles_back === 'premium_partnermatches') {
    alerts.show(dispatch, ['profile', 'topToast', 'isFreeToast'], alertMessage, 0);
  } else {
    alerts.hide(dispatch, ['profile', ['topToast']]);
  }
};
