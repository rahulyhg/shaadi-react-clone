/* eslint camelcase: 0 */
/* eslint no-unused-vars: ["error", { "argsIgnorePattern":  "^_" }] */
import { httpResponse, createCookie, uidFromAccessToken, currentDomain } from '../helpers';
import server from '../server';
import ww4 from '../ww4';

const notFound = (logger, _method, _path) => {
  logger.info('(response)', 404);
  return Promise.reject(httpResponse(404, { code: 'E_404', message: 'No such service.' }));
};

const login = (logger, { appKey, platform, referer, accessToken, autologinToken, authHistoryToken }) => {
  const uid = uidFromAccessToken(accessToken);
  const auth = {
    uid,
    accessToken,
    autologinToken,
    authHistoryToken,
    appKey,
    platform,
    referer,
    domain: currentDomain(),
    nextAction: undefined,
  };
  return Promise.resolve(auth);
};

const noAuthResponse = httpResponse(401, {
  code: 'E_NO_AUTH',
  message: 'Please login to continue.',
});

const fatalResponse = httpResponse(500, {
  message: 'E_AP502: Please contact tech support.',
});

const tokenLogin = (logger, { autologinToken, authHistoryToken, appKey, platform, referer }) =>
  new Promise((resolve, reject) => {
    if (!autologinToken) {
      logger.info('>>>>> 401 because no login tokens were found.');
      return reject(noAuthResponse);
    }

    logger.info('>>>>> ltabc login attempt.');
    const request = {
      method: 'post',
      url: '/users/login',
      data: ww4.autologin(autologinToken).body,
      headers: {
        'X-App-Key': appKey,
        'X-Platform': platform,
      },
    };

    return server(request)
      .then(response => {
        const data = response.data.data || {};
        const { access_token, domain, next_action } = data;
        if (access_token && next_action === 'PROFILE_ACTIVE') {
          createCookie('abc', access_token, 40 * 60);
          const auth = {
            uid: uidFromAccessToken(access_token),
            accessToken: access_token,
            autologinToken,
            authHistoryToken,
            appKey,
            platform,
            referer,
            domain,
            nextAction: next_action,
          };
          logger.info('>>>>> ltabc login successful.');
          window.location.reload(false);
          console.log('Suppressing auth', auth);
          // return resolve(auth);
        }
        logger.info(`>>>>> ltabc login failure. Got ${response.status} from server.`, response.data);
        return Promise.reject(noAuthResponse);
      })
      .catch(error => {
        if ((error && error.response) || error.code) {
          logger.info(`>>>>> ltabc login failure. Got ${error.response.status} from server.`, error.response.data);
          return Promise.reject(noAuthResponse);
        }
        Promise.reject(error);
        return Promise.reject(fatalResponse);
      });
  });

const linkLogin = (logger, { ml, se, authHistoryToken, appKey, platform, referer }) => {
  logger.info('>>>>> TO DO implement login', ml, se, authHistoryToken, appKey, platform, referer);
  return Promise.reject(noAuthResponse);
};

const authenticate = (logger, params = {}, headers = {}) => {
  const { ml, se } = params;
  const { appKey, platform, authHistoryToken, accessToken, autologinToken, referer } = headers;
  if (ml || se) {
    return linkLogin(logger, { ml, se, authHistoryToken, appKey, platform, referer });
  }
  if (accessToken && accessToken.length >= 10) {
    return login(logger, {
      accessToken,
      autologinToken,
      authHistoryToken,
      appKey,
      platform,
      referer,
    });
  }
  if (autologinToken && autologinToken.length > 5) {
    tokenLogin(logger, {
      accessToken,
      autologinToken,
      authHistoryToken,
      appKey,
      platform,
      referer,
    });
  }
  return Promise.reject(noAuthResponse);
};

export default {
  notFound,
  authenticate,
};
