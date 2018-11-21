import cookie from 'cookie';
import { parse } from 'qs';
import apiGetPhoneSetting from './apiGetPhoneSetting';
import apiPostPhoneSetting from './apiPostPhoneSetting';
import types from '../../../action_types';

export default (uid, args, params) => (dispatch, getState) => {
  const { type } = params;
  const cookies = cookie.parse(document.cookie);
  const isPhoneSettingShown = cookies.isPhoneSettingShown || false;
  const { wwwBaseUrl } = getState().config.app;
  const decode64 = obj => decodeURIComponent(escape(window.atob(obj)));
  const queryParams = args.history.search && parse(args.history.search.slice(1));
  const memberPlanParam = queryParams && queryParams.p ? decode64(queryParams.p) : false;
  const isNative = (queryParams && queryParams.nexturl === 'fake_url') || false;
  const memberPlanArray = { p: 'Platinum Plus Member', d: 'Diamond Plus Member' };
  let memberShip = '';
  if (memberPlanParam && ['p', 'd'].includes(memberPlanParam)) {
    memberShip = memberPlanArray[memberPlanParam];
  }
  if (isPhoneSettingShown) {
    dispatch({ type: types.PHONE_SETTING_DATA_REQUEST, payload: {} });
    window.location.href = isNative ? 'http://native_app_fake_url' : `${wwwBaseUrl}/my-shaadi`;
  } else {
    switch (type) {
      case 'getPhoneSetting':
        apiGetPhoneSetting({ ...params, memberShip, isNative })(dispatch, getState);
        break;
      case 'postPhoneSetting':
        apiPostPhoneSetting(params)(dispatch, getState);
        break;
      default:
        console.log('%c TO DO in doPrivacySettings-photo setting', 'font-size: 16px; color: blue;', params);
    }
  }
};
