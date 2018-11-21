import { createComponent } from 'react-fela';
import Link from '../Common/Link';

export const LoginLink = createComponent(
  props => ({
    display: 'inline-block',
    position: 'relative',
    margin: '0 22px 0 0',
    padding: '0 8px 8px',
    fontSize: '14px',
    color: props.theme.color.blue,
    borderBottomWidth: '3px',
    borderBottomStyle: 'solid',
    borderBottomColor: props.isActive ? props.theme.color.blue : 'transparent',
    textDecoration: 'none',
    '-webkit-tap-highlight-color': 'transparent',
  }),
  Link,
  ['to', 'isExternal'],
);

export const Container = createComponent(
  props => ({
    padding: '20px',
  }),
  'div',
  ['style'],
);
