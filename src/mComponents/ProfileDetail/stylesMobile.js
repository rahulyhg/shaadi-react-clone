import { createComponent } from 'react-fela';

export const Content = createComponent(
  () => ({
    margin: '10px',
    'font-size': '14px',
  }),
  'div',
);

export const ListItem = createComponent(
  props => ({
    backgroundColor: '#fff',
    padding: '10px',
    listStyle: 'none',
    margin: 0,
  }),
  'div',
);
const spriteIcons = {
  male_small: '2px -542px',
  female_small: '-1px -235px',
  ring: '0 -3295px',
  location: '0 -3094px',
  profession: '0 -4154px',
  non_veg: '0 -5173px',
  veg: '0 -1793px',
  drinks: '0 -148px',
  body_type: '4px -1px',
  discover_connect: '0 -123px',
  profile_religion: '0 -970px',
  profile_community: '0 -807px',
  language: '0 -451px',
  edu_qualification: '0 -177px',
  income: '0 -323px',
  sports: '0 -2772px',
  profile_manglik: '0 -1999px',
  profile_rashi: '0 -2066px',
  profile_nakshatra: '0 -2000px',
  interests: '0 -1286px',
  cuisines: '0 -76px',
  books: '0 -48px',
  movies: '0 -475px',
  music: '0 -1464px',
};

const backgroundSizes = {
  body_type: '30px',
  interests: '40px',
  cuisines: '40px',
  books: '40px',
  movies: '40px',
  sports: '40px',
  music: '40px',
};

export const Icon = createComponent(
  props => ({
    display: 'inline-block',
    width: '20px',
    height: '20px',
    marginRight: '20px',
    verticalAlign: 'middle',
    backgroundRepeat: 'no-repeat',
    background: `url('https://img2.shaadi.com/assests/2018/images/profile-icons-1x-sprite.svg') ${spriteIcons[props.icon]}`,
    backgroundSize: `${backgroundSizes[props.icon || 'default']} !important`,
  }),
  'span',
);

export const Desc = createComponent(
  props => ({
    display: 'inline-block',
    fontSize: props.theme.font.normal,
  }),
  'span',
);

export const SectionTitle = createComponent(
  props => ({
    color: props.theme.color.primary,
    fontSize: props.theme.font.title,
    fontWeight: 'normal',
    margin: '20px 0 10px 20px',
    textTransform: 'capitalize',
  }),
  'h3',
);

export const CountWrapper = createComponent(
  props => ({
    margin: '0 7px 0 0',
    padding: '0 10px',
    'text-align': 'center',
    background: 'url(/assets/matches-point.gif) repeat-x left top',
    position: 'relative',
    ' span': {
      display: 'inline-block',
      height: '34px',
      background: '#e7e5e3',
      'text-align': 'center',
      padding: '0 15px',
      'border-radius': '25px',
      color: '#72727d',
      font: '14px/34px arial',
    },
  }),
  'div',
);

export const PreferenceHeader = createComponent(
  props => ({
    display: 'flex',
    'align-items': 'center',
    justifyContent: 'space-between',
    'margin-bottom': '15px',
  }),
  'div',
);

export const PhotoWrapper = createComponent(
  props => ({
    textAlign: 'center',
  }),
  'div',
);

export const Photo = createComponent(
  props => ({
    display: 'inline-block',
    width: '60px',
    height: '60px',
    'background-position': 'center top',
    'box-sizing': 'border-box',
    position: 'relative',
    'border-radius': '60px',
    border: '2px solid #e1e1e1',
    overflow: 'hidden',
    'background-repeat': 'no-repeat',
    'background-size': 'cover',
  }),
  'span',
);

export const PhotoCaption = createComponent(
  props => ({
    fontSize: props.theme.font.small,
    color: '#72727d',
    margin: '11px 0 0',
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
    'text-align': 'center',
  }),
  'div',
);

export const PreferenceList = createComponent(
  props => ({
    padding: '0',
    margin: '0',
    'list-style': 'none',
    'border-top': '1px solid #f3f2f1',
  }),
  'ul',
);

export const PreferenceListItem = createComponent(
  props => ({
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    padding: '15px 10px',
    'border-bottom': '1px solid #f3f2f1',
    '> div': {
      flex: '1',
    },
  }),
  'li',
);

export const PreferenceListItemInfo = createComponent(
  props => ({
    flex: 1,
    overflow: 'hidden',
  }),
  'div',
);

export const Term = createComponent(
  props => ({
    color: 'grey',
    fontSize: props.theme.font.small,
    marginBottom: '10px',
  }),
  'div',
);

export const PrefDesc = createComponent(
  props => ({
    display: 'flex',
  }),
  'div',
);

export const PrefDescText = createComponent(
  props => ({
    flex: 1,
    fontWeight: 'normal',
    overflow: 'hidden',
    whiteSpace: 'pre-line',
  }),
  'div',
);

export const RemarkBox = createComponent(
  props => ({
    flex: '0 !important',
    display: 'inline-block',
    'text-align': 'center',
    width: '120px',
  }),
  'div',
);

export const RemarkIcon = createComponent(
  props => ({
    display: 'inline-block',
    width: '22px',
    height: '22px',
    background: props.isMatch
      ? 'url(https://img2.shaadi.com/assests/2018/images/profile-icons-1x-sprite.svg) no-repeat 0 -1105px'
      : 'url(https://img2.shaadi.com/assests/2018/images/profile-icons-1x-sprite.svg) no-repeat 0 -349px',
  }),
  'span',
);

export const MoreBtn = createComponent(
  props => ({
    display: 'inline-block',
    'background-color': 'transparent',
    border: '0',
    'background-repeat': 'no-repeat',
    'background-position': 'right',
    padding: '0',
    'padding-right': '10px',
    color: '#00bcd5',
    'background-image': 'url(/assets/more.gif)',
    outline: '0',
  }),
  'div',
  ['onClick', 'no-pan'],
);

export const CountText = createComponent(
  props => ({
    fontSize: props.theme.font.smaller,
    background: '#eee',
    padding: '7px',
    width: '90px',
    display: 'inline-block',
    borderRadius: '50px',
    whiteSpace: 'normal',
    color: '#333',
    margin: '-50% 0 0',
  }),
  'span',
);

export const TooltipStyles = { width: '18px', height: '18px', verticalAlign: 'middle', marginLeft: '7px', fillOpacity: 0.7 };
