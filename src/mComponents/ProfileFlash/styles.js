import { createComponent } from 'react-fela';
import Link from '../Common/Link';

export const FlashContainer = createComponent(
  props => ({
    padding: '1px',
    width: 'inherit',
    marginTop: '94px',
  }),
  'div',
);

export const FlashLink = createComponent(
  props => ({
    display: 'inline-block',
    position: 'relative',
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

export const FlashMessage = createComponent(
  props => ({
    wordBreak: 'break-all',
  }),
  'span',
);
