import { createComponent } from 'react-fela';

export const Container = createComponent(
  props => ({
    position: 'sticky',
    backgroundColor: '#f1f1f1',
    userSelect: 'none',
    margin: props.isDocked ? '0' : '94px 0 0',
    overflow: 'hidden',
  }),
  'div',
);

export const Scrollbar = createComponent(
  props => ({
    overflowY: 'auto',
    ...props.style,
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: ' #888',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  }),
  'div',
  ['onScroll'],
);

export const Title = createComponent(
  props => ({
    display: 'inline-block',
    width: '100%',
    padding: '5px 0 0 0',
    fontSize: '16px',
    color: '#51505d',
  }),
  'title',
);
export const Filter = createComponent(
  props => ({
    display: 'inline-block',
    width: '34px',
    height: '29px',
    background: "url('/assets/filter-icon.svg') no-repeat right",
    backgroundSize: '20px',
  }),
  'div',
  ['onClick'],
);
export const Header = createComponent(
  props => ({
    display: props.isVisible ? 'flex' : 'none ',
    padding: '10px 20px  0 10px',
    position: props.docHeader ? 'fixed' : 'relative',
    top: props.docHeader ? `${props.isDocked ? '54px' : '94px'}` : '0',
    width: `100vw`,
    zIndex: 2,
    backgroundColor: '#f1f1f1',
    boxSizing: 'border-box',
  }),
  'div',
);

export const SpinnerContainer = createComponent(
  props =>
    props.isFixed
      ? {
          position: 'fixed',
          top: '50%',
          left: '50%',
          margin: '0 0 0 -20px',
        }
      : '',
  'div',
);
