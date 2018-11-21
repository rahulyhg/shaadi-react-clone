import { createComponent } from 'react-fela';

export const Container = createComponent(
  () => ({
    height: '94px',
    overflow: 'hidden',
  }),
  'div',
);

export const Tab = createComponent(
  props => ({
    fontSize: '24px',
    color: props.isActive ? 'blue' : 'black',
  }),
  'h1',
);
