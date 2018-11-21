import { createComponent } from 'react-fela';

export const SlideWrapper = createComponent(
  props => ({
    width: '100%',
    overflow: 'hidden',
  }),
  'div',
);

export const SlideContainer = createComponent(
  props => ({
    position: 'relative',
    display: 'block',
    whiteSpace: 'nowrap',
    willChange: 'transform',
    transition: props.animate ? `${props.isSlowlyAnimated ? '0.3s' : '0.2s'} ease transform` : '0s',
  }),
  'div',
);
