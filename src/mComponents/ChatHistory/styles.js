import { createComponent } from 'react-fela';
import Link from '../Common/Link';

export const MainWrapper = createComponent(
  () => ({
    margin: '57px 0 0 0',
    padding: '0 0 60px 0',
    width: '99%',
  }),
  'div',
);

export const ChatPopHeaderWrap = createComponent(
  () => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }),
  'div',
);

export const ChatPopHeader = createComponent(
  () => ({
    padding: '8px 15px',
    background: '#ff5a60',
  }),
  'div',
);

export const ChatPopHeaderBack = createComponent(
  () => ({
    width: '16px',
    height: '20px',
    background: 'url(https://img2.shaadi.com/assests/2016/images/mobile-shaadi-sprite-v16.png) no-repeat left -1250px',
    float: 'left',
    margin: '4px 8px 0 0',
  }),
  'a',
);

export const ChatWindowHeaderWrap = createComponent(
  () => ({
    float: 'left',
    color: '#fff',
  }),
  'a',
);

export const ChatWindowHeaderWrapImg = createComponent(
  () => ({
    float: 'left',
    borderRadius: '50%',
    margin: '0 8px 0 18px',
    border: '1px solid #dfe0e3',
    width: '50px',
    height: '50px',
  }),
  'img',
  ['src'],
);

export const ChatWindowProWrap = createComponent(
  () => ({
    float: 'left',
    color: '#fff',
    margin: '7px 0 0',
  }),
  'div',
);

export const ChatWindowProName = createComponent(
  () => ({
    fontSize: '1.2em',
  }),
  'div',
);

export const ChatWindowProStatus = createComponent(
  () => ({
    fontSize: '0.9em',
    color: '#fcdee0',
    padding: '2px 0 0',
  }),
  'div',
);

export const Clearfix = createComponent(
  () => ({
    clear: 'both',
  }),
  'div',
);

export const MChatWrap = createComponent(
  () => ({
    padding: '2px 10px 7px',
  }),
  'div',
);

export const ChatWindowProDetailsWrap = createComponent(
  () => ({
    background: '#fff',
    color: '#817f87',
    fontWeight: 400,
    opacity: 0.7,
    boxShadow: '0 1px 2px rgba(43,59,93,0.29)',
    textAlign: 'center',
    padding: '0 15px',
    width: '100%',
    boxSizing: 'border-box',
  }),
  'div',
);

export const ChatWindowProDetails = createComponent(
  () => ({
    fontSize: '0.9em',
    lineHeight: '1.2em',
    color: '#51505d',
    paddingTop: '5px',
  }),
  'div',
);

export const ChatInviteAction = createComponent(
  () => ({
    borderTop: '1px solid #ececee',
    fontSize: '1.2em',
    color: '#433f3a',
    padding: '5px 0 2px',
    margin: '7px 0 0',
  }),
  'div',
);

export const ChatErrorMsgWrap = createComponent(
  () => ({
    top: '90px',
    bottom: 'auto',
    textAlign: 'center',
    padding: '0 5%',
    position: 'absolute',
    width: '90%',
  }),
  'div',
);

export const LastMsgDay = createComponent(
  () => ({
    textAlign: 'center',
    fontSize: '0.8em',
    color: '#95959d',
    padding: '10px 0 0',
  }),
  'div',
);

export const UserInitiateChat = createComponent(
  () => ({
    background: '#dbf7fb',
    margin: '20px 0 0',
    borderRadius: '3px 0 3px 3px',
    boxShadow: '0 1px 2px rgba(114,114,125,0.4)',
    fontSize: '1.2em',
    lineHeight: '1.2em',
    color: '#51505d',
    padding: '4px 7px',
    maxWidth: '85%',
    float: 'left',
  }),
  'div',
);

export const SelfInitiateChat = createComponent(
  () => ({
    background: '#fcdee0',
    margin: '20px 0 0',
    borderRadius: '3px 0 3px 3px',
    boxShadow: '0 1px 2px rgba(114,114,125,0.4)',
    fontSize: '0.8em',
    lineHeight: '1.2em',
    color: '#51505d',
    padding: '4px 7px',
    maxWidth: '85%',
    float: 'right',
  }),
  'div',
);

export const UserContinueChat = createComponent(
  props => ({
    background: props.isGenderMale ? '#fcdee0' : '#dbf7fb',
    marginTop: props.isInitiatedMessage ? '20px' : '6px',
    borderRadius: '3px 0 3px 3px',
    boxShadow: '0 1px 2px rgba(114,114,125,0.4)',
    fontSize: '0.9em',
    lineHeight: '1.2em',
    color: '#51505d',
    padding: '4px 7px',
    maxWidth: '85%',
    float: 'left',
  }),
  'div',
);

export const SelfContinueChat = createComponent(
  props => ({
    background: props.isGenderMale ? '#dbf7fb' : '#fcdee0',
    marginTop: props.isInitiatedMessage ? '20px' : '6px',
    borderRadius: '3px 0 3px 3px',
    boxShadow: '0 1px 2px rgba(114,114,125,0.4)',
    fontSize: '0.9em',
    lineHeight: '1.2em',
    color: '#51505d',
    padding: '4px 7px',
    maxWidth: '85%',
    float: 'right',
  }),
  'div',
);

export const UserChatStatus = createComponent(
  () => ({
    textAlign: 'right',
    fontSize: '.8em',
    color: '#95959d',
    padding: '2px 0 0 5px',
    float: 'right',
    margin: '2px 0 0',
  }),
  'div',
);

const statusBackgroundPositions = {
  read: '5px -136px',
  delivered: '5px -108px',
  default: '5px -152px',
  wait: '5px -152px',
  none: '5px -152px',
  sent: '5px -122px',
};

export const ChatStatus = createComponent(
  props => ({
    backgroundPosition: statusBackgroundPositions[props.status] || statusBackgroundPositions.default,
    backgroundImage: 'url(/assets/mobile/new-chat-icon-v4.png)',
    backgroundSize: '100px auto',
    height: '11px',
    display: 'inline-block',
    padding: '0 0 0 19px',
  }),
  'span',
);

export const ChatInputMsgWrap = createComponent(
  () => ({
    background: '#fff',
    borderTop: '1px solid #dfe0e3',
    padding: '8px 5px',
    bottom: '0',
    width: '100%',
    textAlign: 'center',
    position: 'fixed',
    display: 'flex',
    boxSizing: 'border-box',
  }),
  'form',
  ['onSubmit'],
);

export const ChatInput = createComponent(
  () => ({
    flex: 1,
    color: '#95959d',
    border: '1px solid #dfe0e3',
    borderRadius: '3px !important',
    padding: '9px 12px',
    margin: '0 8px 0 0',
    display: 'inline-block',
    verticalAlign: 'middle',
    outline: 'none',
    fontWeight: 500,
    '::placeholder': {
      color: '#999',
    },
  }),
  'input',
  ['placeholder', 'onChange', 'value'],
);

export const SubmitChatMsgBtn = createComponent(
  () => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '9px 12px',
    borderRadius: '3px',
    background: '#1fbcd3',
    color: '#fff',
    border: 0,
    outline: 0,
    fontWeight: 500,
  }),
  'button',
  ['onClick', 'disabled', 'no-pan'],
);

export const ProfileLink = createComponent(
  () => ({
    display: 'flex',
    textDecoration: 'none',
  }),
  Link,
  ['to', 'isExternal'],
);

export const ChatErrorMsg = createComponent(
  () => ({
    display: 'inline-block',
    color: '#e53a41',
    fontSize: '0.9em',
    lineHeight: '1.4em',
    padding: '10px 10px 5px',
  }),
  'div',
);

export const UpgradeNowWrap = createComponent(
  () => ({
    textAlign: 'center',
  }),
  'div',
);

export const UpgradeNow = createComponent(
  () => ({
    margin: '12px 0 0',
    fontSize: '1.0em',
    color: '#00bcd5',
    textDecoration: 'none',
  }),
  Link,
  ['to', 'isExternal'],
);

export const MobileGamifiWrap = createComponent(
  () => ({
    margin: '10px 0',
    background: '#fff8d3',
    boxShadow: '0 1px 2px rgba(43,59,93,0.29)',
    borderRadius: '0 3px 3px 3px',
  }),
  'div',
);

export const MobileGamifiImg = createComponent(
  () => ({
    background: '#fff url(https://img2.shaadi.com/assests/2016/chat/gamification.png) no-repeat left top;',
    width: '42px',
    height: '84px',
    float: 'left',
  }),
  'div',
);

export const MobileGamifiText = createComponent(
  () => ({
    fontSize: '0.9em',
    lineHeight: '1.4em',
    background: '#fff8d3',
    float: 'left',
    padding: '22px 0 16px 0',
    width: '80%',
    textAlign: 'center',
  }),
  'div',
);

export const Flash = createComponent(
  () => ({
    fontSize: '14px',
    color: '#95959d',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '0 0 3px',
  }),
  'div',
);
