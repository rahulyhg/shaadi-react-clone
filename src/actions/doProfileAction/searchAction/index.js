/* eslint camelcase: 0 */
import { goProfileUrl, gotoNextProfile } from '../utils';

export default (uid, args, params) => {
  console.log('%c searchAction', 'color: red; font-size: 40px', uid, args, params);
  const { dispatch, history, getState } = params;
  const profileUrl = goProfileUrl({ uid });
  gotoNextProfile({ history, dispatch, profileUrl, getState });
  return null;
};
