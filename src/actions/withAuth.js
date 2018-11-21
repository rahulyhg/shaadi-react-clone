import { stringify } from 'qs';
import cookie from 'cookie';
import api from '../api';
import types from '../action_types';
import localCache from '../localCache';
import errors from './lib/errors';

import getModulePageName from '../reducers/session/getModulePageName';

let singleton;
let key;
let historySingleton;

export default (fn, options = {}) => {
  const { dispatch, getState, params, force, allowCache, history } = options;
  let authData;
  if (key) {
    authData = localCache.read(key);
  }
  if (force) {
    singleton = undefined;
  }

  historySingleton = history || historySingleton;

  if (!singleton) {
    if (!dispatch || !getState || !params) {
      console.log('%c You need to pass more options to withAuth when calling for the first time.', 'color: red; font-weight: bold;');
    }
    const { app } = getState().config;
    api.defaults.headers.common['X-App-Key'] = app.appKey;
    api.defaults.headers.common['X-Platform'] = app.platform;
    api.defaults.headers.common['X-Access-Token'] = app.accessToken;
    api.defaults.headers.common['X-Autologin-Token'] = app.autologinToken;
    api.defaults.headers.common['X-AuthHistory-Token'] = app.authHistoryToken;
    if (app.accessToken && app.accessToken.length > 8) {
      key = `${app.accessToken.split('|')[1]}--${app.accessToken.split('|')[0].substr(0, 10)}`;
      authData = localCache.read(key);
    }

    if (authData) {
      dispatch({ type: types.AUTH_CACHE, payload: authData });
    }

    dispatch({ type: types.AUTH_REQUEST, payload: {} });

    singleton = api.get('/auth/me', {
      params: {
        ml: params.ml,
        se: params.se,
      },
    });

    singleton
      .then(response => {
        const { auth } = response.data;
        key = `${auth.accessToken.split('|')[1]}--${auth.accessToken.split('|')[0].substr(0, 10)}`;
        localCache.write(key, response.data, 1800);
        api.defaults.headers.common['X-App-Key'] = auth.appKey;
        api.defaults.headers.common['X-Platform'] = auth.platform;
        api.defaults.headers.common['X-Access-Token'] = auth.accessToken;
        api.defaults.headers.common['X-Autologin-Token'] = auth.autologinToken;
        api.defaults.headers.common['X-AuthHistory-Token'] = auth.authHistoryToken;
        dispatch({ type: types.AUTH_SUCCESS, payload: response.data });
      })
      .catch(error => {
        const { wwwBaseUrl } = getState().config.app;
        if (['/cart', '/payment', '/payment/thankyou', '/compare-plans'].includes(window.location.pathname)) {
          window.location.href = `${wwwBaseUrl}/registration/user/login?${stringify({ go: window.location.href })}`;
        }
        dispatch({ type: types.AUTH_FAIL, payload: errors.clean(error) });
        dispatch({ type: types.UNAUTH, payload: {} });
      });
  }

  const promise = allowCache && key && authData ? Promise.resolve({ data: authData, status: 200 }) : singleton;

  const target = data => {
    const cookies = cookie.parse(document.cookie);
    let abc = cookies.abc;

    if (getModulePageName().isProfileCreationPage) {
      abc = cookies.reg_logger;
    }

    if (abc === '' || abc === 'SatyaNet') {
      localCache.clear();
      window.location.reload();
      return false;
    }
    if (!options.delay) {
      return fn(data, historySingleton);
    }
    return setTimeout(() => fn(data, historySingleton), options.delay);
  };

  promise.then(response => target(response.data)).catch(error => {
    if (!(error && error.response)) {
      return Promise.reject(error);
    }
    console.log(
      `%c Execution of ${options.caller || 'this action'} halted because of unauth.`,
      'color: orange; font-weight: bold;',
      error.response,
    );
    return Promise.resolve(error);
  });
};
