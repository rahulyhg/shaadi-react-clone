import { createComponent } from 'react-fela';

export const PhotoNavigationArrow = createComponent(
  props => ({
    display: props.isVisible ? 'block' : 'none',
    background:
      props.type === 'movePrevProfile'
        ? 'url(/assets/mobile/previous-navigator.png) left top/cover no-repeat'
        : 'url(/assets/mobile/next-navigator.png) left top/cover no-repeat',
    width: '32px',
    height: '120px',
    position: 'fixed',
    top: '175px',
    left: props.type === 'movePrevProfile' ? '0' : 'auto',
    right: props.type === 'moveNextProfile' ? '0' : 'auto',
    border: 0,
    zIndex: 10,
  }),
  'div',
  ['style', 'onClick'],
);
