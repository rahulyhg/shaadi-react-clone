import { createComponent } from 'react-fela';

const boxTypeMap = {
  topWrapper: {
    display: 'flex',
    overflowX: 'auto',
    margin: '10px 0 0',
    height: '127px',
  },
  Info: {},
};

export const Box = createComponent(
  props => ({
    ...boxTypeMap[props.type],
    ...props.style,
  }),
  'div',
);

export const Wrapper = createComponent(
  props => ({
    overflow: 'hidden',
    height: '144px',
  }),
  'div',
);
