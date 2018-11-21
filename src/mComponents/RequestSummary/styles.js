import { createComponent } from 'react-fela';
import Link from '../Common/Link';

const boxType = {
  default: {
    backgroundColor: '#fff',
    borderRadius: '3px',
    width: '220px',
    padding: '10px',
    margin: '0 9px 0 0',
    boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12)',
  },
  circular: {
    borderRadius: '50%',
    height: '30px',
    width: '30px',
    boxSizing: 'border-box',
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: '11px',
    border: '1px solid #dfe0e3',
    '&:nth-child(2)': {
      left: '17px',
    },
    '&:nth-child(3)': {
      left: '34px',
      background: '#fff',
      border: '1px solid #00bcd5',
      color: '#00bcd5',
      textAlign: 'center',
      padding: '8px 0 0',
    },
  },
};

export const Box = createComponent(
  props => ({
    ...boxType[props.type || 'default'],
    background: props.src ? `url(${props.src}) center top/cover no-repeat` : '',
    ...props.styles,
  }),
  'div',
);

const wrapperType = {
  default: {
    position: 'relative',
    flex: 1,
  },
  flexWrapRow: {
    display: 'flex',
    margin: '21px 0 0',
  },
};
export const Wrapper = createComponent(
  props => ({
    ...wrapperType[props.type || 'default'],
  }),
  'div',
  ['onClick'],
);
export const ListLink = createComponent(
  props => ({
    backgroundColor: '#00bcd4',
    padding: '8px 0',
    textAlign: 'center',
    width: '73px',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '14px',
    textDecoration: 'none',
  }),
  Link,
  ['to', 'isExternal'],
);

export const Heading = createComponent(
  props => ({
    fontSize: props.type === 'desc' ? '14px' : '16px',
    fontWeight: props.type === 'desc' ? 300 : 400,
    color: props.type === 'desc' ? '#95959d' : '#72727d',
    padding: '4px',
  }),
  'div',
);
