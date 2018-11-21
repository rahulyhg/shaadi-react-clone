import { createComponent } from 'react-fela';

export const Container = createComponent(
  props => ({
    position: 'relative',
  }),
  'div',
);

export const GradientSection = createComponent(
  props => ({
    position: 'absolute',
    bottom: 0,
    width: '100%',
    boxSizing: 'border-box',
    background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))',
    padding: '0 20px 10px 20px',
  }),
  'div',
);

export const Name = createComponent(
  props => ({
    color: '#fff',
    fontSize: props.theme.font.title,
    marginBottom: '5px',
  }),
  'p',
);

export const Detail = createComponent(
  props => ({
    color: '#fff',
    fontSize: props.theme.font.small,
    marginTop: 0,
    marginBottom: '5px',
  }),
  'p',
);

export const Details = createComponent(
  props => ({
    display: 'flex',
    alignItems: 'flex-end',
  }),
  'p',
);

export const DetailColumn = createComponent(
  () => ({
    flex: 1,
  }),
  'div',
);

export const Toolbar = createComponent(
  props => ({
    display: 'flex',
    position: 'relative',
    extend: {
      condition: props.source === 'inbox',
      style: {
        display: 'block',
        textAlign: 'center',
      },
    },
  }),
  'div',
);

export const ChatToolbar = createComponent(
  () => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 0',
  }),
  'div',
);

export const Button = createComponent(
  props => ({
    flex: 1,
    color: '#fff',
    fontSize: props.theme.font.small,
    background: 'transparent',
    border: 0,
    outline: 0,
    appearance: 'none',
    '-webkit-tap-highlight-color': 'transparent',
    extend: {
      condition: props.source === 'inbox',
      style: {
        margin: ['contact_mobile_confirm', 'chatNow'].includes(props.actionType) ? '0 3px' : '0 19px',
        color: '#95959d',
        lineHeight: 'normal',
        fontWeight: 400,
      },
    },
  }),
  'button',
);

export const ChatButton = createComponent(
  props => ({
    fontSize: props.theme.font.smaller,
    background: 'transparent',
    border: 0,
    outline: 0,
    margin: '0 10px',
  }),
  'button',
  ['onClick', 'no-pan'],
);

export const Badge = createComponent(
  props => ({
    background: props.theme.color.primary,
    position: 'absolute',
    left: '0',
    top: '40px',
    fontSize: props.theme.font.smaller,
    color: '#fff',
    padding: '2px 10px 2px 5px',
    ':before': {
      content: '""',
      position: 'absolute',
      right: '-10px',
      top: 0,
      'border-style': 'solid',
      'border-width': '10px 10px 0 0',
      'border-color': `${props.theme.color.primary} transparent transparent transparent`,
    },
    ':after': {
      content: '""',
      position: 'absolute',
      right: '-10px',
      bottom: 0,
      'border-style': 'solid',
      'border-width': '10px 0 0 10px',
      'border-color': `transparent transparent transparent ${props.theme.color.primary}`,
    },
  }),
  'div',
  ['no-pan'],
);

export const Icon = createComponent(
  props => ({
    width: '44px',
    height: '44px',
    margin: '0 auto 5px auto',
    backgroundSize: 'cover',
    backgroundImage: `url(/assets/mobile/${props.type}${props.buttonSuffix}.${props.imageExt})`,
    '&:hover': {
      backgroundImage: `url(/assets/mobile/${props.type}_hover${props.buttonSuffix}.${props.imageExt})`,
    },
  }),
  'div',
  ['no-pan'],
);

export const ChatIcon = createComponent(
  props => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '18px',
    height: '18px',
    margin: '0 5px 0 0',
    backgroundSize: 'cover',
    backgroundImage: `url(/assets/mobile/${props.type}.png)`,
    ':hover': {
      backgroundImage: `url(/assets/mobile/${props.type}_hover.png)`,
    },
  }),
  'div',
  ['no-pan'],
);

export const BadgeIcon = createComponent(
  props => ({
    display: 'inline-block',
    width: '14px',
    height: '14px',
    verticalAlign: 'middle',
    backgroundSize: 'cover',
    backgroundImage: `url(/assets/premium-icon.png)`,
  }),
  'span',
  ['no-pan'],
);

export const Title = createComponent(
  props => ({
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
    paddingTop: '10px',
    marginTop: 0,
    color: '#fff',
  }),
  'p',
);

export const ChatTitle = createComponent(
  props => ({
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
    marginTop: 0,
  }),
  'p',
);

export const Desc = createComponent(
  props => ({
    color: '#eee',
    textAlign: 'center',
    fontSize: props.theme.font.normal,
    margin: 0,
    paddingBottom: '10px',
    fontWeight: 'normal',
    whiteSpace: 'pre-line',
    lineHeight: '20px',
    ...props.style,
  }),
  'p',
);

export const DescLink = createComponent(
  props => ({
    fontSize: props.theme.font.normal,
    background: 'transparent',
    border: 0,
    outline: 0,
    color: props.theme.color.blue,
    cursor: 'pointer',
  }),
  'button',
  ['onCLick'],
);
