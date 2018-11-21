import { createComponent } from 'react-fela';
import Link from '../Common/Link';

export const HeaderContainer = createComponent(
  ({ rows }) => ({
    height: `${47 * rows}px`,
    overflow: 'hidden',
  }),
  'header',
);

export const TopBarContainer = createComponent(
  props => ({
    display: 'flex',
    width: '100%',
    background: props.theme.color.primary,
    height: '49px',
    padding: 0,
    margin: 0,
    listStyle: 'none',
    alignItems: 'center',
  }),
  'ul',
);

export const BottomBarContainer = createComponent(
  props => ({
    boxShadow: '0 1px 2px rgba(43,59,93,0.29)',
    padding: '13px 13px 0 13px',
    background: '#fff',
    lineHeight: '20px',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    display: props.length < 3 ? 'flex' : 'inherit',
    justifyContent: props.length < 3 ? 'space-around' : 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  }),
  'nav',
);

export const TopNavItemLinkContainer = createComponent(
  () => ({
    width: '25%',
    textAlign: 'center',
  }),
  'li',
);

export const TopNavItemLink = createComponent(
  props => ({
    display: 'inline-block',
    position: 'relative',
    flex: 1,
    padding: '8px 0 4px',
    fontSize: '12px',
    color: props.isActive ? '#fff' : '#fcdee0',
    textDecoration: 'none',
    '-webkit-tap-highlight-color': 'transparent',
  }),
  Link,
);

export const TopNavItemButton = createComponent(
  props => ({
    position: 'relative',
    textAlign: 'center',
    flex: 1,
    padding: '8px 0 4px',
    fontSize: '12px',
    color: props.isActive ? '#fff' : '#fcdee0',
    '-webkit-tap-highlight-color': 'transparent',
    background: 'transparent',
    border: 0,
    outline: 0,
  }),
  'button',
);

const topNavIcons = {
  default: 'center 2px',
  sidebar: 'center 2px',
  matches: 'center -43px',
  inbox: 'center -93px',
  chat: 'center -139px',
  sidebarHover: 'center -20px',
  matchesHover: 'center -68px',
  inboxHover: 'center -115px',
  chatHover: 'center -163px',
};

export const Icon = createComponent(
  props => ({
    display: 'block',
    backgroundImage: 'url("https://img2.shaadi.com/assests/2017/images/mobile/m-ico-nav-sprite-v3.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '21px',
    width: '30px',
    margin: '0 auto 5px',
    backgroundPosition: props.isActive ? topNavIcons[`${props.name}Hover`] : topNavIcons[props.name],
    ':hover': {
      backgroundPosition: topNavIcons[`${props.name}Hover`],
    },
  }),
  'span',
);

export const Count = createComponent(
  props => ({
    background: '#e53a41',
    color: '#fff',
    position: 'absolute',
    left: '70%',
    top: '2px',
    borderRadius: '50%',
    fontSize: '12px',
    lineHeight: '18px',
    zIndex: 1,
    minWidth: '8px',
    height: '18px',
    padding: '0 5px',
    textAlign: 'center',
    display: props.isVisible ? 'block' : 'none',
  }),
  'span',
);

export const BottomBarLink = createComponent(
  props => ({
    display: 'inline-block',
    position: 'relative',
    margin: '0 22px 0 0',
    padding: '0 8px 8px',
    fontSize: '14px',
    color: props.isActive ? props.theme.color.blue : props.theme.color.black,
    borderBottomWidth: '3px',
    borderBottomStyle: 'solid',
    borderBottomColor: props.isActive ? props.theme.color.blue : 'transparent',
    textDecoration: 'none',
    '-webkit-tap-highlight-color': 'transparent',
    '&:last-child': {
      margin: 0,
    },
  }),
  Link,
  ['to', 'isExternal'],
);
