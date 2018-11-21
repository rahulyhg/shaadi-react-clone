import { createComponent } from 'react-fela';
import Link from '../Common/Link';

export const PageContent = createComponent(
  () => ({
    position: 'relative',
    zIndex: 1,
    marginTop: 'auto',
    fontSize: '10px',
  }),
  'div',
);

export const ChatExpWrap = createComponent(
  () => ({
    background: '#fffbe6',
    fontSize: '1.4em',
    lineHeight: '1.2em',
    padding: '5px 18px 5px',
  }),
  'div',
);

export const ChatExpClose = createComponent(
  () => ({
    width: '15px',
    height: '15px',
    fontSize: '10px',
    background: 'url(https://img2.shaadi.com/assests/2016/chat/new-chat-icon-v4.png) no-repeat left -169px',
    backgroundSize: '100px',
    margin: '6px 0 0',
    float: 'right',
  }),
  'div',
  ['onClick', 'no-pan'],
);

export const DownloadApp = createComponent(
  () => ({
    fontSize: '14px',
  }),
  'div',
);

export const DownloadAppText = createComponent(
  () => ({
    fontWeight: 'bold',
  }),
  'span',
);

export const DownloadLink = createComponent(
  props => ({
    color: props.theme.color.blue,
    textDecoration: 'none',
    fontWeight: 'bold',
  }),
  Link,
  ['to', 'isExternal'],
);

export const FriendListContainer = createComponent(
  () => ({
    background: '#fff',
  }),
  'div',
);

export const ChatBarContainer = createComponent(
  () => ({
    display: 'block',
  }),
  'div',
);

export const RecentChatListContainer = createComponent(
  () => ({
    display: 'block',
    paddingTop: '96px',
    maxHeight: '100vh',
    overflowY: 'auto',
  }),
  'div',
);

export const FriendListWrap = createComponent(
  () => ({
    padding: '6px 0 6px 10px',
    background: '#fff',
  }),
  'div',
);

export const ProfileInfo = createComponent(() => ({}), 'div');

export const ChatListSep = createComponent(
  () => ({
    borderTop: '1px solid #e5e5e5',
    margin: '6px 0 0 61px',
  }),
  'div',
);

export const ImageContainer = createComponent(
  () => ({
    float: 'left',
    borderRadius: '50%',
    margin: '0 8px 0 0',
    border: '1px solid #dfe0e3',
    width: '49px',
    height: '49px',
  }),
  'img',
);

export const ChatProDetailWrap = createComponent(
  () => ({
    float: 'left',
    width: '80%',
  }),
  'div',
);

export const ChatProid = createComponent(
  () => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    font: 'bold 1.5em HelveticaNeue,Helvetica,Arial',
    color: '#51505d',
    float: 'left',
    maxWidth: '75%',
    lineHeight: '1.3em',
  }),
  'span',
);

export const ChatTimeStamp = createComponent(
  () => ({
    fontSize: '1.1em',
    color: '#95959d',
    padding: '4px 0 5px',
    float: 'right',
    textAlign: 'right',
  }),
  'div',
);

export const Clearfix = createComponent(
  () => ({
    clear: 'both',
  }),
  'div',
);

export const ChatPitem = createComponent(
  () => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    fontSize: '1.4em',
    color: '#72727d',
    lineHeight: '1.13em',
    padding: '3px 0 0',
  }),
  'span',
);

export const RcMsg1 = createComponent(
  () => ({
    maxWidth: '82%',
    float: 'left',
    fontSize: '1.4em',
    color: '#51505d',
    lineHeight: 'normal',
    padding: '5px 0 3px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
  }),
  'span',
);

export const NoRcChatMainWrap = createComponent(
  () => ({
    background: '#f1f1f2',
    height: '100vh',
    position: 'relative',
  }),
  'div',
);

export const NoRcChatWrap = createComponent(
  () => ({
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '-48px',
    whiteSpace: 'nowrap',
  }),
  'div',
);

export const NoRcChat = createComponent(
  () => ({
    display: 'inline-block',
    background: 'url(https://img2.shaadi.com/assests/2016/chat/new-chat-icon-v4.png) no-repeat left -20px',
    backgroundSize: '89px auto',
    width: '79px',
    height: '72px',
  }),
  'span',
);

export const NoRcCopy1 = createComponent(
  () => ({
    fontSize: '1.0em',
    color: '#51505d',
    padding: '14px 0 12px',
  }),
  'div',
);

export const NoRcCopy2 = createComponent(
  () => ({
    fontSize: '0.8em',
    lineHeight: '1.4em',
    color: '#95959d',
  }),
  'div',
);

export const UnreadCount = createComponent(
  props => ({
    display: 'inline-block',
    float: 'right',
    padding: '5px',
    backgroundColor: props.theme.color.blue,
    borderRadius: '50%',
    fontSize: props.theme.font.small,
    color: '#fff',
    width: '22px',
    boxSizing: 'border-box',
    textAlign: 'center',
  }),
  'div',
);
