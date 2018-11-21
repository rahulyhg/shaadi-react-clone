import { createComponent } from 'react-fela';

export const Toolbar = createComponent(
  props => ({
    display: 'flex',
    flexDirection: 'column',
    width: 'inherit',
    backgroundColor: props.warning ? 'rgb(252, 235, 236)' : 'rgba(0,0,0,0.6)',
    paddingTop: '8px',
  }),
  'div',
);
