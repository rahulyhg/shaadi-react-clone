/* global window */
import React from 'react';
import LazyLoad from 'react-lazyload';
import get from 'lodash/get';
import PropTypes from '../../../PropTypes';
import Tooltip from '../../Common/Tooltip';
import SliderNav from './SliderNav';
import Spinner from '../Spinner';
import PremiumBadge from './PremiumBadge';
import { shouldShowAlbum } from '../../../utils';
import s from './styles';

class ProfilePhoto extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePhotoIndex: 0,
    };
    this.slideshowInterval = null;
    this.popup = null;
    this.onSlideNavClick = this.onSlideNavClick.bind(this);
    this.startSlideshow = this.startSlideshow.bind(this);
    this.stopSlideshow = this.stopSlideshow.bind(this);

    this.renderPhotoPasswordSection = this.renderPhotoPasswordSection.bind(this);
    this.renderVisibeOnAcceptSection = this.renderVisibeOnAcceptSection.bind(this);
    this.renderVisibeOnUpgradeSection = this.renderVisibeOnUpgradeSection.bind(this);
    this.renderUploadPhotoSlide = this.renderUploadPhotoSlide.bind(this);
    this.renderInboxCard = this.renderInboxCard.bind(this);
    this.daTracking = this.daTracking.bind(this);
    this.onRequestPassword = e => {
      e.stopPropagation();
      this.props.onRequestPassword();
    };
    this.onRequestPhoto = e => {
      e.stopPropagation();
      this.props.onRequestPhoto();
    };
    this.onShowWatermarkInfo = e => {
      e.stopPropagation();
      this.props.onShowWatermarkInfo();
    };
    this.onFullPhotoClick = this.onFullPhotoClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.uid !== nextProps.uid) {
      this.popup = null;
      this.setState({ activePhotoIndex: 0 });
    }
    if (nextProps.isPlaying) {
      this.startSlideshow();
    } else if (!nextProps.isPlaying) {
      this.stopSlideshow();
    }
  }

  componentWillUnmount() {
    this.stopSlideshow();
  }

  onFullPhotoClick() {
    this.daTracking();
    if (this.popup !== null && this.popup.closed) {
      this.popup = null;
    }
    if (this.popup === null) {
      if (this.props.onShowPhotoClick) {
        this.props.onShowPhotoClick();
      } else {
        let width = 582;
        let height = 750;
        if (this.props.type === 'profile') {
          width = 750;
          height = 582;
        }
        const albumUrl =
          this.state.activePhotoIndex === 0 ? this.props.albumUrl : `${this.props.albumUrl}/index/${this.state.activePhotoIndex}`;
        const left = ((window.screen.availWidth || 900) - width) / 2;
        const top = ((window.screen.availHeight || 800) - height) / 2;
        this.popup = window.open(
          albumUrl,
          `popup_${this.props.uid}`,
          `height=${height},width=${width},scrollbars=yes,left=${left},top=${top}`,
        );
      }
    } else {
      this.popup.focus();
    }
  }

  onTooltipClose() {
    const isTooltipVisible = false;
    this.setState({ isTooltipVisible });
    this.props.onTooltipClose();
  }

  onSlideNavClick(slug) {
    this.daTracking();
    const { photos } = this.props;
    const { activePhotoIndex } = this.state;
    if (slug === 'prev' && activePhotoIndex > 0) {
      this.setState({ activePhotoIndex: activePhotoIndex - 1 });
    } else if (slug === 'next' && activePhotoIndex < photos.length - 1) {
      this.setState({ activePhotoIndex: activePhotoIndex + 1 });
    } else if (slug === 'next' && activePhotoIndex === photos.length - 1) {
      this.setState({ activePhotoIndex: 0 });
    } else if (slug === 'prev' && activePhotoIndex === 0) {
      this.setState({ activePhotoIndex: photos.length - 1 });
    }
  }

  daTracking(event = 'album_view') {
    this.props.daTracking && this.props.daTracking(event, { uid: this.props.uid });
  }

  startSlideshow() {
    if (this.props.type !== 'list' || !this.props.settings.hasUploadedPhoto) {
      return;
    }
    if (!this.slideshowInterval) {
      this.slideshowInterval = setInterval(() => {
        const { photos } = this.props;
        const { activePhotoIndex } = this.state;
        const nextPhotoIndex = activePhotoIndex < photos.length - 1 ? activePhotoIndex + 1 : 0;
        this.setState({ activePhotoIndex: nextPhotoIndex });
      }, 1600);
    }
  }

  stopSlideshow() {
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
      this.slideshowInterval = null;
    }
  }

  openProfile = () => {
    window.open(this.props.profileUrl, '_blank');
  };

  renderPhoto(source = 'default') {
    const canViewAlbumLink = this.props.type !== 'grid' && this.props.flags.albumStatus === 'default';
    const imgProps = {};
    if (canViewAlbumLink || this.props.type === 'similarCard') {
      imgProps.onClick = (this.props.type === 'similarCard' && this.props.profileUrl && this.openProfile) || this.onFullPhotoClick;
      imgProps.isClickable = true;
    }
    const premiumTagExperiment = get(this.props.settings, ['experiments', 'premium_tag', 'bucket'], 'A');
    switch (source) {
      case 'similarProfile':
        return (
          <div>
            <s.ImgInbox {...imgProps} status={this.props.flags.albumStatus} type={this.props.type} src={this.props.photos[0]}>
              {['Premium', 'PremiumPlus', 'Select'].includes(this.props.flags.membershipLevel) &&
                this.props.badgeType === 'crown' && (
                  <PremiumBadge
                    membershipTags={this.props.flags.membershipTags}
                    bucket={premiumTagExperiment}
                    membershipLevel={this.props.flags.membershipLevel}
                    isVisible
                    badgeType={this.props.badgeType}
                  />
                )}
            </s.ImgInbox>
          </div>
        );
      case 'inbox':
        return (
          <div>
            <s.ImgInbox {...imgProps} status={this.props.flags.albumStatus} type={this.props.type} src={this.props.photos[0]}>
              {this.props.flags.albumStatus === 'visibleOnAccept' && this.renderVisibeOnAcceptSection()}
              {this.props.flags.albumStatus === 'visibleOnUpgrade' && this.renderVisibeOnUpgradeSection()}
              {this.props.flags.albumStatus === 'noPhoto' && <s.NoPhotoLink isVisible onClick={this.onRequestPhoto} />}
            </s.ImgInbox>
            {this.props.loading && <Spinner isVisible />}
          </div>
        );
      case 'contactSummary':
        return (
          <s.ContactSummaryWrapper>
            <s.ImgContactSummary
              {...imgProps}
              title={this.props.imgTitle}
              status={this.props.flags.albumStatus}
              type={this.props.type}
              src={this.props.photos[0]}
            >
              {this.props.flags.albumStatus === 'visibleOnUpgrade' && this.renderVisibeOnUpgradeSection()}
              {this.props.flags.albumStatus === 'noPhoto' && <s.NoPhotoLink isVisible onClick={this.onRequestPhoto} />}
            </s.ImgContactSummary>
            {this.props.loading && <Spinner isVisible />}
          </s.ContactSummaryWrapper>
        );
      case 'profile':
      default:
        return (
          <s.Img
            {...imgProps}
            status={this.props.flags.albumStatus}
            type={this.props.type}
            src={this.props.photos[this.state.activePhotoIndex]}
            showSpotLight={this.props.showSpotLight}
          />
        );
    }
  }
  renderPhotoPasswordSection() {
    return (
      <s.RequestPhotoWrapper onClick={this.onRequestPassword} isVisible type={this.props.type}>
        <s.LockIcon type={this.props.type} />
        <s.RequestPhotoText type={this.props.type} isRequestSent={this.props.flags.albumStatus === 'passwordRequested'}>
          {this.props.flags.albumStatus === 'passwordRequested' ? 'Password Requested' : 'Request Photo Password'}
        </s.RequestPhotoText>
      </s.RequestPhotoWrapper>
    );
  }

  renderVisibeOnAcceptSection() {
    const visibleOnAcceptHtml = (this.props.type === 'profile' && (
      <s.VisibleOnAcceptWrapperProfile isVisible>
        <s.LockIconProfile source="visibeonaccept" />
        <s.VisibeOnUpgradeTextProfile source="visibeonaccept">Visible on Accept</s.VisibeOnUpgradeTextProfile>
      </s.VisibleOnAcceptWrapperProfile>
    )) || (
      <s.VisibleOnAcceptWrapper isVisible>
        <s.LockIconList type={this.props.type} source="visibeonaccept" />
        <s.VisibeOnUpgradeText type={this.props.type} source="visibeonaccept">
          Visible on Accept
        </s.VisibeOnUpgradeText>
      </s.VisibleOnAcceptWrapper>
    );

    return visibleOnAcceptHtml;
  }

  renderVisibeOnUpgradeSection() {
    const onClickFunc = e => {
      e.stopPropagation();
      window.open(`${this.props.wwwBaseUrl}/payment?source=photo-view-upgrade`, '_blank');
    };

    const onUpgradeHtml = (this.props.type === 'profile' && (
      <s.VisibleOnAcceptWrapperProfile isVisible>
        <s.LockIconProfile source="visibeonupgrade" onClick={onClickFunc} />
        <s.VisibeOnUpgradeTextProfile source="visibeonupgrade" onClick={onClickFunc}>
          Visible to Premium Members
        </s.VisibeOnUpgradeTextProfile>
        <s.ViewPlanProfile premiumCarousel={this.props.premiumCarousel} onClick={onClickFunc}>
          View Plans
        </s.ViewPlanProfile>
      </s.VisibleOnAcceptWrapperProfile>
    )) || (
      <s.VisibleOnAcceptWrapper isVisible>
        <s.LockIconList type={this.props.type} source="visibeonupgrade" onClick={onClickFunc} />
        <s.VisibeOnUpgradeText type={this.props.type} source="visibeonupgrade" onClick={onClickFunc}>
          Visible to<br /> Premium Members
        </s.VisibeOnUpgradeText>
        <s.ViewPlan premiumCarousel={this.props.premiumCarousel} onClick={onClickFunc}>
          View Plans
        </s.ViewPlan>
      </s.VisibleOnAcceptWrapper>
    );

    return onUpgradeHtml;
  }

  renderUploadPhotoSlide() {
    if (this.props.type === 'profile') {
      return (
        <s.UploadPhoto type={this.props.type} isVisible>
          <s.UnhideText>Unhide Album?</s.UnhideText>
          <s.UploadPrompt type="profile">
            In the common interest of members,
            <br />
            Please upload your photo – 100% Privacy
            <br />
            options available.
          </s.UploadPrompt>
          <s.UploadBtn type="profile" to="/my-shaadi/photo/advance" isExternal>
            Upload now
          </s.UploadBtn>
        </s.UploadPhoto>
      );
    }
    return (
      <s.UploadPhoto type={this.props.type} style={{ zIndex: 1 }} isVisible>
        <s.UploadPrompt type={this.props.type}>Upload your photo to view this Album</s.UploadPrompt>
        <s.UploadBtn onClick={e => e.stopPropagation()} to="/my-shaadi/photo/advance" isExternal>
          Upload now
        </s.UploadBtn>
      </s.UploadPhoto>
    );
  }
  renderInboxCard(source = 'inbox') {
    const { albumStatus } = this.props.flags;
    const statusTextMap = {
      photoRequestSent: 'Photo Request Sent',
      noPhoto: 'Request a Photo',
    };
    const type = ['FeaturedCard', 'inboxCard'].includes(source) ? 'inbox' : source === 'similarCard' ? 'similarProfile' : '';
    return (
      <s.ProfilePhoto type={this.props.type}>
        {this.props.hasMore && (
          <s.PhotoOverlay>
            <s.PhotoOverlayCopy>
              <s.PhotoOverlayCount>+{this.props.count - 20}</s.PhotoOverlayCount>
              more
            </s.PhotoOverlayCopy>
          </s.PhotoOverlay>
        )}
        <s.SlidesWrapper>
          {this.renderPhoto(type)}

          {!['FeaturedCard'].includes(source) &&
            ['photoRequestSent', 'noPhoto'].includes(albumStatus) && (
              <s.RequestInfo isVisible source="inbox" onClick={this.onRequestPhoto} isClickable={albumStatus === 'noPhoto'}>
                {statusTextMap[albumStatus]}
              </s.RequestInfo>
            )}

          <Tooltip isVisible={this.props.isTooltipVisible} offset={[0, 0]} tooltip={this.props.tooltip} onClose={this.props.onTooltipClose}>
            <s.Empty />
          </Tooltip>
        </s.SlidesWrapper>
      </s.ProfilePhoto>
    );
  }

  renderContactSummaryCard() {
    return (
      <s.ProfilePhotoContactSummary type={this.props.type}>
        <s.SlidesWrapper>
          {this.renderPhoto('contactSummary')}

          <Tooltip
            isVisible={this.props.isTooltipVisible}
            offset={[100, -30]}
            tooltip={this.props.tooltip}
            onClose={this.props.onTooltipClose}
          >
            <s.Empty />
          </Tooltip>
        </s.SlidesWrapper>
      </s.ProfilePhotoContactSummary>
    );
  }

  render() {
    const status = this.props.flags.albumStatus;
    const { activePhotoIndex } = this.state;
    const isNavVisible = this.props.photos.length > 1 && status === 'default' && !this.props.isCarousel;
    const showUploadPhotoSlide =
      !shouldShowAlbum(this.props.settings, this.props.flags.connectionStatus) && this.props.photos.length > 1 && activePhotoIndex > 0;
    const experiments = this.props.settings.experiments || {};
    const premiumTagExperiment = (experiments.premium_tag && experiments.premium_tag.bucket) || 'A';

    switch (this.props.type) {
      case 'FeaturedCard':
      case 'similarCard':
      case 'inboxCard': {
        return this.renderInboxCard(this.props.type);
      }
      case 'contactSummaryCard': {
        return this.renderContactSummaryCard();
      }
      // no default
    }

    return (
      <s.ProfilePhoto
        onMouseEnter={this.stopSlideshow}
        onMouseLeave={this.startSlideshow}
        type={this.props.type}
        isNavVisible={isNavVisible}
        onClick={
          this.props.profileUrl
            ? () => {
                if (this.props.type === 'grid') window.open((this.props.hasMore && this.props.listUrl) || this.props.profileUrl, '_blank');
              }
            : null
        }
      >
        {this.props.hasMore && (
          <s.PhotoOverlay>
            <s.PhotoOverlayCopy>
              <s.PhotoOverlayCount>+{this.props.count - 20}</s.PhotoOverlayCount>
              more
            </s.PhotoOverlayCopy>
          </s.PhotoOverlay>
        )}
        <s.SlidesWrapper>
          <s.Slides
            type={this.props.type}
            plan={this.props.flags.membershipLevel}
            tag={this.props.flags.membershipTags}
            experiment={premiumTagExperiment}
            showSpotLight={this.props.showSpotLight}
            isHovered={this.props.isHovered}
          >
            <LazyLoad once height={190} offset={200} placeholder={<Spinner isVisible style={{ width: 190 }} />}>
              {this.renderPhoto(this.props.type)}
            </LazyLoad>

            {showUploadPhotoSlide && this.renderUploadPhotoSlide()}

            {isNavVisible && (
              <SliderNav
                type={this.props.type}
                onSlideNavClick={this.onSlideNavClick}
                activePhotoIndex={activePhotoIndex}
                albumLength={this.props.photos.length}
              />
            )}

            {this.props.type === 'grid' && <s.CaptionBg isVisible />}

            {this.props.loading && <Spinner isVisible />}
          </s.Slides>

          {!this.props.loading &&
            !this.props.hasMore &&
            !this.props.flags.isMaskedProfile && (
              <PremiumBadge
                membershipTags={this.props.flags.membershipTags}
                bucket={premiumTagExperiment}
                membershipLevel={this.props.flags.membershipLevel}
                isVisible={!!premiumTagExperiment}
              />
            )}

          {status === 'visibleOnAccept' && this.renderVisibeOnAcceptSection()}
          {status === 'visibleOnUpgrade' && this.renderVisibeOnUpgradeSection()}
          {status === 'passwordRequested' && !this.props.loading && this.renderPhotoPasswordSection()}
          {status === 'requestPassword' && !this.props.loading && this.renderPhotoPasswordSection()}
          {status === 'noPhoto' && (
            <s.NoPhotoLink
              isVisible
              hasMore={this.props.hasMore}
              onClick={this.onRequestPhoto}
              isOverlay={this.props.flags.isMaskedProfile}
            />
          )}

          <Tooltip isVisible={this.props.isTooltipVisible} offset={[0, 0]} tooltip={this.props.tooltip} onClose={this.props.onTooltipClose}>
            <s.Empty />
          </Tooltip>
        </s.SlidesWrapper>
      </s.ProfilePhoto>
    );
  }
}

ProfilePhoto.defaultProps = {
  isPlaying: false,
  profileUrl: null,
  settings: {
    experiments: {},
  },
  isCarousel: false,
  listUrl: '',
  hasMore: false,
  count: 0,
  premiumCarousel: false,
  imgTitle: '',
  daTracking: null,
  onRequestPassword: () => {},
  onShowPhotoClick: null,
  isHovered: false,
  badgeType: '',
  showSpotLight: false,
};

ProfilePhoto.propTypes = {
  type: PropTypes.oneOf(['list', 'grid', 'profile', 'inboxCard', 'contactSummaryCard', 'FeaturedCard', 'similarCard']).isRequired,
  isCarousel: PropTypes.bool,
  hasMore: PropTypes.bool,
  listUrl: PropTypes.string,
  count: PropTypes.number,
  flags: PropTypes.shape({
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
    ]).isRequired,
    connectionStatus: PropTypes.string,
    isMaskedProfile: PropTypes.bool,
    isWatermarked: PropTypes.bool.isRequired,
    membershipLevel: PropTypes.oneOf(['Free', 'Premium', 'PremiumPlus', 'Select', 'none']).isRequired,
    membershipTags: PropTypes.string.isRequired,
  }).isRequired,
  settings: PropTypes.shape({
    hasUploadedPhoto: PropTypes.bool.isRequired,
    isPaidUser: PropTypes.bool.isRequired,
    experiments: PropTypes.object,
  }).isRequired,

  isTooltipVisible: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool,
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  tooltip: PropTypes.shape(PropTypes.tooltip).isRequired,
  loading: PropTypes.bool.isRequired,
  albumUrl: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  profileUrl: PropTypes.string,
  uid: PropTypes.string.isRequired,
  onTooltipClose: PropTypes.func.isRequired,
  onShowWatermarkInfo: PropTypes.func.isRequired,
  onRequestPhoto: PropTypes.func.isRequired,
  onRequestPassword: PropTypes.func,
  premiumCarousel: PropTypes.bool,
  onShowPhotoClick: PropTypes.func,
  imgTitle: PropTypes.string,
  daTracking: PropTypes.func,
  isHovered: PropTypes.bool,
  badgeType: PropTypes.string,
  showSpotLight: PropTypes.bool,
};

export default ProfilePhoto;
