import createAlertReducer from './createAlertReducer';
import createSubNavReducer from './createSubNavReducer';
import createWidgetReducer from './createWidgetReducer';
import identifyCommunity from './identifyCommunity';
import identifySearchType from './identifySearchType';
import isMenuActive from './isMenuActive';

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));
const decode64 = str => {
  try {
    return decodeURIComponent(escape(window.atob(str)));
  } catch (err) {
    console.log('Error in decode64.  Failed for:', str);
    return '';
  }
};

const ucword = str => {
  const newstr = str.toLowerCase();
  return newstr.replace(/(^([a-zA-Z]))|([ -][a-zA-Z])/g, s => s.toUpperCase());
};
const strnorm = (str, n = 0) => (!str || str === 'null' || str === 'undefined' || `${str}`.length <= n ? null : `${str}`);

export {
  createAlertReducer,
  createSubNavReducer,
  createWidgetReducer,
  identifyCommunity,
  identifySearchType,
  encode64,
  decode64,
  isMenuActive,
  ucword,
  strnorm,
};
