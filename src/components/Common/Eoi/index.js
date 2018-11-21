import React from 'react';
import PropTypes from '../../../PropTypes';

import Tooltip from '../Tooltip';

import EoiLoading from './EoiLoading';
import EoiDefault from './EoiDefault';
import EoiContacted from './EoiContacted';
import EoiTheyContacted from './EoiTheyContacted';
import EoiIgnored from './EoiIgnored';
import EoiBlocked from './EoiBlocked';
import EoiActive from './EoiActive';
import EoiMessage from './EoiMessage';
import EoiDeactive from './EoiDeactive';

import { GA } from '../../../actions/lib/utils';

class Eoi extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onTooltipClose = this.action('closeEoiTooltip').bind(this);
    this.onShortlistOpen = () => {
      if (this.props.tooltip.position === 'eoi') {
        this.props.onAction(this.props.profile.uid, 'closeEoiTooltip');
      }
      if (!this.props.profile.shortlists.ready) {
        this.props.onAction(this.props.profile.uid, 'loadShortlist');
      }
    };
    this.onCreateShortlist = name => this.props.onAction(this.props.profile.uid, 'createShortlist', name);
    this.onDirectlyShortlist = () =>
      this.props.onAction(this.props.profile.uid, 'addToShortlist', this.props.shortlistItems.slice(0, 1).map(i => i.id));
    this.onAddToShortlist = items => this.props.onAction(this.props.profile.uid, 'addToShortlist', items);

    this.onConnect = this.action('connect').bind(this);
    this.onConnectWithPassword = this.action('connect_with_password').bind(this);
    this.connectPremiumCarousel = this.action('connect_premium_carousel').bind(this);
    this.onIgnore = this.action('ignore').bind(this);
    this.onAccept = this.action('accept').bind(this);
    this.onAcceptPremiumCarousel = this.action('accept_premium_carousel').bind(this);

    this.onDecline = this.action('decline').bind(this);
    this.onDeclineWithMessage = this.action('decline_with_message').bind(this);
    this.onDeclineWithDelete = this.action('decline_with_delete').bind(this);
    this.onDelete = this.action('delete').bind(this);

    this.onUnIgnore = this.action('un_ignore').bind(this);
    this.onRemind = this.action('remind').bind(this);
    this.onCancel = this.action('cancel_invitation').bind(this);
    this.onCancelRemind = this.action('cancel_invitation_reminder').bind(this);
    this.onViewHistory = this.action('view_history').bind(this);
    this.onViewRequest = this.action('view_request').bind(this);

    this.onBlock = this.action('block').bind(this);
    this.onUnblock = this.action('unblock').bind(this);
    this.onReportMisuse = this.action('reportMisuse').bind(this);

    this.onSendEmail = this.action('sendEmail').bind(this);

    this.renderSection = this.renderSection.bind(this);
    this.onCallConsultant = this.action('callConsultant').bind(this);
  }

  action(...args) {
    return () => {
      GA.trackEoiEvent(...args, this.props.type);
      this.props.onAction(this.props.profile.uid, ...args);
    };
  }

  renderSection() {
    if (this.props.loadingStyle !== 'none') {
      return (
        <EoiLoading
          type={this.props.type}
          isPartialLoading={this.props.loadingStyle === 'partial'}
          profilePageBucket={this.props.profilePageBucket}
          actionType={this.props.actionType}
        />
      );
    }
    if (!this.props.profile.uid || this.props.profile.flags.connectionStatus === 'unknown') {
      return <div style={{ minHeight: { list: '100px', grid: '40px', chat: '20px', profile: '60px' }[this.props.type] }} />;
    }
    if (this.props.profile.flags.connectionError && ['profile', 'dailyRecommendations', 'similarProfile'].includes(this.props.type)) {
      return (
        <EoiMessage
          type={this.props.type}
          status={this.props.profile.flags.connectionStatus}
          justNow={this.props.justNow}
          justNowText={this.props.justNowText}
          justNowIcon={this.props.justNowIcon}
          justNowClass={this.props.justNowClass}
        />
      );
    }
    switch (this.props.profile.flags.connectionStatus) {
      case 'default':
      case 'shortlisted':
      case 'cancelled':
      case 'hidden':
      case 'sameGender':
      case 'skip':
        return (
          <EoiDefault
            drAction={(this.props.profile.drAction && this.props.profile.drAction.drAction) || ''}
            heShe={this.props.profile.heShe}
            himHer={this.props.profile.himHer}
            hisHer={this.props.profile.hisHer}
            onViewPhoneNoClick={this.props.onViewPhoneNoClick}
            onSendEmailClick={this.props.onSendEmailClick}
            isHovered={this.props.isHovered}
            isCarousel={this.props.isCarousel}
            isPartialLoading={this.props.loadingStyle === 'partial'}
            justNow={this.props.justNow}
            justNowText={this.props.justNowText}
            justNowIcon={this.props.justNowIcon}
            isSameGender={this.props.profile.flags.isSameGender}
            isConnectLimitExceeded={this.props.profile.flags.limitExceeded}
            note={this.props.profile.flags.connectionNote}
            onAddToShortlist={this.onAddToShortlist}
            onConnect={this.onConnect}
            onConnectWithPassword={this.onConnectWithPassword}
            onCreateShortlist={this.onCreateShortlist}
            onDirectlyShortlist={this.onDirectlyShortlist}
            onIgnore={this.onIgnore}
            onShortlistOpen={this.onShortlistOpen}
            settings={this.props.settings}
            shortlistItems={this.props.shortlistItems}
            shortlists={this.props.profile.shortlists}
            status={this.props.profile.flags.connectionStatus}
            type={this.props.type}
            chatMode={this.props.chatMode}
            name={this.props.profile.name || this.props.profile.userHandle}
            isSearchLinkVisible={this.props.isSearchLinkVisible}
            onViewHistory={this.onViewHistory}
            onViewRequest={this.onViewRequest}
            showHistory={this.props.profile.flags.showHistory}
            request={this.props.request}
            connectionAction={this.props.profile.flags.connectionAction}
            membershipTags={this.props.profile.flags.membershipTags}
            onCallConsultant={this.onCallConsultant}
            onChatNow={this.props.onChatNow}
            onShowContactDetails={this.props.onShowContactDetails}
            connectPremiumCarousel={this.connectPremiumCarousel}
            profileCreatedBy={(this.props.profile.summary && this.props.profile.summary.profileCreatedBy) || ''}
            lastOnlineDetails={(this.props.profile.presence && this.props.profile.presence.lastOnlineDetails) || ''}
            profileid={this.props.contact.profileid}
            userHandle={this.props.profile.userHandle}
            wwwBaseUrl={this.props.wwwBaseUrl || ''}
            nextUrl={this.props.nextUrl || ''}
            listType={this.props.listType}
            presence={this.props.profile.presence}
            isHidden={this.props.profile.flags.isHidden}
            hiddenReason={this.props.profile.flags.hiddenReason}
            onDeclineWithDelete={this.onDeclineWithDelete}
            onDelete={this.onDelete}
            isHorizontal={this.props.isHorizontal}
            isDeleted={this.props.profile.flags.isDeleted}
            profilePageBucket={this.props.profilePageBucket}
            canCommunicate={this.props.profile.flags.canCommunicate}
            eoiClose={this.props.eoiClose}
          />
        );
      case 'theyContacted':
        return (
          <EoiTheyContacted
            heShe={this.props.profile.heShe}
            himHer={this.props.profile.himHer}
            hisHer={this.props.profile.hisHer}
            isHovered={this.props.isHovered}
            isCarousel={this.props.isCarousel}
            modalShowCount={this.props.modalShowCount}
            justNow={this.props.justNow}
            note={this.props.profile.flags.connectionNote}
            onAccept={this.onAccept}
            onDecline={this.onDecline}
            onDelete={this.onDelete}
            onDeclineWithDelete={this.onDeclineWithDelete}
            onDeclineWithMessage={this.onDeclineWithMessage}
            onChatNow={this.props.onChatNow}
            settings={this.props.settings}
            isDeleted={this.props.profile.flags.isDeleted}
            isHidden={this.props.profile.flags.isHidden}
            isSameGender={this.props.profile.flags.isSameGender}
            hiddenReason={this.props.profile.flags.hiddenReason}
            status={this.props.profile.flags.connectionStatus}
            type={this.props.type}
            chatMode={this.props.chatMode}
            connectMessages={this.props.connectMessages}
            contact={this.props.contact}
            profileName={this.props.profile.name}
            showHistory={this.props.profile.flags.showHistory}
            onViewHistory={this.onViewHistory}
            onViewRequest={this.onViewRequest}
            connectionAction={this.props.profile.flags.connectionAction}
            request={this.props.request}
            justNowIcon={this.props.justNowIcon}
            justNowText={this.props.justNowText}
            isSearchLinkVisible={this.props.isSearchLinkVisible}
            isProfileFree={this.props.profile.flags.isFree}
            membershipTags={this.props.profile.flags.membershipTags}
            onAcceptPremiumCarousel={this.onAcceptPremiumCarousel}
            profileCreatedBy={(this.props.profile.summary && this.props.profile.summary.profileCreatedBy) || ''}
            lastOnlineDetails={(this.props.profile.presence && this.props.profile.presence.lastOnlineDetails) || ''}
            profileid={this.props.contact.profileid}
            userHandle={this.props.profile.userHandle}
            wwwBaseUrl={this.props.wwwBaseUrl || ''}
            nextUrl={this.props.nextUrl || ''}
            onDirectlyShortlist={this.onDirectlyShortlist}
            listType={this.props.listType}
            presence={this.props.profile.presence}
            profilePageBucket={this.props.profilePageBucket}
            eoiClose={this.props.eoiClose}
            canCommunicate={this.props.profile.flags.canCommunicate}
          />
        );

      case 'contacted':
      case 'filteredContacted':
        return (
          <EoiContacted
            canCancelInvite={this.props.profile.flags.canCancelInvite}
            canRemind={this.props.profile.flags.canRemind}
            heShe={this.props.profile.heShe}
            himHer={this.props.profile.himHer}
            hisHer={this.props.profile.hisHer}
            onViewPhoneNoClick={this.props.onViewPhoneNoClick}
            onSendEmailClick={this.props.onSendEmailClick}
            isHovered={this.props.isHovered}
            isCarousel={this.props.isCarousel}
            isDeleted={this.props.profile.flags.isDeleted}
            isSearchLinkVisible={this.props.isSearchLinkVisible}
            justNow={this.props.justNow}
            justNowIcon={this.props.justNowIcon}
            justNowText={this.props.justNowText}
            note={this.props.profile.flags.connectionNote}
            onCancelInvite={this.onCancel}
            onCancelRemind={this.onCancelRemind}
            onRemind={this.onRemind}
            showHistory={this.props.profile.flags.showHistory}
            onViewHistory={this.onViewHistory}
            onViewRequest={this.onViewRequest}
            settings={this.props.settings}
            status={this.props.profile.flags.connectionStatus}
            type={this.props.type}
            request={this.props.request}
            onChatNow={this.props.onChatNow}
            onShowContactDetails={this.props.onShowContactDetails}
            membershipTags={this.props.profile.flags.membershipTags}
            profileId={this.props.profile.uid}
            name={this.props.profile.name || this.props.profile.userHandle}
            uid={this.props.profile.uid}
            wwwBaseUrl={this.props.wwwBaseUrl || ''}
            nextUrl={this.props.nextUrl || ''}
            drAction={(this.props.profile.drAction && this.props.profile.drAction.drAction) || ''}
            isHidden={this.props.profile.flags.isHidden}
            hiddenReason={this.props.profile.flags.hiddenReason}
            listType={this.props.listType}
            profilePageBucket={this.props.profilePageBucket}
            connectionAction={this.props.profile.flags.connectionAction}
            canCommunicate={this.props.profile.flags.canCommunicate}
          />
        );
      case 'ignored':
      case 'ignoredJustNow':
        return (
          <EoiIgnored
            heShe={this.props.profile.heShe}
            isHovered={this.props.isHovered}
            isCarousel={this.props.isCarousel}
            isSearchLinkVisible={this.props.isSearchLinkVisible}
            justNow={this.props.justNow}
            justNowIcon={this.props.justNowIcon}
            justNowText={this.props.justNowText}
            membershipTags={this.props.profile.flags.membershipTags}
            note={this.props.profile.flags.connectionNote}
            onConnect={this.onConnect}
            settings={this.props.settings}
            status={this.props.profile.flags.connectionStatus}
            type={this.props.type}
            nextUrl={this.props.nextUrl || ''}
            name={this.props.profile.name}
            profileCreatedBy={(this.props.profile.summary && this.props.profile.summary.profileCreatedBy) || ''}
            lastOnlineDetails={(this.props.profile.presence && this.props.profile.presence.lastOnlineDetails) || ''}
            profileid={this.props.contact.profileid}
            userHandle={this.props.profile.userHandle}
            wwwBaseUrl={this.props.wwwBaseUrl || ''}
            onDirectlyShortlist={this.onDirectlyShortlist}
            isProfileViewed={this.props.profile.flags.isProfileViewed}
            drAction={(this.props.profile.drAction && this.props.profile.drAction.drAction) || ''}
            profilePageBucket={this.props.profilePageBucket}
          />
        );
      case 'blocked':
        return (
          <EoiBlocked
            canUnblock={this.props.profile.flags.canUnblock}
            himHer={this.props.profile.himHer}
            hisHer={this.props.profile.hisHer}
            isHovered={this.props.isHovered}
            isCarousel={this.props.isCarousel}
            isSearchLinkVisible={this.props.isSearchLinkVisible}
            justNow={this.props.justNow}
            justNowIcon={this.props.justNowIcon}
            justNowText={this.props.justNowText}
            note={this.props.profile.flags.connectionNote}
            onReportMisuse={this.onReportMisuse}
            onUnblock={this.onUnblock}
            settings={this.props.settings}
            status={this.props.profile.flags.connectionStatus}
            type={this.props.type}
            unblockMessage={this.props.profile.flags.unblockMessage}
            connectionAction={this.props.profile.flags.connectionAction}
            profileName={this.props.profile.name}
            drAction={(this.props.profile.drAction && this.props.profile.drAction.drAction) || ''}
            nextUrl={this.props.nextUrl || ''}
            profilePageBucket={this.props.profilePageBucket}
            membershipTags={this.props.profile.flags.membershipTags}
          />
        );
      case 'accepted':
      case 'declined':
      case 'theyAccepted':
      case 'theyDeclined':
      case 'theyCancelled':
        return (
          <EoiActive
            heShe={this.props.profile.heShe}
            himHer={this.props.profile.himHer}
            hisHer={this.props.profile.hisHer}
            isHovered={this.props.isHovered}
            onViewPhoneNoClick={this.props.onViewPhoneNoClick}
            onSendEmailClick={this.props.onSendEmailClick}
            isCarousel={this.props.isCarousel}
            isDeleted={this.props.profile.flags.isDeleted}
            isHidden={this.props.profile.flags.isHidden}
            hiddenReason={this.props.profile.flags.hiddenReason}
            isSearchLinkVisible={this.props.isSearchLinkVisible}
            justNow={this.props.justNow}
            justNowIcon={this.props.justNowIcon}
            justNowText={this.props.justNowText}
            note={this.props.profile.flags.connectionNote}
            onAccept={this.onAccept}
            onBlock={this.onBlock}
            onCancel={this.onCancel}
            onConnect={this.onConnect}
            onDecline={this.onDecline}
            onDeclineWithMessage={this.onDeclineWithMessage}
            onReportMisuse={this.onReportMisuse}
            onRequests={this.onRequests}
            onSendEmail={this.onSendEmail}
            showHistory={this.props.profile.flags.showHistory}
            onViewHistory={this.onViewHistory}
            onViewRequest={this.onViewRequest}
            requests={this.props.profile.requests}
            settings={this.props.settings}
            status={this.props.profile.flags.connectionStatus}
            type={this.props.type}
            connectMessages={this.props.connectMessages}
            contact={this.props.contact}
            request={this.props.request}
            isProfileFree={this.props.profile.flags.isFree}
            profileName={this.props.profile.name}
            onChatNow={this.props.onChatNow}
            onShowContactDetails={this.props.onShowContactDetails}
            membershipTags={this.props.profile.flags.membershipTags}
            profileId={this.props.profile.uid}
            wwwBaseUrl={this.props.wwwBaseUrl || ''}
            uid={this.props.profile.uid}
            profileCreatedBy={(this.props.profile.summary && this.props.profile.summary.profileCreatedBy) || ''}
            lastOnlineDetails={(this.props.profile.presence && this.props.profile.presence.lastOnlineDetails) || ''}
            userHandle={this.props.profile.userHandle}
            nextUrl={this.props.nextUrl || ''}
            presence={this.props.profile.presence}
            onDirectlyShortlist={this.onDirectlyShortlist}
            isHorizontal={this.props.isHorizontal}
            listType={this.props.listType}
            onDelete={this.onDelete}
            onDeclineWithDelete={this.onDeclineWithDelete}
            profilePageBucket={this.props.profilePageBucket}
            canCommunicate={this.props.profile.flags.canCommunicate}
          />
        );
      case 'misuseReported':
        return (
          <EoiMessage
            type={this.props.type}
            status={this.props.profile.flags.connectionStatus}
            connectionAction={this.props.profile.flags.connectionAction}
            justNow={this.props.justNow}
            justNowIcon={this.props.justNowIcon}
            justNowText={this.props.justNowText}
            profilePageBucket={this.props.profilePageBucket}
          />
        );
      case 'disabled':
        return (
          <EoiDeactive
            isHorizontal={this.props.isHorizontal}
            type={this.props.type}
            hisHer={this.props.profile.hisHer}
            hiddenReason={this.props.profile.flags.hiddenReason}
            listType={this.props.listType}
            onDelete={this.onDelete}
            membershipTags={this.props.profile.flags.membershipTags}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const isTooltipVisible = this.props.tooltip.position === 'eoi' && this.props.profile.uid === this.props.tooltip.uid;
    let offset = [0, -20];
    if (this.props.type === 'profile') {
      offset = [-275, -50];
    }
    return (
      <Tooltip isVisible={isTooltipVisible} offset={offset} tooltip={this.props.tooltip} onClose={this.onTooltipClose}>
        <div
          style={{
            minHeight: {
              list: '35px',
              grid: '40px',
              chat: '20px',
              profile: `${!['B', 'C'].includes(this.props.profilePageBucket) && '60px'}`,
            }[this.props.type],
            flex: { dailyRecommendations: `${['B', 'C'].includes(this.props.profilePageBucket) ? '' : '1'}` }[this.props.type],
          }}
        >
          {this.renderSection()}
        </div>
      </Tooltip>
    );
  }
}

Eoi.defaultProps = {
  isHovered: false,
  justNow: false,
  isCarousel: false,
  justNowText: null,
  justNowIcon: null,
  justNowClass: null,
  onViewPhoneNoClick: null,
  onSendEmailClick: null,
  hasMore: false,
  listUrl: '',
  isSearchLinkVisible: false,
  chatMode: 'chatProfileCard',
  connectMessages: [],
  shortlistItems: [],
  contact: {},
  showHistory: false,
  userHandle: null,
  modalShowCount: 0,
  viewMorecount: 0,
  request: {
    details: {
      count: 0,
      request_type: [],
    },
  },
  actionType: '',
  onChatNow: null,
  onShowContactDetails: null,
  isHorizontal: false,
  summary: {
    createdBy: null,
    profileCreatedBy: null,
  },
  presence: {
    lastOnlineDetails: null,
    chatIcon: null,
  },
  wwwBaseUrl: null,
  nextUrl: null,

  profile: {
    drAction: {
      drAction: '',
    },
  },
  listType: '',
  profilePageBucket: 'A',
  eoiClose: false,
};

Eoi.propTypes = {
  type: PropTypes.oneOf([
    'list',
    'grid',
    'chat',
    'profile',
    'premiumCarousel',
    'dailyRecommendations',
    'inbox',
    'featured',
    'similarProfile',
    'dashboard',
  ]).isRequired,
  justNow: PropTypes.bool,
  justNowText: PropTypes.string,
  justNowIcon: PropTypes.string,
  justNowClass: PropTypes.string,
  modalShowCount: PropTypes.number,
  chatMode: PropTypes.oneOf(['chatProfileCard', 'chatWindow']),
  onSendEmailClick: PropTypes.func,
  onViewPhoneNoClick: PropTypes.func,
  isHorizontal: PropTypes.bool,
  listType: PropTypes.string,
  profile: PropTypes.shape({
    drAction: PropTypes.shape({ drAction: PropTypes.string }),
    uid: PropTypes.string,
    himHer: PropTypes.oneOf(['Him', 'Her', '...']).isRequired,
    hisHer: PropTypes.oneOf(['His', 'Her', '...']).isRequired,
    heShe: PropTypes.oneOf(['He', 'She', '...']).isRequired,
    requests: PropTypes.shape({
      count: PropTypes.number.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    userHandle: PropTypes.string,
    flags: PropTypes.shape({
      isDeleted: PropTypes.bool.isRequired,
      isHidden: PropTypes.bool,
      unblockMessage: PropTypes.string,
      canUnblock: PropTypes.bool.isRequired,
      canUnignore: PropTypes.bool.isRequired,
      canRemind: PropTypes.bool.isRequired,
      canCancelInvite: PropTypes.bool.isRequired,
      connectionError: PropTypes.bool.isRequired,
      connectionStatus: PropTypes.connectionStatus.isRequired,
      connectionNote: PropTypes.string,
      isSameGender: PropTypes.bool,
      limitExceeded: PropTypes.bool,
      showHistory: PropTypes.bool,
      connectionAction: PropTypes.string,
      isFree: PropTypes.bool,
      membershipTags: PropTypes.string,
      isProfileViewed: PropTypes.bool,
      canCommunicate: PropTypes.bool,
      hiddenReason: PropTypes.oneOf(['selfHidden', 'systemHidden', 'selfDeleted', 'systemDeleted', 'defaultDeleted']),
    }),
    shortlists: PropTypes.shape({
      ready: PropTypes.bool.isRequired,
      selected: PropTypes.arrayOf(PropTypes.string).isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    summary: PropTypes.shape({
      createdBy: PropTypes.string,
      profileCreatedBy: PropTypes.string,
    }),
    presence: PropTypes.shape({
      onlineStatus: PropTypes.onlineStatus.isRequired,
      lastOnlineDetails: PropTypes.string,
      chatIcon: PropTypes.string,
    }).isRequired,
  }).isRequired,
  shortlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isHovered: PropTypes.bool,
  isCarousel: PropTypes.bool,
  settings: PropTypes.shape({
    isHidden: PropTypes.bool.isRequired,
    isPaidUser: PropTypes.bool.isRequired,
    canSendPasswordOnConnect: PropTypes.bool.isRequired,
    canConnectWithMessage: PropTypes.bool.isRequired,
  }).isRequired,
  isSearchLinkVisible: PropTypes.bool,
  loadingStyle: PropTypes.oneOf(['full', 'partial', 'none']).isRequired,
  tooltip: PropTypes.shape({
    uid: PropTypes.string,
    position: PropTypes.string.isRequired,
    title: PropTypes.string,
    body: PropTypes.arrayOf(PropTypes.shape(PropTypes.tooltipBody)).isRequired,
    loading: PropTypes.bool,
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  connectMessages: PropTypes.arrayOf(PropTypes.shape(PropTypes.connectMessage)),
  contact: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  request: PropTypes.shape({
    details: PropTypes.shape({
      count: PropTypes.number,
      request_type: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  onChatNow: PropTypes.func,
  onShowContactDetails: PropTypes.func,
  wwwBaseUrl: PropTypes.string,
  nextUrl: PropTypes.string,
  profilePageBucket: PropTypes.string,
  eoiClose: PropTypes.bool,
  actionType: PropTypes.string,
};

export default Eoi;
