/* global window */
import React from 'react';
import PropTypes from '../../../PropTypes';
import {
  Photo,
  Overlay,
  PhotoCount,
  Container,
  LockIcon,
  LockText,
  CameraIcon,
  UpgradeLink,
  DefaultImage,
  RequestPhotoButton,
  HighZindex,
  NoPhotoRound,
  SemiCircle,
  Spinner,
} from './styles';

import PhotoError from './PhotoError';
import LazyLoadImage from '../LazyLoadImage';

const CARD_HEIGHT = 470;
const PREFETCH_COUNT = 5;
const SPINNER_NODE = <Spinner height={CARD_HEIGHT - 100} />;

/* eslint-disable prettier/prettier */
class ProfilePhotoMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAction = key => event => {
    switch (key) {
      case 'none':
        break;
      default: {
        event.stopPropagation();
        this.props.onAction(key);
      }
    }
  };
  avatarShapeMap = {
    inbox: 'round',
    default: '',
  };
  renderPhoto() {
    const { photo, albumStatus, source, lazyLoadImages } = this.props;
    if (
      source !== 'inbox' &&
      ['noPhoto', 'requestPhoto', 'photoRequestSent', 'photoUnderScreening', 'photoComingSoon'].includes(albumStatus)
    ) {
      return <div style={{ height: '470px' }} />;
    }
    const photoActionKey = {
      inbox: 'none',
      default: 'show_album_mobile',
    };

    const ProfilePhoto = ({ src, ...props }) => (
      <Photo
        photo={src}
        shape={this.avatarShapeMap[source]}
        onClick={this.onAction(photoActionKey[source])}
        {...props}
      />
    );
    
    if(!lazyLoadImages) {
      return <ProfilePhoto src={photo} />;
    }

    return (
      <LazyLoadImage
        src={photo}
        offset={CARD_HEIGHT * PREFETCH_COUNT}
        delay={100}
        placeholder={SPINNER_NODE}
        image={({ error, src }) => error
          ? <PhotoError message={error.message} height={CARD_HEIGHT - 100} />
          : <ProfilePhoto src={src} />}
      />
    );
  }

  renderPhotoCount = () => {
    const { photosLoading, photoCount, albumStatus, source } = this.props;

    if (
      ['inbox'].includes(source) ||
      photosLoading ||
      !photoCount ||
      [
        'visibleOnAccept',
        'visibleOnUpgrade',
        'noPhoto',
        'requestPhoto',
        'photoRequestSent',
        'photoUnderScreening',
        'photoComingSoon',
      ].includes(albumStatus)
    ) {
      return null;
    }
    return (
      <PhotoCount no-pan="true" onClick={this.onAction('show_album_mobile')}>
        <CameraIcon no-pan="true" />
        {photoCount}
      </PhotoCount>
    );
  };

  renderVisibleOnAccept = () => {
    const { albumStatus } = this.props;
    if (albumStatus !== 'visibleOnAccept') {
      return null;
    }
    return (
      <Overlay>
        <div>
          <LockIcon />
          <LockText>Visible on Accept</LockText>
        </div>
      </Overlay>
    );
  };

  renderVisibleOnUpgrade = () => {
    const { albumStatus } = this.props;
    if (albumStatus !== 'visibleOnUpgrade') {
      return null;
    }
    return (
      <Overlay>
        <div>
          <LockIcon />
          <LockText>Visible to Premium Members</LockText>
          <UpgradeLink to="/payment" isExternal>
            View Plans {'>'}
          </UpgradeLink>
        </div>
      </Overlay>
    );
  };

  renderNoPhoto = () => {
    const { albumStatus, gender, source } = this.props;
    if (albumStatus !== 'noPhoto') {
      return null;
    }
    if (source === 'inbox') {
      return (
        <NoPhotoRound>
          <SemiCircle onClick={this.onAction('request_photo_mobile')}>
            Request a<br />Photo
          </SemiCircle>
        </NoPhotoRound>
      );
    }
    return (
      <Overlay>
        <HighZindex>
          <DefaultImage gender={gender} />
          <LockText>No Photo Added</LockText>
          <RequestPhotoButton onClick={this.onAction('request_photo_mobile')}>Request a Photo</RequestPhotoButton>
        </HighZindex>
      </Overlay>
    );
  };

  renderRequestPassword = () => {
    const { albumStatus } = this.props;
    if (albumStatus !== 'requestPassword') {
      return null;
    }
    return (
      <Overlay>
        <div>
          <LockIcon />
          <LockText>Password Protected</LockText>
          <RequestPhotoButton onClick={this.onAction('request_password_mobile')}>Request Photo Password</RequestPhotoButton>
        </div>
      </Overlay>
    );
  };

  renderPhotoRequested = () => {
    const { albumStatus, gender, source } = this.props;
    if (albumStatus !== 'photoRequestSent') {
      return null;
    }
    if (source === 'inbox') {
      return (
        <NoPhotoRound style={{ color: '#51505d' }}>
          <SemiCircle>
            Photo request<br />sent
          </SemiCircle>
        </NoPhotoRound>
      );
    }
    return (
      <Overlay>
        <div>
          <DefaultImage gender={gender} />
          <LockText>Photo Requested</LockText>
        </div>
      </Overlay>
    );
  };

  renderPhotoUnderScreening = () => {
    const { albumStatus, gender } = this.props;
    if (albumStatus !== 'photoUnderScreening') {
      return null;
    }
    return (
      <Overlay>
        <div>
          <DefaultImage gender={gender} />
          <LockText>Photo under screening</LockText>
        </div>
      </Overlay>
    );
  };

  renderPhotoComingSoon = () => {
    const { albumStatus, gender } = this.props;
    if (albumStatus !== 'photoComingSoon') {
      return null;
    }
    return (
      <Overlay>
        <div>
          <DefaultImage gender={gender} />
          <LockText>Photo coming soon</LockText>
        </div>
      </Overlay>
    );
  };

  renderPasswordRequested = () => {
    const { albumStatus } = this.props;
    if (albumStatus !== 'passwordRequested') {
      return null;
    }
    return (
      <Overlay>
        <div>
          <LockText>Password Requested</LockText>
        </div>
      </Overlay>
    );
  };
  renderRound() {
    return (
      <Container hasPhoto>
        {this.renderPhoto()}
        {this.renderNoPhoto()}
        {this.renderPhotoRequested()}
      </Container>
    );
  }
  renderDefault() {
    const hasPhoto = ['noPhoto', 'photoComingSoon', 'photoUnderScreening', 'photoRequestSent'].indexOf(this.props.albumStatus) === -1;
    return (
      <Container hasPhoto={hasPhoto}>
        {this.renderPhoto()}
        {this.renderPhotoCount()}
        {this.renderVisibleOnAccept()}
        {this.renderVisibleOnUpgrade()}
        {this.renderNoPhoto()}
        {this.renderRequestPassword()}
        {this.renderPasswordRequested()}
        {this.renderPhotoRequested()}
        {this.renderPhotoUnderScreening()}
        {this.renderPhotoComingSoon()}
      </Container>
    );
  }

  render() {
    switch (this.avatarShapeMap[this.props.source]) {
      case 'round':
        return this.renderRound();
      default:
        return this.renderDefault();
    }
  }
}

ProfilePhotoMobile.defaultProps = {
  photo: 'http://img1.shaadi.com//2017/11/27/XSH52160341-85a61b-female.jpg',
  photoCount: 0,
  photosLoading: false,
  albumStatus: 'default',
  onAction: () => {},
  source: 'default',
  lazyLoadImages: false,
};

ProfilePhotoMobile.propTypes = {
  onAction: PropTypes.func.isRequired,
  photo: PropTypes.string.isRequired,
  photoCount: PropTypes.number,
  photosLoading: PropTypes.bool,
  gender: PropTypes.oneOf(['Male', 'Female']).isRequired,
  albumStatus: PropTypes.oneOf([
    'default',
    'noPhoto',
    'requestPassword',
    'visibleOnAccept',
    'passwordRequested',
    'photoComingSoon',
    'photoRequestSent',
    'photoUnderScreening',
    'visibleOnUpgrade',
  ]),
  source: PropTypes.string,
  lazyLoadImages: PropTypes.bool,
};

export default ProfilePhotoMobile;
