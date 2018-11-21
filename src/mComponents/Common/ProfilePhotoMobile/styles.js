import React from 'react';
import { createComponent } from 'react-fela';
import Link from '../../Common/Link';
import LoadingSpinner from '../../../components/Spinner';

export const Spinner = createComponent(
  ({ height }) => ({
    zIndex: -1,
    width: '100%',
    height: `${height}px`,
    position: 'relative',
  }),
  props => (
    <div {...props}>
      <LoadingSpinner isVisible />
    </div>
  ),
);

export const Photo = createComponent(
  props => ({
    display: 'block',
    width: '100%',
    height: '470px',
    backgroundSize: 'cover',
    backgroundImage: `url(${props.photo})`,
    '@media (max-height: 480px)': {
      height: '410px',
    },
    extend: {
      condition: props.shape === 'round',
      style: {
        borderRadius: '50%',
        width: '123px',
        height: '123px',
        position: 'relative',
        border: '#dfe0e3 1px solid',
        '@media (max-height: 480px)': {
          height: '123px',
        },
      },
    },
  }),
  'div',
  ['style', 'onClick'],
);
export const Container = createComponent(
  props => ({
    position: 'relative',
    width: '100%',
    zIndex: props.hasPhoto ? 0 : 1,
    height: props.hasPhoto ? 'auto' : '290px',
    overflow: 'hidden',
  }),
  'div',
);
export const NoPhotoRound = createComponent(
  props => ({
    width: '125px',
    height: '124px',
    borderRadius: '50%',
    overflow: 'hidden',
    background: 'transparent',
    position: 'absolute',
    top: 0,
    color: '#00bcd5',
    fontSize: '10px',
    fontWeight: 300,
    lineHeight: '12px',
    ...props.style,
  }),
  'div',
);
export const SemiCircle = createComponent(
  props => ({
    position: 'absolute',
    top: '95px',
    left: '0',
    display: 'inline-block',
    backgroundColor: '#f1f1f2',
    height: '44px',
    width: '131px',
    paddingTop: '4px',
  }),
  'div',
  ['onClick'],
);
export const PhotoCount = createComponent(
  props => ({
    position: 'absolute',
    right: 0,
    top: '70px',
    outline: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '4px 12px',
    'border-radius': '3px 0 0 3px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    'border-right': '0',
    color: '#eee',
    zIndex: 1,
    fontSize: props.theme.font.medium,
  }),
  'button',
  ['onClick', 'no-pan'],
);

export const Overlay = createComponent(
  props => ({
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'start',
    paddingTop: '125px',
    justifyContent: 'center',
    '@media (max-height: 480px)': {
      paddingTop: '75px',
    },
  }),
  'div',
);

export const LockIcon = createComponent(
  props => ({
    position: 'relative',
    backgroundImage: 'url(/assets/mobile/lock_grayshadow.png)',
    backgroundSize: 'cover',
    width: '50px',
    height: '50px',
    margin: '0 auto 5px auto',
  }),
  'div',
  ['no-pan'],
);

export const CameraIcon = createComponent(
  props => ({
    display: 'inline-block',
    'vertical-align': 'middle',
    width: '20px',
    height: '15px',
    position: 'relative',
    backgroundImage: 'url(/assets/mobile/photo_album@2x.png)',
    backgroundSize: 'cover',
    margin: '-4px 6px 0 0',
  }),
  'div',
  ['no-pan'],
);

export const LockText = createComponent(
  props => ({
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px',
    color: props.dark ? '#444' : '#fff',
    fontSize: props.theme.font.normal,
  }),
  'div',
);

export const HighZindex = createComponent(
  props => ({
    zIndex: 100,
  }),
  'div',
);
export const UpgradeLink = createComponent(
  props => ({
    fontSize: props.theme.font.small,
    textAlign: 'center',
    display: 'block',
    marginTop: '5px',
    color: '#bbb',
    cursor: 'pointer',
    background: 'transparent',
    border: '0',
    outline: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0',
  }),
  Link,
  ['to', 'isExternal'],
);

export const RequestPhotoButton = createComponent(
  props => ({
    fontSize: props.theme.font.small,
    backgroundColor: props.theme.color.blue,
    borderRadius: '2px',
    display: 'inline-block',
    color: '#fff',
    padding: '8px 12px',
    border: 0,
    outline: 0,
  }),
  'button',
  ['onClick', 'no-pan'],
);

export const DefaultImage = createComponent(
  props => ({
    backgroundImage: `url(/assets/mobile/${props.gender.toLowerCase()}_results.png)`,
    backgroundSize: 'cover',
    width: '80px',
    height: '80px',
    margin: '0 auto 5px auto',
  }),
  'div',
);
