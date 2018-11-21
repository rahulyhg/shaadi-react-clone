import React from 'react';
import PropTypes from '../../PropTypes';
import ProfilePhoto from '../Common/ProfilePhoto';
import Eoi from '../Common/Eoi';
import ProfileQueue from '../Common/ProfileQueue';
import Tooltip from '../Common/Tooltip';
import RecommendationTicker from '../Common/RecommendationTicker';
import ChatIcon from '../Common/ChatIcon';
import { profile as profileContent } from '../../actions/lib/content';
import s from './stylesA';
import BenefitsActivity from '../BenefitsActivity';

class ProfileNameSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onTooltipClose = this.action('closeProfileTooltip');
    this.onShowWatermarkInfo = this.action('showWatermarkInfo');
    this.onRequestPhoto = this.action('requestPhoto');
    this.onRequestPassword = this.action('requestPassword');

    this.onSendEmailClick = this.action('sendEmail');
    this.onChatNowClick = this.action('chatNow');
    this.onViewPhoneNoClick = this.action('contact');
    this.onShowPhotoClick = this.action('viewAlbum');
  }

  action(...args) {
    return () => this.props.onAction(this.props.profile.uid, ...args);
  }

  render() {
    const profileName = this.props.profile.name || this.props.profile.userHandle || '...';
    return (
      <s.ProfileNameSection isDR={this.props.isDR}>
        <s.ProfilePhotoWrapper isDR={this.props.isDR}>
          <ProfilePhoto
            type={'profile'}
            flags={this.props.profile.flags}
            isPlaying={!!(this.props.isHovered && this.props.profile.detailed.album.length)}
            photos={this.props.profile.detailed.album}
            tooltip={this.props.tooltip}
            loading={this.props.photoLoading}
            albumUrl={`${this.props.wwwBaseUrl}/profile/index/view-album-photos/profileid/${this.props.profile.uid}`}
            settings={this.props.settings}
            isTooltipVisible={this.props.tooltip.position === 'photo'}
            onTooltipClose={this.onTooltipClose}
            onShowWatermarkInfo={this.onShowWatermarkInfo}
            onRequestPhoto={this.onRequestPhoto}
            onRequestPassword={this.onRequestPassword}
            wwwBaseUrl={this.props.wwwBaseUrl}
            uid={this.props.profile.uid}
            daTracking={this.props.daTracking}
            onShowPhotoClick={this.onShowPhotoClick}
          />
        </s.ProfilePhotoWrapper>
        <s.Content isDR={this.props.isDR}>
          <s.Info isDR={this.props.isDR}>
            {!this.props.isDR && (
              <s.LeftSection>
                <s.Name>
                  <s.NameSpan title={profileName}>{profileName}</s.NameSpan>

                  {!this.props.settings.isPaidUser &&
                    this.props.profile.name &&
                    this.props.profile.name !== this.props.profile.userHandle &&
                    this.props.profile.flags.isNameLocked && (
                      <Tooltip
                        trigger="hover"
                        offset={[-3, 22]}
                        placement="right"
                        tooltip={profileContent.namePrivacyTooltip}
                        overlayClassName="nameUpgradeTooltip"
                      >
                        <s.profileNameLock />
                      </Tooltip>
                    )}

                  <s.Uid>{this.props.profile.name !== this.props.profile.userHandle && `( ${this.props.profile.userHandle} )`}</s.Uid>
                  {(this.props.item.isPreferredMatch && <s.PreferredTag isVisible>Preferred</s.PreferredTag>) || ''}
                  {(this.props.profile.flags.isTwoWayMatch && <s.TwoWayTag isVisible>2-Way</s.TwoWayTag>) || ''}
                </s.Name>
                <s.SubHeading>
                  Profile created by {this.props.profile.summary.profileCreatedBy || '...'}
                  {' | '}
                  {this.props.profile.presence.lastOnlineDetails}
                  {['Online', 'Offline', 'Idle'].includes(this.props.profile.presence.onlineStatus) && (
                    <ChatIcon viewType="profile" chatDetails={this.props.profile.presence} clickFn={this.onChatNowClick} />
                  )}
                </s.SubHeading>
              </s.LeftSection>
            )}
            <s.RightSection>
              {this.props.pagination.isVisible && (
                <ProfileQueue
                  isPageMasked={this.props.profile.flags.isMaskedProfile}
                  isDR={this.props.isDR}
                  pagination={this.props.pagination}
                  daTracking={this.props.daTracking}
                />
              )}
              {!this.props.pagination.isVisible &&
                !this.props.pagination.loading &&
                this.props.timeLeftToConnect > 0 &&
                this.props.defaultProfileId === this.props.profile.uid &&
                this.props.isDR && <RecommendationTicker target_time={this.props.timeLeftToConnect} />}
            </s.RightSection>
          </s.Info>
          <Eoi
            justNow={this.props.item.justNow}
            justNowText={this.props.item.justNowText}
            justNowIcon={this.props.item.justNowIcon}
            justNowClass={this.props.item.justNowClass}
            modalShowCount={this.props.item.modalShowCount}
            request={this.props.item.request}
            type={this.props.isDR ? 'dailyRecommendations' : 'profile'}
            profile={this.props.profile}
            settings={this.props.settings}
            tooltip={this.props.tooltip}
            loadingStyle={this.props.eoiLoadingStyle}
            onAction={this.props.onAction}
            onTooltipClose={this.onTooltipClose}
            shortlistItems={this.props.shortlistItems}
            connectMessages={this.props.item.connectMessages}
            contact={this.props.item.contact}
            isSearchLinkVisible={['null', 'undefined', null, undefined].includes(this.props.pagination.nextUid)}
            onChatNow={this.onChatNowClick}
            wwwBaseUrl={this.props.wwwBaseUrl}
            onViewPhoneNoClick={this.onViewPhoneNoClick}
            onSendEmailClick={this.onSendEmailClick}
            nextUrl={this.props.pagination.nextUrl}
          />
        </s.Content>
        <BenefitsActivity
          justNow={this.props.item.justNow}
          justNowText={this.props.item.justNowText}
          upgradeUrl={`/payment?loc=profile&profileid=${this.props.profile.uid}`}
          settings={this.props.settings}
          profile={this.props.profile}
          onSendEmailClick={this.onSendEmailClick}
          onChatNowClick={this.onChatNowClick}
          onViewPhoneNoClick={this.onViewPhoneNoClick}
          onAction={this.props.onAction}
          membership={this.props.membership}
        />
      </s.ProfileNameSection>
    );
  }
}

ProfileNameSection.defaultProps = {
  item: {
    request: {
      details: {
        count: 0,
        request_type: [],
      },
    },
  },
  isPaidUser: false,
  isDR: false,
  defaultProfileId: '',
  timeLeftToConnect: 0,
  pagination: {
    nextUrl: null,
  },
  daTracking: null,
};

ProfileNameSection.propTypes = {
  isHovered: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    justNow: PropTypes.bool.isRequired,
    justNowText: PropTypes.string,
    justNowIcon: PropTypes.string,
    justNowClass: PropTypes.string,
    modalShowCount: PropTypes.number,
    isPreferredMatch: PropTypes.bool,
    request: PropTypes.shape({
      details: PropTypes.shape({
        count: PropTypes.number,
        request_type: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
    connectMessages: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
    contact: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  profile: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    userHandle: PropTypes.string,
    presence: PropTypes.shape({
      onlineStatus: PropTypes.onlineStatus.isRequired,
      lastOnlineDetails: PropTypes.string.isRequired,
      chatIcon: PropTypes.string.isRequired,
    }).isRequired,
    flags: PropTypes.shape({
      isPreferredMatch: PropTypes.bool.isRequired,
      isTwoWayMatch: PropTypes.bool.isRequired,
      albumStatus: PropTypes.albumStatus.isRequired,
      connectionStatus: PropTypes.connectionStatus.isRequired,
      isNameLocked: PropTypes.bool.isRequired,
      isMaskedProfile: PropTypes.bool.isRequired,
    }).isRequired,
    summary: PropTypes.shape({
      createdBy: PropTypes.string,
      profileCreatedBy: PropTypes.string,
    }).isRequired,
    detailed: PropTypes.shape({
      album: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
  tooltip: PropTypes.shape({
    position: PropTypes.oneOf(['photo', 'eoi', 'none']),
    title: PropTypes.string,
    body: PropTypes.arrayOf(PropTypes.shape(PropTypes.tooltipBody)).isRequired,
    loading: PropTypes.bool,
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  photoLoading: PropTypes.bool.isRequired,
  eoiLoadingStyle: PropTypes.oneOf(['full', 'partial', 'none']).isRequired,
  settings: PropTypes.shape({
    isPaidUser: PropTypes.bool,
    canSendPasswordOnConnect: PropTypes.bool.isRequired,
    canConnectWithMessage: PropTypes.bool.isRequired,
  }).isRequired,
  shortlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isDR: PropTypes.bool,
  pagination: PropTypes.shape({
    count: PropTypes.number,
    prevUid: PropTypes.string,
    backUid: PropTypes.string,
    isVisible: PropTypes.bool,
    nextUid: PropTypes.string,
    loading: PropTypes.bool,
    nextUrl: PropTypes.string,
  }).isRequired,

  onAction: PropTypes.func.isRequired,
  daTracking: PropTypes.func,
  membership: PropTypes.string.isRequired,
  defaultProfileId: PropTypes.string,
  timeLeftToConnect: PropTypes.number,
};

export default ProfileNameSection;
