/* global window */
import cookie from 'cookie';
import createLogger from './createLogger';
import standardErrors from './standardErrors';
import constants from '../../constants/constants';
import { WorkerModule } from '../../helpers/worker';

const currentDomainName = () => {
  const temp = window.location.hostname
    .split(':')[0]
    .split('.')
    .reverse();
  return `.${temp[1]}.${temp[0]}`;
};

const myDomain = currentDomainName();

const errorFor = ({ code, message }) => ({
  code: code || message,
  message: standardErrors[code] || standardErrors[message] || message,
});

const httpResponse = (status, data) => {
  if (status >= 300 || status < 200) {
    return { response: { status, data } };
  }
  return { status, data, statusText: 'OK' };
};

const authenticationHeaders = headers => {
  const { appKey, platform, accessToken } = headers;
  const cookies = cookie.parse(document.cookie);

  return {
    'X-App-Key': appKey,
    'X-Platform': platform,
    'X-Access-Token': accessToken,
    ...(cookies.slang && { slang: cookies.slang }),
  };
};

const deviceTrackingHeaders = () => ({
  'X-Device-Id': constants.DEVICE.deviceid,
  'X-Device-Platform': constants.DEVICE.platform,
  'X-Device-OS': constants.DEVICE.os,
  'X-Device-Browser-Name': constants.DEVICE.browser.name,
  'X-Device-Browser-Version': constants.DEVICE.browser.version,
});

const uidFromAccessToken = accessToken => (accessToken || '').split('|')[1];

/* eslint default-case: 0, no-prototype-builtins: 0 */
const createCookie = (sKey, sValue, vEnd, sPath = '/', sDomain = myDomain, bSecure = false) => {
  if (!sKey || /^(?:expires|max-age|path|domain|secure)$/.test(sKey)) {
    return;
  }
  let sExpires = '';
  if (vEnd) {
    switch (typeof vEnd) {
      case 'number':
        sExpires = `; max-age=${vEnd}`;
        break;
      case 'string':
        sExpires = `; expires=${vEnd}`;
        break;
      case 'object':
        if (vEnd.hasOwnProperty('toGMTString')) {
          sExpires = `; expires=${vEnd.toGMTString()}`;
        }
        break;
    }
  }
  document.cookie = `${escape(sKey)}=${escape(sValue)}${sExpires}${sDomain ? `; domain=${sDomain}` : ''}${sPath ? `; path=${sPath}` : ''}${
    bSecure ? '; secure' : ''
  }`;
};

const currentDomain = () => {
  const temp = window.location.host.split('.').reverse();
  return `${temp[1]}.${temp[0]}`;
};

// Converts X-Auth-Token to authToken for the controllers to work with.
const headersToVars = heads =>
  Object.keys(heads)
    .map(k => [
      k[2].toLowerCase() +
        k
          .split('-')
          .slice(1)
          .join('')
          .slice(1),
      heads[k],
    ])
    .reduce((obj, arr) => {
      const h = {};
      h[arr[0]] = arr[1] && arr[1].length ? arr[1] : undefined;
      return { ...obj, ...h };
    }, {});

const extractHeaders = arr => arr.reduce((obj, heads) => ({ ...obj, ...headersToVars(heads || {}) }), {});

const getRequestWorker = WorkerModule.singleton({
  sendRequest: options => {
    options.headers['Content-Type'] = 'application/json';
    options.url = `${options.baseUrl}${options.url}`;

    const request = {
      ...options,
      body: JSON.stringify(options.body),
    };

    return fetch(request.url, request).then(d => d.json());
  },
  sendBeacon: options => {
    options.headers = options.headers || {};
    options.url = `${options.baseUrl}${options.url}`;
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';

    const request = {
      ...options,
      body: JSON.stringify(options.body),
    };

    fetch(request.url, request);
    return null;
  },
});

const deleteCookie = name => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${myDomain};path=/`;
  return null;
};

export {
  errorFor,
  createCookie,
  httpResponse,
  authenticationHeaders,
  deviceTrackingHeaders,
  uidFromAccessToken,
  currentDomain,
  extractHeaders,
  createLogger,
  getRequestWorker,
  deleteCookie,
};
