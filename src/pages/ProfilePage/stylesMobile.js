import { createComponent } from 'react-fela';

export const Container = createComponent(
  props => ({
    backgroundColor: '#fafafa',
    width: 'inherit',
    marginTop: '0',
    userSelect: 'none',
  }),
  'main',
);

export const LoadingWrapper = createComponent(
  props => ({
    display: 'inline-block',
    width: '100%',
    verticalAlign: 'top',
    background: '#f1f1f2',
    'text-align': 'center',
    'padding-top': '200px',
  }),
  'div',
);
