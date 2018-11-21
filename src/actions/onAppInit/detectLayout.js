import { parse } from 'qs';
import cookie from 'cookie';
import device from '../../helpers/device';

let forceLayout = null;
let detection = null;

const validLayouts = ['desktop', 'mobile'];

const detect = (search, width) => {
  if (!detection) {
    detection = {
      isMobile: device.isMobile,
    };
  }

  const cookies = cookie.parse(document.cookie);
  if (validLayouts.includes(cookies.forceLayout || cookies.force_layout)) return cookies.forceLayout || cookies.force_layout;

  const params = search && parse(search.slice(1));
  forceLayout = (params && params.force_layout) || forceLayout;

  if (validLayouts.includes(forceLayout)) return forceLayout;
  if (width && width <= 720) return 'mobile';
  if (detection.isMobile) return 'mobile';
  return 'desktop';
};

let layout = null;

export default (search, width) => {
  layout = detect(
    search || window.location.search,
    width || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  );
  return { ...detection, layout };
};
