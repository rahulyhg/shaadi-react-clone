import { createComponent } from 'react-fela';
import Link from '../Common/Link';

export const PageContent = createComponent(
  () => ({
    background: 'url(https://img2.shaadi.com/assests/2017/images/mobile/photo-gimification.png) left top/100% 89px no-repeat',
    fontSize: '10px',
    width: '100%',
    height: '87px',
  }),
  'div',
);

export const GamificationContentWrap = createComponent(
  () => ({
    background: '#fff',
    height: '100vh',
    textAlign: 'center',
  }),
  'div',
);

export const Icon = createComponent(
  () => ({
    background: 'url(https://img2.shaadi.com/assests/2017/images/mobile/top-icon.png) left top/100% no-repeat',
    width: '40px',
    height: '40px',
    display: 'inline-block',
  }),
  'span',
);

export const TopCopy = createComponent(
  () => ({
    padding: '8px 0 0',
  }),
  'div',
);

export const ActionLink = createComponent(
  () => ({
    background: '#00bcd5',
    color: '#fff',
    borderRadius: '3px',
    width: '185px',
    margin: '10px auto 39px',
    padding: '13px 0 12px',
    textDecoration: 'none',
    display: 'inline-block',
  }),
  Link,
  ['to', 'isExternal'],
);

export const PointerTitle = createComponent(
  () => ({
    padding: '8px 0 0',
  }),
  'div',
);

export const PointerWrap = createComponent(
  () => ({
    width: '280px',
    margin: '0 auto',
  }),
  'ul',
);

export const Pointer = createComponent(
  () => ({
    background: 'url(https://img2.shaadi.com/assests/2016/images/chat-download-sprite-m.png) -61px -57px/82px no-repeat',
    color: '#72727d',
    fontSize: '0.9em',
    margin: '8px 0',
    padding: '0 0 0 16px',
    textAlign: 'left',
    listStyle: 'none',
  }),
  'li',
);
