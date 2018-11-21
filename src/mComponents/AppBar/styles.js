import { createComponent } from 'react-fela';

export const Container = createComponent(
  props => ({
    width: 'inherit',
    height: '50px',
    position: 'fixed',
    zIndex: 1,
    willChange: 'background-color',
    padding: '15px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  }),
  'div',
  ['style'],
);

export const Title = createComponent(
  props => ({
    display: 'flex',
    color: '#fff',
    marginLeft: '16px',
    fontWeight: 'normal',
    fontSize: props.theme.font.title,
  }),
  'h2',
);

export const ArrowIcon = createComponent(
  props => ({
    display: 'inline-block',
    width: '24px',
    height: '24px',
    backgroundImage: 'url(/assets/mobile/back.png)',
    willChange: 'transform',
  }),
  'div',
);
