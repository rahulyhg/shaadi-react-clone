import { createComponent } from 'react-fela';

export const Container = createComponent(
  props => ({
    position: 'relative',
    height: '470px',
    '@media (max-height: 480px)': {
      height: '410px',
    },
  }),
  'div',
  ['onClick', 'no-pan'],
);

export const GradientSection = createComponent(
  props => ({
    position: 'absolute',
    bottom: 0,
    width: '100%',
    boxSizing: 'border-box',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.8), rgba(0,0,0,0))',
    padding: '30px 20px 10px 20px',
    height: props.hasPhoto ? 'auto' : '100%',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'flex-end',
  }),
  'div',
);

export const Name = createComponent(
  props => ({
    color: '#fff',
    fontSize: props.theme.font.title,
    marginBottom: '2px',
    overflow: 'hidden',
    'margin-right': '10px',
    'text-overflow': 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  'p',
);

export const Detail = createComponent(
  props => ({
    color: '#fff',
    fontSize: props.theme.font.normal,
    marginTop: 0,
    marginBottom: '5px',
    marginRight: '15px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  'p',
);

export const DetailWrapper = createComponent(
  props => ({
    marginBottom: '10px',
  }),
  'div',
);

export const Details = createComponent(
  props => ({
    marginBottom: '4px',
  }),
  'div',
);

export const DetailColumn = createComponent(
  () => ({
    display: 'inline-block',
    verticalAlign: 'bottom',
    width: '50%',
    marginLeft: '-5px',
  }),
  'div',
);

export const Toolbar = createComponent(
  () => ({
    display: 'flex',
  }),
  'div',
);

export const Button = createComponent(
  props => ({
    flex: 1,
    color: '#fff',
    fontSize: props.theme.font.smaller,
  }),
  'button',
  ['onClick', 'no-pan'],
);

const tagBackgroundUrl = {
  premium: 'url(/assets/premium-tag.png) left top no-repeat',
  premiumplus: 'url(/assets/premium-tag.png) no-repeat left -38px',
  vip: 'url(/assets/premium-tag.png) no-repeat left -98px',
  select: 'url(/assets/premium-tag.png) no-repeat left -68px',
};

export const Badge = createComponent(
  props => ({
    display: `${
      props.tag && (tagBackgroundUrl[props.plan.toLowerCase()] || tagBackgroundUrl[props.tag.toLowerCase()]) ? 'inline-block' : 'none'
    }`,
    position: 'absolute',
    left: '-6px',
    backgroundSize: '110px',
    fontSize: props.theme.font.smaller,
    color: '#fff',
    width: '100px',
    zIndex: 1,
    height: '30px',
    background: `${
      props.plan && props.tag !== 'vip' && props.tag !== 'select'
        ? tagBackgroundUrl[props.plan.toLowerCase()]
        : tagBackgroundUrl[props.tag.toLowerCase()]
    }`,
    extend: {
      condition: !props.position || props.position !== 'top',
      style: {
        top: props.isCard ? '30px' : '60px',
      },
    },
  }),
  'div',
);

export const Icon = createComponent(
  props => ({
    width: '44px',
    height: '44px',
    margin: '0 auto 5px auto',
    backgroundImage: `url(/assets/free/${props.type}.png)`,
    ':hover': {
      backgroundImage: `url(/assets/free/${props.type}-hover.png)`,
    },
  }),
  'div',
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
);

export const DetailIcon = createComponent(
  props => ({
    display: 'inline-block',
    width: '15px',
    height: '10px',
    verticalAlign: 'baseline',
    marginRight: '3px',
    backgroundSize: '15px 10px',
    backgroundImage: `url(/assets/mobile/${props.kind}.png)`,
  }),
  'span',
  ['no-pan'],
);

export const DetailButton = createComponent(
  props => ({
    display: 'inline-block',
    padding: 0,
    outline: 0,
    border: 0,
    fontSize: props.theme.font.small,
    marginRight: '7px',
    verticalAlign: 'middle',
    backgroundColor: 'transparent',
    color: '#fff',
  }),
  'button',
  ['onClick', 'no-pan'],
);

export const DropdownWrapper = createComponent(
  props => ({
    position: 'absolute',
    top: '20px',
    right: '10px',
    color: '#fff',
    zIndex: 1,
  }),
  'div',
  ['no-pan'],
);

export const IconStyles = {
  borderRadius: '50%',
  backgroundColor: 'rgba(0,0,0,0.3)',
  width: '38px',
  height: '38px',
  fontSize: '30px',
  padding: '8px',
  color: '#eee',
};
