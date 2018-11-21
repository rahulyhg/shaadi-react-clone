import { createComponent } from 'react-fela';

export const Container = createComponent(
  props => ({
    marginTop: '94px',
    userSelect: 'none',
    touchAction: 'pan-y',
  }),
  'div',
);

export const Pagination = createComponent(
  props => ({
    display: 'flex',
    justifyContent: 'space-around',
    paddingBottom: '20px',
  }),
  'div',
);
