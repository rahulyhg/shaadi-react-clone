import cookie from 'cookie';

const currentDomainName = () => {
  const temp = window.location.hostname
    .split(':')[0]
    .split('.')
    .reverse();
  return `.${temp[1]}.${temp[0]}`;
};

const myDomain = currentDomainName();

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

const getCookie = name => cookie.parse(document.cookie)[name];

const tomorrrow = () => {
  const now = new Date();
  const expire = new Date();
  expire.setFullYear(now.getFullYear());
  expire.setMonth(now.getMonth());
  expire.setDate(now.getDate() + 1);
  expire.setHours(0);
  expire.setMinutes(0);
  expire.setSeconds(0);
  return expire.toString();
};

const n = (context, key) => `sw_${context}_${key}`.slice(0, 18);

const canShow = (context, key) => getCookie(n(context, key)) !== 'Y';

const markShown = (context, key, secs) => createCookie(n(context, key), 'Y', secs || 4 * 3600);

const markShownForToday = (context, key) => createCookie(n(context, key), 'Y', tomorrrow());

export default {
  canShow,
  markShown,
  markShownForToday,
  myDomain,
  createCookie,
};
