import { createComponent } from 'react-fela';
import Link from '../../Common/Link';

const divType = {
  divider: {
    width: '48px',
    borderTop: '1px solid #dfe0e3',
    margin: '7px auto',
  },
  default: {
    font: "300 12px/16px 'Roboto', sans-serif",
    border: '1px dashed #94e6f1',
    borderRadius: '3px',
    margin: '9px 0 0',
    padding: '18px 12px 10px',
    background: '#fff',
  },
  info: {
    background: '#dbf7fb',
    borderRadius: '3px',
    font: "300 14px/20px 'Roboto', sans-serif",
    color: '#51505d',
    padding: '10px 17px',
  },
  warning: {
    background: '#fcebec',
    borderRadius: '3px',
    font: "300 14px/20px 'Roboto', sans-serif",
    color: '#51505d',
    padding: '10px 17px',
  },
};

export const MsgContainer = createComponent(
  props => ({
    position: 'relative',
    textAlign: 'center',
    ...divType[props.type || 'default'],
    ...props.style,
  }),
  'div',
);

const IconType = {
  bothPartyPay: {
    width: '30px',
    height: '30px',
    position: 'absolute',
    top: '0',
    left: '50%',
    zIndex: '1',
    margin: '-15px 0 0 -15px',
  },
  lock: {
    background: 'url(/assets/mobile/lock.svg) left top/cover no-repeat',
    backgroundSize: 'cover',
    width: '9px',
    height: '12px',
    margin: '0 5px 0 0',
  },
  default: {
    background: 'url(/assets/mobile/msg-icon.svg) left top/cover no-repeat',
    width: '14px',
    height: '12px',
    margin: '0 5px 0 0',
  },
};
export const Icon = createComponent(
  props => ({
    display: 'inline-block',
    background: 'url(/assets/mobile/two-way-msg-icon.svg) left top/cover no-repeat',
    ...IconType[props.type],
  }),
  'div',
);

const anchorType = {
  upgradeLink: {
    fontWeight: '400',
    color: '#00bcd5',
  },
  upgradeText: {
    font: " 300 14px 'Roboto', sans-serif",
  },
};
export const Anchor = createComponent(
  props => ({
    color: '#51505d',
    textDecoration: 'none',
    fontWeight: '700',
    outline: '0',
    ':hover': {
      textDecoration: 'underline',
    },
    ...anchorType[props.type],
    extend: {
      condition: props.src === 'arrow',
      style: {
        background: 'url(/assets/mobile/grey-arrow.svg) right center no-repeat',
        backgroundSize: '7px',
        padding: '0 10px 0 0',
      },
    },
  }),
  Link,
  ['to', 'isExternal'],
);
export const EmailPhoneHiddenMsg = createComponent(
  props => ({
    color: '#c1690b',
    background: '#ffffbe',
  }),
  'div',
);
