import { createComponent } from 'react-fela';

export const FacetBarWrapper = createComponent(
  () => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }),
  'div',
);

export const FacetBarAction = createComponent(
  () => ({
    padding: '10px',
    borderTop: '1px solid #eee',
    bottom: 0,
    position: 'fixed',
    zIndex: 1,
    width: '100%',
    background: '#fff',
    'box-sizing': 'border-box',
  }),
  'div',
);

export const FacetBarContainer = createComponent(
  () => ({
    top: '56px',
    bottom: '56px',
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflow: 'auto',
  }),
  'div',
);

export const FacetItemContainer = createComponent(
  () => ({
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    'align-items': 'center',
  }),
  'div',
  ['onClick', 'no-pan'],
);

export const FacetSelectContainer = createComponent(
  () => ({
    position: 'fixed',
    top: '56px',
    left: 0,
    bottom: 0,
    right: 0,
    overflow: 'auto',
    height: '100vh',
    // pointerEvents: 'none',
    // touchAction: 'none',
    background: '#fff',
    zIndex: 3,
  }),
  'div',
);

export const FacetActions = createComponent(
  () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fafafa',
    padding: '10px',
  }),
  'div',
);

export const FacetOptions = createComponent(() => ({}), 'div');

export const FacetOption = createComponent(
  () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 10px',
    padding: '10px',
  }),
  'div',
  ['onClick', 'no-pan'],
);

export const TickIcon = createComponent(
  props => ({
    width: '30px',
    height: '30px',
    backgroundImage: `url(/assets/mobile/search_tick${props.isSelected ? 'active' : ''}.png)`,
    backgroundSize: 'cover',
  }),
  'div',
);

export const FacetOptionTitle = createComponent(
  () => ({
    backgroundColor: 'gray',
    'background-color': 'lightgray',
    padding: '10px',
    margin: '0 10px',
    border: '1px solid #444',
    'border-width': '1px 0',
  }),
  'div',
);

export const ChipInputContainer = createComponent(
  () => ({
    padding: '5px',
    margin: '0 10px',
  }),
  'div',
);
