// os, platform from query
import { parse } from 'qs';

const queryParams = parse(window.location.search.slice(1));

const getBrowserVersion = () => {
  try {
    const ua = window.navigator.userAgent;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    let tem;
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return `IE ${tem[1] || ''}`;
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null)
        return tem
          .slice(1)
          .join(' ')
          .replace('OPR', 'Opera');
    }
    M = M[2] ? [M[1], M[2]] : [window.navigator.appName, window.navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M[1];
  } catch (err) {
    return 'unknown';
  }
};

const device = {
  // Firefox 1.0+
  isFirefox: typeof InstallTrigger !== 'undefined',
  // Safari 3.0+ "[object HTMLElementConstructor]"
  isSafari:
    /constructor/i.test(window.HTMLElement) ||
    ((p = {}) => p.toString() === '[object SafariRemoteNotification]')(window.safari && window.safari.pushNotification),
  // Internet Explorer 6-11
  isIE: /* @cc_on!@ */ false || !!document.documentMode,
  // Chrome 1+
  isChrome: !!window.chrome && !!window.chrome.webstore,
  isAndroid: !!window.navigator.userAgent.match(/Android/i),
  isBlackBerry: !!window.navigator.userAgent.match(/BlackBerry/i),
  isIPhone: !!window.navigator.userAgent.match(/iPhone/i),
  isIPod: !!window.navigator.userAgent.match(/iPod/i),
  isIPad: !!window.navigator.userAgent.match(/iPad/i),
  isOpera:
    window.navigator.userAgent.match(/Opera Mini/i) ||
    ((!!window.opr && !!window.opr.addons) || !!window.opera || window.navigator.userAgent.indexOf(' OPR/') >= 0) ||
    false,
  isWindows: !!window.navigator.userAgent.match(/IEMobile|WPDesktop|webOS|Windows Phone/i),
  isUnknownMobile: typeof window.orientation !== 'undefined' || (window.innerWidth <= 800 && window.innerHeight <= 600),
  browser: {
    getBrowserName: () => {
      if (device.isOpera) {
        return 'opera';
      }
      if (device.isFirefox) {
        return 'firefox';
      }
      if (device.isSafari) {
        return 'safari';
      }
      if (device.isIE) {
        return 'ie';
      }
      if (device.isEdge) {
        return 'edge';
      }
      if (device.isChrome) {
        return 'chrome';
      }
      if (device.isBlink) {
        return 'blink';
      }
      return 'unknown';
    },
    isUC: window.navigator.userAgent.indexOf('UCBrowser') > 0,
    isIE: () => {
      // IE 10
      // window.navigator.userAgent = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

      const msie = window.navigator.userAgent.indexOf('MSIE ');
      if (msie > 0) {
        // IE 10 or older => return version number
        this.version = parseInt(window.navigator.userAgent.substring(msie + 5, window.navigator.userAgent.indexOf('.', msie)), 10);
      }

      // IE 11
      // window.navigator.userAgent = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
      const trident = window.navigator.userAgent.indexOf('Trident/');
      if (trident > 0) {
        // IE 11 => return version number
        const rv = window.navigator.userAgent.indexOf('rv:');
        this.version = parseInt(window.navigator.userAgent.substring(rv + 3, window.navigator.userAgent.indexOf('.', rv)), 10);
      }
      return trident + msie > 0;
    },
    isEdge: () => {
      // Edge 12 (Spartan)
      // window.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

      // Edge 13
      // window.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
      const edge = window.navigator.userAgent.indexOf('Edge/');
      if (edge > 0) {
        // Edge (IE 12+) => return version number
        this.version = parseInt(window.navigator.userAgent.substring(edge + 5, window.navigator.userAgent.indexOf('.', edge)), 10);
      }
      return edge > 0;
    },
  },
  getOS: () => {
    device.isWindows10();
    device.isWindows8();
    device.isWindows7();
    device.isWindowsVista();
    device.isWindowsXP();
    device.isWindows2000();
    device.isMacOriOS();
    device.isUNIX();
    device.isLinux();
    return device.os;
  },
  isWindows10: () => {
    if (window.navigator.userAgent.indexOf('Windows NT 10.0') !== -1) {
      device.os = 'Windows 10';
      return true;
    }
    return false;
  },
  isWindows8: () => {
    if (window.navigator.userAgent.indexOf('Windows NT 6.2') !== -1) {
      device.os = 'Windows 8';
      return true;
    }
    return false;
  },
  isWindows7: () => {
    if (window.navigator.userAgent.indexOf('Windows NT 6.1') !== -1) {
      device.os = 'Windows 7';
      return true;
    }
    return false;
  },
  isWindowsVista: () => {
    if (window.navigator.userAgent.indexOf('Windows NT 6.0') !== -1) {
      device.os = 'Windows Vista';
      return true;
    }
    return false;
  },
  isWindowsXP: () => {
    if (window.navigator.userAgent.indexOf('Windows NT 5.1') !== -1) {
      device.os = 'Windows XP';
      return true;
    }
    return false;
  },
  isWindows2000: () => {
    if (window.navigator.userAgent.indexOf('Windows NT 5.0') !== -1) {
      device.os = 'Windows 2000';
      return true;
    }
    return false;
  },
  isMacOriOS: () => {
    if (window.navigator.userAgent.indexOf('Mac') !== -1) {
      device.os = 'Mac/iOS';
      return true;
    }
    return false;
  },
  isUNIX: () => {
    if (window.navigator.userAgent.indexOf('X11') !== -1) {
      device.os = 'UNIX';
      return true;
    }
    return false;
  },
  isLinux: () => {
    if (window.navigator.userAgent.indexOf('Linux') !== -1) {
      device.os = 'Linux';
      return true;
    }
    return false;
  },
};
device.isIOS = device.isIPhone || device.isIPod || device.iPad || false;
// Edge 20+
device.isEdge = !device.isIE && !!window.StyleMedia;
// Blink engine detection
device.isBlink = (device.isChrome || device.isOpera) && !!window.CSS;
device.os = queryParams.os || device.getOS();
device.isMobile = device.isAndroid || device.isBlackBerry || device.isIOS || device.isOpera || device.isWindows || device.isUnknownMobile;
device.platform = device.isMobile ? 'mobile' : 'desktop';
device.isDesktop = !device.isMobile;
device.browser.name = device.browser.getBrowserName();
device.browser.version = getBrowserVersion();
device.deviceid = queryParams.deviceid
  ? `${queryParams.deviceid}|${device.platform}|${device.os}|${device.browser.name}|${device.browser.version}`
  : device.browser.name;

export default device;
