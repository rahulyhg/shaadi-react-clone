import React from 'react';
import PropTypes from '../../PropTypes';
import ProfilePhotoList from '../Common/ProfilePhotoList';
import Eoi from '../Common/Eoi';
import ProfileQueue from '../Common/ProfileQueue';
import Tooltip from '../Common/Tooltip';
import ChatIcon from '../Common/ChatIcon';
import { profile as profileContent } from '../../actions/lib/content';
import s from './stylesB';
import MoreAction from '../Common/MoreAction';
import ProfileContactNote from '../Common/ProfileContactNote';
import YouAndMeConversationStarter from '../YouAndMeConversationStarter';

class ProfileNameSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };

    this.onMouseEnter = () => this.setState({ isHovered: true });
    this.onMouseLeave = () => this.setState({ isHovered: false });

    this.onTooltipClose = this.action('closeProfileTooltip');
    this.onShowWatermarkInfo = this.action('showWatermarkInfo');
    this.onRequestPhoto = this.action('requestPhoto');
    this.onSendEmailClick = this.action('sendEmail');
    this.onChatNowClick = this.action('chatNow');
    this.onViewPhoneNoClick = this.action('contact');
    this.onViewHistory = this.action('view_history');
    this.onShowPhotoClick = this.action('viewAlbum');

    this.onShortlistOpen = () => {
      if (!props.profile.shortlists.ready) {
        this.action('loadShortlist');
      }
    };
    this.onDirectlyShortlist = this.action('addToShortlist', props.shortlistItems.slice(0, 1).map(i => i.id));
    this.onDirectlyRemoveShortlist = this.action('addToShortlist', []);
    this.onDirectlyIgnore = this.action('ignore');
    this.onCancel = this.action('cancel_invitation');
  }

  action(...args) {
    return () => this.props.onAction(this.props.profile.uid, ...args);
  }

  render() {
    const profileName = this.props.profile.name || this.props.profile.userHandle || '...';
    return (
      <s.ProfileNameSectionWrapper isPaginationVisible={this.props.pagination.isVisible} isDR={this.props.isDR}>
        <s.RightSection>
          {this.props.pagination.isVisible &&
            !this.props.isDR && (
              <ProfileQueue
                isPageMasked={this.props.profile.flags.isMaskedProfile}
                isDR={this.props.isDR}
                pagination={this.props.pagination}
                daTracking={this.props.daTracking}
                profilePageBucket="B"
              />
            )}
        </s.RightSection>
        <s.ProfileNameSection onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <s.ProfilePhotoWrapper isDR={this.props.isDR} data-test-selector="profile_photo_wrapper">
            <ProfilePhotoList
              type={'profile'}
              flags={this.props.profile.flags}
              isPlaying={!!(this.props.isHovered && this.props.profile.detailed.albumRevamp.length)}
              photos={this.props.profile.detailed.albumRevamp}
              tooltip={this.props.tooltip}
              loading={this.props.photoLoading}
              albumUrl={`${this.props.wwwBaseUrl}/profile/index/view-album-photos/profileid/${this.props.profile.uid}`}
              settings={this.props.settings}
              isTooltipVisible={this.props.tooltip.position === 'photo'}
              onTooltipClose={this.onTooltipClose}
              onShowWatermarkInfo={this.onShowWatermarkInfo}
              onRequestPhoto={this.onRequestPhoto}
              wwwBaseUrl={this.props.wwwBaseUrl}
              uid={this.props.profile.uid}
              daTracking={this.props.daTracking}
              onShowPhotoClick={this.onShowPhotoClick}
              isHovered={this.state.isHovered}
            />
          </s.ProfilePhotoWrapper>
          <s.Content>
            <s.Info>
              {
                <s.LeftSection>
                  <s.Name>
                    <s.NameInfoWrap>
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
                      {(this.props.item.isPreferredMatch && <s.PreferredTag isVisible>Preferred</s.PreferredTag>) || ''}
                      {(this.props.profile.flags.isTwoWayMatch && <s.PreferredTag isVisible>2-Way</s.PreferredTag>) || ''}
                    </s.NameInfoWrap>
                    {!this.props.item.displayStatusMessage &&
                      ((!['blocked', 'theyDeclined', 'theyCancelled', 'sameGender', 'hidden', 'misuseReported'].includes(
                        this.props.profile.flags.connectionStatus,
                      ) &&
                        !this.props.isDR) ||
                        (this.props.isDR && ['default', 'shortlisted'].includes(this.props.profile.flags.connectionStatus))) &&
                      !this.props.settings.isHidden && (
                        <MoreAction
                          status={this.props.profile.flags.connectionStatus}
                          onShortlistOpen={this.onShortlistOpen}
                          onDirectlyShortlist={this.onDirectlyShortlist}
                          onDirectlyRemoveShortlist={this.onDirectlyRemoveShortlist}
                          onDirectlyIgnore={this.onDirectlyIgnore}
                          onViewHistory={this.onViewHistory}
                          shortlists={this.props.profile.shortlists}
                          fromPage={this.props.isDR ? 'daily_recommendations' : 'profile'}
                          onBlockClick={this.props.onBlockClick}
                          onMisuseClick={this.props.onMisuseClick}
                          profileid={this.props.profile.uid}
                          onCancelClick={this.onCancel}
                          canCancelInvite={this.props.profile.flags.canCancelInvite}
                        />
                      )}
                  </s.Name>
                  <s.SubHeading>
                    <s.ChatLink
                      isLinkActive={this.props.profile.presence.lastOnlineDetails === 'Online now'}
                      title="Chat Now"
                      data-test-selector="chat_link"
                    >
                      {['Online', 'Offline', 'Idle'].includes(this.props.profile.presence.onlineStatus) && (
                        <ChatIcon
                          viewType="profile"
                          chatDetails={this.props.profile.presence}
                          clickFn={this.onChatNowClick}
                          profilePageBucket="B"
                        />
                      )}
                      <s.LastOnlineAt onClick={this.onChatNowClick}>{this.props.profile.presence.lastOnlineDetails}</s.LastOnlineAt>
                    </s.ChatLink>
                    <s.YouAndMeWrapper data-test-selector="you_and_me_wrapper">
                      {this.props.profile.detailed.commonInterests && (
                        <YouAndMeConversationStarter
                          himHer={this.props.profile.himHer}
                          displayData={this.props.profile.detailed.commonInterests}
                        />
                      )}
                    </s.YouAndMeWrapper>
                  </s.SubHeading>
                  <s.ProfileDetails>
                    {this.props.profile.detailed.infoMapRevamp.map(detail => <s.DetailDesc key={detail.key}>{detail.value}</s.DetailDesc>)}
                  </s.ProfileDetails>
                  {!this.props.automove && (
                    <s.ProfileEoiContactTime>
                      <ProfileContactNote settings={this.props.settings} item={this.props.item} profile={this.props.profile} />
                    </s.ProfileEoiContactTime>
                  )}
                </s.LeftSection>
              }
            </s.Info>
            <s.ProfileNameSectionBorderWrapper />
            <s.ProfileConnectStatus
              data-test-selector="profile_connect_status"
              type={'profile'}
              isSkuFeature={this.props.profile.flags.canCommunicate ? 'sku_user' : ''}
            >
              <Eoi
                justNow={this.props.item.justNow}
                justNowText={this.props.item.justNowText}
                justNowIcon={this.props.item.justNowIcon}
                justNowClass={this.props.item.justNowClass}
                modalShowCount={this.props.item.modalShowCount}
                request={this.props.item.request}
                isHovered={this.state.isHovered}
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
                profilePageBucket={this.props.profilePageBucket}
              />
            </s.ProfileConnectStatus>
          </s.Content>
        </s.ProfileNameSection>
      </s.ProfileNameSectionWrapper>
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
  pagination: {
    nextUrl: null,
  },
  daTracking: null,
  profilePageBucket: 'A',
  automove: false,
};

ProfileNameSection.propTypes = {
  isHovered: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    justNow: PropTypes.bool.isRequired,
    justNowText: PropTypes.string,
    justNowIcon: PropTypes.string,
    justNowClass: PropTypes.string,
    displayStatusMessage: PropTypes.string,
    modalShowCount: PropTypes.number,
    isPreferredMatch: PropTypes.bool,
    request: PropTypes.shape({
      details: PropTypes.shape({
        count: PropTypes.number,
        request_type: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
    connectMessages: PropTypes.arrayOf(PropTypes.shape(PropTypes.connectMessage)),
    contact: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  profile: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    userHandle: PropTypes.string,
    heShe: PropTypes.oneOf(['He', 'She']).isRequired,
    himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
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
      canCancelInvite: PropTypes.bool.isRequired,
      canCommunicate: PropTypes.bool.isRequired,
    }).isRequired,
    summary: PropTypes.shape({
      createdBy: PropTypes.string,
      profileCreatedBy: PropTypes.string,
    }).isRequired,
    detailed: PropTypes.shape({
      albumRevamp: PropTypes.arrayOf(PropTypes.string).isRequired,
      infoMapRevamp: PropTypes.arrayOf(PropTypes.object).isRequired,
      commonInterests: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    shortlists: PropTypes.shape({
      ready: PropTypes.bool.isRequired,
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
    isHidden: PropTypes.bool.isRequired,
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
  profilePageBucket: PropTypes.string,
  onBlockClick: PropTypes.func.isRequired,
  onMisuseClick: PropTypes.func.isRequired,
  automove: PropTypes.bool,
};

export default ProfileNameSection;
