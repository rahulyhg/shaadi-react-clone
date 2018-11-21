import { createComponent } from 'react-fela';

export const MatchListContainer = createComponent(
  props => ({
    padding: '10px 0',
    'max-width': '450px',
    margin: `${props.marginVerticle} auto`,
    overflow: 'hidden',
  }),
  'div',
  ['style'],
);

const borderColors = {
  vip: '#BB0039',
  select: '#B76DFF',
  premium: '#FF4351',
  premiumplus: '#FF4351',
  default: 'transparent',
};

export const NoMatchesContainer = createComponent(
  props => ({
    textAlign: 'center',
    padding: '40px 0',
  }),
  'div',
);

export const MatchListItemContainer = createComponent(
  props => ({
    margin: '5px 10px',
    borderRadius: '5px',
    overflow: 'hidden',
    border: '2px solid transparent',
    borderColor: `${
      props.plan && props.tag !== 'vip' && props.tag !== 'select'
        ? borderColors[props.plan.toLowerCase()]
        : borderColors[props.tag.toLowerCase()]
    }`,
  }),
  'div',
  ['style'],
);

export const OverlayStyles = {
  position: 'absolute',
  backgroundColor: 'rgba(0, 188, 213, 0.68)',
  top: '0',
  left: '10px',
  right: '10px',
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  pointerEvents: 'all',
  fontSize: '22px',
  fontWeight: 'normal',
};
