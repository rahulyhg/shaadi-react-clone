import { createComponent } from 'react-fela';
import Link from '../Common/Link';

export const DrawerContainer = createComponent(
  () => ({
    background: '#dfe0e3',
    width: '276px',
    'font-size': '14px',
    height: '100%',
    'box-shadow': 'inset -5px 0 5px rgba(0,0,0,.15)',
  }),
  'div',
);

export const UserSectionContainer = createComponent(
  () => ({
    display: 'flex',
    textDecoration: 'none',
  }),
  Link,
  ['to', 'isExternal'],
);

export const UpgradeLink = createComponent(
  () => ({
    display: 'flex',
    textDecoration: 'none',
    padding: '10px 0',
    marginTop: '5px',
    background: '#3ec1c7 url(/assets/mobile/upgrade-bar-v2.png) repeat-x left top',
  }),
  Link,
  ['to', 'isExternal'],
);

export const AddPhotoBtn = createComponent(
  () => ({
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 700,
    color: '#fff',
    borderRadius: '3px',
    textDecoration: 'none',
    padding: '2px 16px 2px 10px',
    marginTop: '5px',
    background: '#3ec1c7 url(https://img2.shaadi.com/assests/2017/images/mobile-shaadi-sprite-v18.png) no-repeat 81px -12px',
  }),
  Link,
  ['to', 'isExternal'],
);

export const UserPhoto = createComponent(
  () => ({
    width: '28px',
    height: '28px',
    padding: '2px',
    margin: '5px 6px 0',
    border: 'solid 1px #dcdbc6',
    background: '#fff',
  }),
  'img',
  ['src'],
);

export const UserTitle = createComponent(
  () => ({
    height: '1.4em',
    font: 'normal .94em/1.4em HelveticaNeue,Helvetica,Arial',
    display: 'inline-block',
    'vertical-align': 'top',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  }),
  'div',
  [],
);

export const UserUid = createComponent(
  () => ({
    font: 'normal .75em HelveticaNeue,Helvetica,Arial',
  }),
  'div',
  [],
);

export const UserDetails = createComponent(
  () => ({
    width: '15em',
    margin: '.313em 0 0',
    color: '#72727d',
  }),
  'div',
  [],
);

export const UpgradeText = createComponent(
  () => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '0 32px 0 31px',
    fontWeight: 'bold',
    color: '#fff',
    'text-decoration': 'none',
    margin: '0 0 0 15px',
    background: 'url(/assets/mobile/upgrade_ic.png) no-repeat left 0',
  }),
  'span',
  [],
);

export const MenuItemContainer = createComponent(
  () => ({
    'border-top': '1px solid #e5e5e5',
    'border-bottom': '1px solid #d1d1d1',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#72727d',
    background: '#dfe0e3',
    width: '270px',
  }),
  Link,
  ['to', 'isExternal'],
);

export const DownloadAppContainer = createComponent(
  () => ({
    'border-top': '1px solid #e5e5e5',
    'border-bottom': '1px solid #d1d1d1',
    cursor: 'pointer',
    background: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#72727d',
    'box-shadow': 'inset -5px 0 5px rgba(0,0,0,.15)',
  }),
  'a',
  ['href'],
);

export const MenuItemButton = createComponent(
  () => ({
    'border-top': '1px solid #e5e5e5',
    'border-bottom': '1px solid #d1d1d1',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#72727d',
    width: '100%',
    background: 'inherit',
    'font-size': 'inherit',
    padding: 0,
    'text-align': 'left',
    border: 0,
    outline: 'none',
  }),
  'button',
  ['onClick'],
);

const spriteIcons = {
  accepted: 'left -174px',
  matches: 'left -48px',
  search: 'left -91px',
  inbox: 'left -134px',
  sparks: 'left -1195px',
  my_profile: 'left -215px',
  default: 'left -699px',
  notifications: 'left -259px',
  notifications_new: 'left top',
  more: 'left -300px',
  sent: 'left -532px',
  deleted: 'left -575px',
  help: 'left -616px',
  trms: 'left -668px',
  logout: 'left -658px',
  recent_visitors: 'left -1020px',
  account: 'left -819px',
  download_app_android: 'left -767px',
  download_app_apple: 'left -795px',
  download_app_windows: 'left -824px',
  nav_arrow: props => (props.open ? 'left -751px' : 'left -350px'),
  contact_us_icon: 'left -2923px',
  contact_filters: 'left -727px',
  filtered_out: 'left -1381px',
  language: 'left -1576px',
};

const backgroundSizes = {
  account: '21px',
  default: 'inherit',
  contact_filters: '21px',
  trms: '18px',
  contact_us_icon: '17px',
  language: '18px',
};

const getStyling = props => {
  const styleInfo = spriteIcons[props.kind || 'default'];
  if (typeof styleInfo === 'function') {
    return styleInfo(props);
  }
  return styleInfo;
};
export const MenuIcon = createComponent(
  props => ({
    background: `url('https://img2.shaadi.com/assests/2017/images/mobile-shaadi-sprite-v21.png') ${getStyling(props)}`,
    width: '16px',
    height: '16px',
    margin: '.8em 1em',
    backgroundSize: `${backgroundSizes[props.kind || 'default']} !important`,
  }),
  'div',
  [],
);

export const DownloadIcon = createComponent(
  props => ({
    background: `url('https://img2.shaadi.com/assests/2017/images/mobile-shaadi-sprite-v21.png') no-repeat ${
      spriteIcons[props.kind || 'default']
    }`,
    width: '30px',
    height: '28px',
    margin: '.8em 1em',
    backgroundSize: `${backgroundSizes[props.kind || 'default']}`,
  }),
  'div',
  [],
);

export const MenuText = createComponent(
  () => ({
    flex: 1,
  }),
  'div',
  [],
);

export const MenuCount = createComponent(
  () => ({
    marginRight: '20px',
    background: '#e53a41',
    'border-radius': '3px',
    color: '#fff',
    width: '3em',
    textAlign: 'center',
    'font-size': '.7em',
    height: '1.7em',
    'line-height': '1.7em',
  }),
  'div',
  [],
);

export const SubMenuItemContainer = createComponent(
  () => ({
    'border-top': '1px solid #f5f5f5',
    'border-bottom': '1px solid #dfe0e3',
    height: '3.2em',
    padding: '0 0 0 3.5em',
    color: '#72727d',
    display: 'block',
    background: '#f1f1f2',
    fontSize: '.87em',
    lineHeight: '3.15em',
    textDecoration: 'none',
  }),
  Link,
  ['to', 'isExternal'],
);

export const MenuDropdown = createComponent(
  props => ({
    maxHeight: `${props.open ? '400px' : '0px'}`,
    visibility: `${props.open ? 'visible' : 'hidden'}`,
    transition: '0.3s ease max-height',
  }),
  'div',
  [],
);

export const Footer = createComponent(
  () => ({
    padding: '.938em 0',
    'font-size': '12px',
    'text-align': 'center',
    color: '#72727d',
  }),
  'div',
  [],
);

export const DesktopLink = createComponent(
  () => ({
    color: '#00bcd5',
    textDecoration: 'none',
  }),
  Link,
  ['to', 'isExternal'],
);

export const Copyright = createComponent(
  () => ({
    color: '#72727d',
    margin: '5px 0',
  }),
  'div',
  [],
);

export const Example = createComponent(() => ({}), 'div', []);
