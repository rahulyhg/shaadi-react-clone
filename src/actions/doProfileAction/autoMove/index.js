/* eslint camelcase: 0 */
import { nextProfileUrl, gotoNextProfile } from '../utils';

export default (uid, args, params) => {
  const { source, dispatch, getState, history } = params;
  console.log('%c autoMove', 'color: brown; font-size: 20px', uid);

  if (uid !== getState().profilePage.item.uid) {
    console.log('%c autoMove cancelled', 'color: red; font-size: 20px', uid, getState().profilePage.item.uid);
    return null;
  }

  const payload = {
    nextUrl:
      (source === 'daily-recommendations'
        ? getState().dailyRecommendationPage.pagination.nextUrl
        : getState().profilePage.pagination.nextUrl) || null,
  };
  const nextUrl = nextProfileUrl(history, source, payload);
  if (nextUrl) gotoNextProfile({ history, dispatch, nextUrl, getState });

  return null;
};
