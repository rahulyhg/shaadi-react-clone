import { createComponent } from 'react-fela';

export const CloseButton = createComponent(
  props => ({
    // position: 'absolute',
    // right: 0,
    // top: 0,
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 0,
  }),
  'div',
  ['style', 'onClick', 'no-pan'],
);

export const UpgradeCloseButton = createComponent(
  props => ({
    position: 'absolute',
    right: 0,
    top: 0,
  }),
  'div',
  ['style', 'onClick', 'no-pan'],
);

export const Title = createComponent(
  props => ({
    textAlign: 'center',
    fontSize: '16px', // props.theme.font.title,
    opacity: 0.7,
    marginBottom: 0,
  }),
  'h5',
);

export const LockIconWrap = createComponent(
  props => ({
    width: '40px',
    height: '40px',
    background: 'lightgrey',
    margin: '10px auto',
    borderRadius: '40px',
    lineHeight: '57px',
    textAlign: 'center',
  }),
  'div',
);

export const UpgradeBenefitsTitle = createComponent(
  props => ({
    fontWeight: 'bold',
    margin: '20px 0 10px 0',
    opacity: 0.7,
  }),
  'div',
);

export const UpgradeSave = createComponent(props => ({}), 'div');

export const UpgradeSavePercent = createComponent(
  props => ({
    color: props.theme.color.green,
  }),
  'span',
);

export const MobileIcon = createComponent(
  props => ({
    display: 'inline-block',
    marginRight: '5px',
    verticalAlign: 'middle',
    width: `${props.size || 18}px`,
    height: `${props.size || 18}px`,
    backgroundSize: 'cover',
    backgroundImage: `url(/assets/mobile/${props.kind}.png)`,
  }),
  'div',
  ['style'],
);

export const Description = createComponent(
  props => ({
    display: 'flex',
  }),
  'div',
  ['style'],
);

export const CommonInterestsIcon = createComponent(
  props => ({
    display: 'inline-block',
    marginRight: '5px',
    verticalAlign: 'middle',
    width: '20px',
    height: '20px',
    backgroundSize: 'cover',
    backgroundImage: `url(/assets/mobile/${props.kind}.png)`,
  }),
  'div',
  ['style'],
);

export const Flex = createComponent(
  props => ({
    flex: 1,
  }),
  'div',
);

export const ViewContactMobile = createComponent(
  props => ({
    display: 'flex',
    alignItems: 'center',
  }),
  'div',
);

export const AlbumContainer = createComponent(
  props => ({
    height: '100%',
    background: '#000',
    display: 'flex',
    'justify-content': 'center',
    'flex-direction': 'column',
  }),
  'div',
);

export const ConnectIcon = createComponent(
  props => ({
    width: '44px',
    height: '44px',
    margin: '0 auto 5px auto',
    backgroundSize: 'cover',
    backgroundImage: `url(/assets/mobile/send_interest.png)`,
  }),
  'div',
);

export const BlueText = createComponent(
  props => ({
    color: props.theme.color.blue,
  }),
  'span',
);

export const MisuseMessage = createComponent(
  props => ({
    display: 'flex',
    background: '#eaeaea',
    padding: '10px',
  }),
  'div',
);

export const ReportMisuseIcon = createComponent(
  props => ({
    width: '32px',
    height: '33px',
    marginRight: '10px',
    backgroundImage: 'url(/assets/mobile/report_misuse_new.png)',
    backgroundSize: '32px',
  }),
  'div',
);

export const ReportOptions = createComponent(
  props => ({
    padding: '0 10px',
  }),
  'div',
);

export const Reason = createComponent(
  props => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '10px',
  }),
  'div',
);

export const ReasonInput = createComponent(
  props => ({
    flex: 1,
    padding: '0',
    border: 0,
    outline: 0,
    marginTop: '10px',
    marginBottom: '10px',
    resize: 'none',
    '::placeholder': {
      color: props.error ? 'red' : 'inherit',
    },
  }),
  'textarea',
  ['placeholder', 'onChange'],
);

export const ReasonActions = createComponent(
  props => ({
    padding: '0 10px',
    display: 'flex',
    'justify-content': 'space-between',
  }),
  'div',
);

export const ReportMisuseWrapper = createComponent(
  props => ({
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  }),
  'div',
);

export const ReportMisuseConfigmIcon = createComponent(
  props => ({
    width: '32px',
    height: '30px',
    backgroundImage: 'url(/assets/mobile/error-triangle.svg)',
    backgroundSize: '32px',
  }),
  'div',
);

export const ReportMisuseConfigmIconWrapper = createComponent(
  props => ({
    height: '100%',
    display: 'flex',
    'justify-content': 'center',
    'flex-direction': 'row',
  }),
  'div',
);
export const FilterList = createComponent(
  props => ({
    borderRadius: '3px',
    '& div:first-child': {
      paddingTop: '12px',
    },
    '> div': {
      padding: '0 24px 12px 24px',
    },
    '> div > p:focus': {
      outline: 0,
    },
  }),
  'div',
);
