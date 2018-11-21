import { createComponent } from 'react-fela';
import Link from '../Common/Link';

export const Container = createComponent(
  props => ({
    minHeight: '900px',
    backgroundColor: '#fafafa',
    width: 'inherit',
  }),
  'div',
);

export const SlideWrapper = createComponent(
  props => ({
    width: '100%',
    overflow: 'hidden',
  }),
  'div',
  ['style'],
);

export const ProfileWrapper = createComponent(
  props => ({
    display: 'inline-block',
    width: '100%',
    verticalAlign: 'top',
    paddingBottom: '100px',
    ...props.style,
  }),
  'div',
);

export const LoadingWrapper = createComponent(
  props => ({
    minHeight: '1200px',
    display: 'inline-block',
    width: '100%',
    verticalAlign: 'top',
    background: '#f1f1f2',
    'text-align': 'center',
    'padding-top': '200px',
  }),
  'div',
);

export const SectionTitle = createComponent(
  props => ({
    color: props.theme.color.primary,
    fontSize: props.theme.font.title,
    fontWeight: 'normal',
    margin: '20px 0 10px 20px',
  }),
  'h3',
);

export const SectionCaption = createComponent(
  props => ({
    fontSize: props.theme.font.smaller,
    color: 'gray',
    display: 'block',
    marginTop: '3px',
  }),
  'small',
);

export const UpgradeLink = createComponent(
  props => ({
    fontSize: props.theme.font.normal,
    color: props.theme.color.blue,
    textDecoration: 'none',
    marginTop: '3px',
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
    border: 0,
    fontWeight: 'bold',
  }),
  Link,
  ['to', 'isExternal'],
);

export const Toolbar = createComponent(
  () => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: 'inherit',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: '8px',
  }),
  'div',
);

export const PhotoRequestAlert = createComponent(
  () => ({
    display: 'flex',
    'align-items': 'center',
    background: '#e4fafb',
    padding: '20px 10px',
  }),
  'div',
);

export const TextLink = createComponent(
  () => ({
    'font-size': '0.8em',
    'font-weight': 500,
    color: '#00bcd5',
    'text-decoration': 'none',
  }),
  Link,
  ['to', 'isExternal'],
);

export const IconStyles = { color: '#FC5B63', position: 'relative', left: '-13px', top: '-3px', height: '16px' };

export const GimificationBg = createComponent(
  props => ({
    background: 'url(https://img2.shaadi.com/mobile/images/gamification.png) left top/100% no-repeat',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',

    width: '100%',
    color: '#72727d',
    'text-align': 'center',
    'border-radius': '3px',
    'z-index': 1,
  }),
  'div',
);

export const GimificationFamilyIcon = createComponent(
  props => ({
    background: 'url(https://img2.shaadi.com/mobile/images/gamification-icn.png) left top/39px no-repeat',
    display: 'inline-block',
    height: '30px',
    width: '39px',
    margin: '1% 0 0',
  }),
  'span',
);

export const GimificationHoroscopeIcon = createComponent(
  props => ({
    background: 'url(https://img2.shaadi.com/mobile/images/gamification-icn.png) left -39px/39px no-repeat',
    display: 'inline-block',
    height: '30px',
    width: '39px',
    margin: '1% 0 0',
  }),
  'span',
);

export const GamificationInfo = createComponent(
  props => ({
    margin: '0 auto',
    width: '72%',
    'text-align': 'center',
    'white-space': 'normal',
    'border-top': '1px solid #e5dfbd',
    padding: '5px 0 0',
  }),
  'div',
);

export const GamificationLink = createComponent(
  props => ({
    background: 'url(https://img2.shaadi.com/mobile/images/right-arrow-v2.png) right center/8px no-repeat',
    padding: '0 11px 0 0',
    color: '#00bcd5',
    'text-decoration': 'none',
  }),
  Link,
  ['to', 'isExternal'],
);
