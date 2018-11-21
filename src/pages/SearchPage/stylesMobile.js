import { createComponent } from 'react-fela';
import Link from '../../components/Common/Link';

export const Container = createComponent(
  props => ({
    marginTop: '128px',
    userSelect: 'none',
    touchAction: 'pan-y',
  }),
  'div',
);

export const Wrapper = createComponent(
  props => ({
    marginTop: '94px',
    userSelect: 'none',
  }),
  'div',
);

export const Toolbar = createComponent(
  props => ({
    padding: '5px 10px',
    'box-shadow': '0px 3px 4px rgba(0,0,0,0.1)',
    position: 'fixed',
    width: '94%',
    'z-index': '1',
    background: '#f1f1f2',
    top: props.isNavHidden ? '-80px' : '94px',
    transition: 'top 0.2s linear 0s',
    ...props.style,
  }),
  'div',
);

export const Topbar = createComponent(
  props => ({
    display: 'flex',
    height: '34px',
    alignItems: 'center',
  }),
  'div',
);

export const Botttombar = createComponent(
  props => ({
    display: 'flex',
    alignItems: 'center',
  }),
  'div',
);

export const EditLink = createComponent(
  props => ({
    display: 'inline-block',
    'line-height': '21px',
    textDecoration: 'none',
    color: props.theme.color.blue,
    'margin-left': '5px',
  }),
  Link,
  ['to', 'isExternal'],
);

export const RefineBtn = createComponent(props => ({}), 'div');

export const SwitchLabel = createComponent(props => ({}), 'div');

export const Pagination = createComponent(
  props => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 13px 60px',
  }),
  'div',
);

export const RefineIcon = createComponent(
  props => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundImage: 'url(/assets/mobile/filter_opt2.png)',
    backgroundSize: 'cover',
    width: '16px',
    height: '16px',
    marginLeft: '5px',
  }),
  'span',
);

export const ArrowIconStyles = { verticalAlign: 'middle', marginLeft: '-5px', color: '#bbb' };
export const TooltipStyles = { width: '18px', height: '18px', verticalAlign: 'middle', marginLeft: '7px', fillOpacity: 0.7 };
