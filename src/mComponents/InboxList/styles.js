import { createComponent } from 'react-fela';
import { keyframes } from 'styled-components';

const bgchange = keyframes`
  0% {
    background: #e5f9fc;
  }
  100% {
    background: #fff;
  }
`;

export const InboxListContainer = createComponent(props => ({}), 'div');
export const CardContainer = createComponent(
  props => ({
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
    position: 'relative',
    margin: props.hide ? '0' : '5px 10px 12px',
    background: '#fff',
    textAlign: 'center',
    display: 'block',
    'box-sizing': 'border-box',
    padding: props.hide ? '0' : '11px 11px 5px',
    maxHeight: props.hide ? '0' : '470px',
    maxWidth: props.hide ? '0' : '100vw',
    transition: ' max-height 0.25s ease',
    overflow: props.hide ? 'hidden' : 'visible',
    borderRadius: '3px',
    boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)',
    extend: {
      condition: props.isNew,
      style: {
        animation: `${bgchange} 10s ease`,
      },
    },
  }),
  'div',
  ['onClick'],
);
export const CardHeader = createComponent(
  props => ({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  'div',
);
export const MemberShipTag = createComponent(
  props => ({
    width: '127px',
  }),
  'div',
);
export const Time = createComponent(
  props => ({
    width: '127px',
    textAlign: 'right',
    fontSize: '12px',
    fontWeight: 300,
    color: '#95959d',
    padding: '2px 0 0',
  }),
  'div',
);
export const ProfilePic = createComponent(props => ({ width: '127px', flexGrow: 1, minWidth: '125px' }), 'div');
export const ProfileName = createComponent(
  props => ({
    textAlign: 'center',
    font: "400 18px 'Roboto', sans-serif",
    color: '#00bcd5',
    padding: '12px 0 8px',
  }),
  'div',
);
export const DetailSection = createComponent(
  props => ({
    font: "300 14px/21px 'Roboto', sans-serif",
    color: '#51505d',
  }),
  'div',
);
export const UserInfo = createComponent(
  props => ({
    padding: '0 11px 9px 22px',
    textAlign: 'center',
    ...props.style,
    '> div': {
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
  'div',
);
export const UserMsg = createComponent(props => ({}), 'div');
export const CTA = createComponent(
  props => ({
    padding: '16px 0 0 0',
  }),
  'div',
);
