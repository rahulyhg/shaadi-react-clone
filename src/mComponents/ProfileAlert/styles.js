import { createComponent } from 'react-fela';
import Link from '../Common/Link';

export const AlertLink = createComponent(
  props => ({
    display: 'inline-block',
    position: 'relative',
    fontWeight: 'bold',
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
