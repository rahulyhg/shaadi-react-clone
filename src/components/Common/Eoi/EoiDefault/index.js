import React from 'react';
import PropTypes from '../../../../PropTypes';
import List from './list';
import SimilarProfile from './similarProfile';
import Grid from './grid';
import Profile from './profile';
import ProfileB from './profileB';
import DailyRecommendations from './dailyRecommendations';
import DashBoard from './dashboard';
import DailyRecommendationsB from './dailyRecommendationsB';
import PremiumCarouselButton from '../../PremiumButton';
import Inbox from './inbox';
import s from './styles';
import ss from '../styles';

const EoiDefault = props => {
  switch (props.type) {
    case 'featured':
    case 'inbox':
      if (props.justNow && props.isConnectLimitExceeded) {
        return (
          <s.LimitExceed isVisible>
            <s.LimitExceedText>Invitation limit exceeded.</s.LimitExceedText>
          </s.LimitExceed>
        );
      }
      return (
        <Inbox
          type={props.type}
          status={props.status}
          justNow={props.justNow}
          isHovered={props.isHovered}
          isPartialLoading={props.isPartialLoading}
          isPaidUser={props.settings.isPaidUser}
          onConnect={props.onConnect}
          membershipTags={props.membershipTags}
          listType={props.listType}
          isHidden={props.settings.isHidden}
          hisHer={props.hisHer}
          hiddenReason={props.hiddenReason}
          onDelete={props.onDelete}
          isHorizontal={props.isHorizontal}
          isDeleted={props.isDeleted}
          canCommunicate={props.canCommunicate}
        />
      );
    case 'list':
      if (props.justNow && props.isConnectLimitExceeded) {
        return (
          <s.LimitExceed isVisible>
            <s.LimitExceedText>Invitation limit exceeded.</s.LimitExceedText>
          </s.LimitExceed>
        );
      }
      return (
        <List
          type={props.type}
          status={props.status}
          justNow={props.justNow}
          himHer={props.himHer}
          hisHer={props.hisHer}
          isSameGender={props.isSameGender}
          isHovered={props.isHovered}
          isPartialLoading={props.isPartialLoading}
          canSendPasswordOnConnect={props.settings.canSendPasswordOnConnect}
          canConnectWithMessage={props.settings.canConnectWithMessage}
          isHidden={props.settings.isHidden}
          shortlistItems={props.shortlistItems}
          shortlists={props.shortlists}
          isPaidUser={props.settings.isPaidUser}
          onShortlistOpen={props.onShortlistOpen}
          onDirectlyShortlist={props.onDirectlyShortlist}
          onAddToShortlist={props.onAddToShortlist}
          onCreateShortlist={props.onCreateShortlist}
          onConnect={props.onConnect}
          onConnectWithPassword={props.onConnectWithPassword}
          onIgnore={props.onIgnore}
          membershipTags={props.membershipTags}
          onCallConsultant={props.onCallConsultant}
          onChatNow={props.onChatNow}
          onShowContactDetails={props.onShowContactDetails}
          canCommunicate={props.canCommunicate}
        />
      );
    case 'dashboard': {
      return <DashBoard />;
    }
    case 'similarProfile':
      if (props.justNow && props.isConnectLimitExceeded) {
        return (
          <s.LimitExceed isVisible>
            <s.LimitExceedText>Invitation limit exceeded.</s.LimitExceedText>
          </s.LimitExceed>
        );
      }
      return (
        <SimilarProfile
          type={props.type}
          status={props.status}
          justNow={props.justNow}
          himHer={props.himHer}
          hisHer={props.hisHer}
          isSameGender={props.isSameGender}
          isHovered={props.isHovered}
          isPartialLoading={props.isPartialLoading}
          canSendPasswordOnConnect={props.settings.canSendPasswordOnConnect}
          canConnectWithMessage={props.settings.canConnectWithMessage}
          isHidden={props.settings.isHidden}
          shortlistItems={props.shortlistItems}
          shortlists={props.shortlists}
          isPaidUser={props.settings.isPaidUser}
          onShortlistOpen={props.onShortlistOpen}
          onDirectlyShortlist={props.onDirectlyShortlist}
          onAddToShortlist={props.onAddToShortlist}
          onCreateShortlist={props.onCreateShortlist}
          onConnect={props.onConnect}
          onConnectWithPassword={props.onConnectWithPassword}
          onIgnore={props.onIgnore}
          membershipTags={props.membershipTags}
          onCallConsultant={props.onCallConsultant}
          onChatNow={props.onChatNow}
          onShowContactDetails={props.onShowContactDetails}
        />
      );
    case 'grid':
      return (
        <Grid
          type={props.type}
          status={props.status}
          himHer={props.himHer}
          heShe={props.heShe}
          hisHer={props.hisHer}
          isCarousel={props.isCarousel}
          justNow={props.justNow}
          justNowText={props.justNowText}
          isPartialLoading={props.isPartialLoading}
          canSendPasswordOnConnect={props.settings.canSendPasswordOnConnect}
          canConnectWithMessage={props.settings.canConnectWithMessage}
          shortlistItems={props.shortlistItems}
          shortlists={props.shortlists}
          onShortlistOpen={props.onShortlistOpen}
          onDirectlyShortlist={props.onDirectlyShortlist}
          isHidden={props.settings.isHidden}
          onAddToShortlist={props.onAddToShortlist}
          onCreateShortlist={props.onCreateShortlist}
          onConnect={props.onConnect}
          onConnectWithPassword={props.onConnectWithPassword}
          onIgnore={props.onIgnore}
        />
      );
    case 'premiumCarousel':
      return (
        <PremiumCarouselButton
          connectPremiumCarousel={props.connectPremiumCarousel}
          onConnectWithPassword={props.onConnectWithPassword}
          status={props.status}
          eoiClose={props.eoiClose}
        />
      );
    case 'chat':
      if (props.status !== 'cancelled') {
        return (
          <s.InvitationActions isVisible chatMode={props.chatMode}>
            <s.ChatInvitationBtn isVisible onClick={props.onConnect}>
              Connect
            </s.ChatInvitationBtn>
          </s.InvitationActions>
        );
      }

      return (
        <ss.InvitationStatus isVisible>
          <ss.InviteStatusIcon status={props.status} />
          <ss.InviteStatusText status={props.status}>Cancelled</ss.InviteStatusText>
        </ss.InvitationStatus>
      );

    case 'profile':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <ProfileB
            type={props.type}
            status={props.status}
            himHer={props.himHer}
            hisHer={props.hisHer}
            note={props.note}
            isHovered={props.isHovered}
            justNow={props.justNow}
            justNowText={props.justNowText}
            isSameGender={props.isSameGender}
            canSendPasswordOnConnect={props.settings.canSendPasswordOnConnect}
            canConnectWithMessage={props.settings.canConnectWithMessage}
            shortlistItems={props.shortlistItems}
            shortlists={props.shortlists}
            onShortlistOpen={props.onShortlistOpen}
            onDirectlyShortlist={props.onDirectlyShortlist}
            onAddToShortlist={props.onAddToShortlist}
            onCreateShortlist={props.onCreateShortlist}
            onConnect={props.onConnect}
            onIgnore={props.onIgnore}
            name={props.name}
            request={props.request}
            onViewRequest={props.onViewRequest}
            isLoggerBothPartyPayUser={props.settings.isBothPartyPayUser}
            showHistory={props.showHistory}
            onViewHistory={props.onViewHistory}
            connectionAction={props.connectionAction}
            heShe={props.heShe}
            isPaidUser={props.settings.isPaidUser}
            membershipTags={props.membershipTags}
            onCallConsultant={props.onCallConsultant}
            onChatNow={props.onChatNow}
            onViewPhoneNoClick={props.onViewPhoneNoClick}
            canCommunicate={props.canCommunicate}
          />
        );
      }

      if (props.justNow) {
        return (
          <div>
            <s.ProfileStatusIcon status={props.justNowIcon || 'contacted'} />
            <s.ProfileStatusText>{props.justNowText || 'Invitation Sent'}&nbsp;</s.ProfileStatusText>
            <s.ProfileSearchLinkWrap isVisible={props.isSearchLinkVisible}>
              {'('}Go to&nbsp;
              <s.ProfileSearchLink to="/search" isExternal>
                Partner Search
              </s.ProfileSearchLink>
              {')'}
            </s.ProfileSearchLinkWrap>
          </div>
        );
      }
      return (
        <Profile
          type={props.type}
          status={props.status}
          himHer={props.himHer}
          hisHer={props.hisHer}
          note={props.note}
          isHovered={props.isHovered}
          justNow={props.justNow}
          justNowText={props.justNowText}
          isSameGender={props.isSameGender}
          canSendPasswordOnConnect={props.settings.canSendPasswordOnConnect}
          canConnectWithMessage={props.settings.canConnectWithMessage}
          shortlistItems={props.shortlistItems}
          shortlists={props.shortlists}
          onShortlistOpen={props.onShortlistOpen}
          onDirectlyShortlist={props.onDirectlyShortlist}
          onAddToShortlist={props.onAddToShortlist}
          onCreateShortlist={props.onCreateShortlist}
          onConnect={props.onConnect}
          onIgnore={props.onIgnore}
          name={props.name}
          request={props.request}
          onViewRequest={props.onViewRequest}
          isLoggerBothPartyPayUser={props.settings.isBothPartyPayUser}
          showHistory={props.showHistory}
          onViewHistory={props.onViewHistory}
          connectionAction={props.connectionAction}
          heShe={props.heShe}
        />
      );
    case 'dailyRecommendations':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <DailyRecommendationsB
            status={props.status}
            himHer={props.himHer}
            isHovered={props.isHovered}
            justNow={props.justNow}
            justNowText={props.justNowText}
            settings={props.settings}
            isSameGender={props.isSameGender}
            shortlistItems={props.shortlistItems}
            shortlists={props.shortlists}
            onShortlistOpen={props.onShortlistOpen}
            onDirectlyShortlist={props.onDirectlyShortlist}
            onAddToShortlist={props.onAddToShortlist}
            onCreateShortlist={props.onCreateShortlist}
            onConnect={props.onConnect}
            onIgnore={props.onIgnore}
            name={props.name}
            request={props.request}
            onViewRequest={props.onViewRequest}
            heShe={props.heShe}
            profileCreatedBy={props.profileCreatedBy}
            lastOnlineDetails={props.lastOnlineDetails}
            profileid={props.profileid}
            userHandle={props.userHandle}
            wwwBaseUrl={props.wwwBaseUrl}
            nextUrl={props.nextUrl}
            drAction={props.drAction}
            onViewPhoneNoClick={props.onViewPhoneNoClick}
            onSendEmailClick={props.onSendEmailClick}
            presence={props.presence}
            onChatNow={props.onChatNow}
            isPaidUser={props.settings.isPaidUser}
            membershipTags={props.membershipTags}
            canCommunicate={props.canCommunicate}
          />
        );
      }
      return (
        <DailyRecommendations
          status={props.status}
          himHer={props.himHer}
          isHovered={props.isHovered}
          justNow={props.justNow}
          justNowText={props.justNowText}
          settings={props.settings}
          isSameGender={props.isSameGender}
          shortlistItems={props.shortlistItems}
          shortlists={props.shortlists}
          onShortlistOpen={props.onShortlistOpen}
          onDirectlyShortlist={props.onDirectlyShortlist}
          onAddToShortlist={props.onAddToShortlist}
          onCreateShortlist={props.onCreateShortlist}
          onConnect={props.onConnect}
          onIgnore={props.onIgnore}
          name={props.name}
          request={props.request}
          onViewRequest={props.onViewRequest}
          heShe={props.heShe}
          profileCreatedBy={props.profileCreatedBy}
          lastOnlineDetails={props.lastOnlineDetails}
          profileid={props.profileid}
          userHandle={props.userHandle}
          wwwBaseUrl={props.wwwBaseUrl}
          nextUrl={props.nextUrl}
          drAction={props.drAction}
          onViewPhoneNoClick={props.onViewPhoneNoClick}
          onSendEmailClick={props.onSendEmailClick}
          presence={props.presence}
          onChatNow={props.onChatNow}
        />
      );
    default:
      return null;
  }
};

EoiDefault.defaultProps = {
  note: null,
  isHovered: false,
  isCarousel: false,
  justNowText: null,
  justNowIcon: null,
  isSearchLinkVisible: false,
  chatMode: 'chatProfileCard',
  isConnectLimitExceeded: null,
  isBothPartyPayUser: false,
  showHistory: false,
  request: {
    details: {
      count: 0,
      request_type: [],
    },
  },
  presence: PropTypes.shape({
    onlineStatus: null,
    lastOnlineDetails: null,
    chatIcon: null,
  }).isRequired,
  connectionAction: '',
  profileCreatedBy: null,
  lastOnlineDetails: null,
  profileid: null,
  userHandle: null,
  drAction: null,
  onSendEmailClick: null,
  onViewPhoneNoClick: null,
  onChatNow: null,
  onShowContactDetails: null,
  listType: '',
  isHidden: false,
  isDeleted: false,
  isHorizontal: false,
  hiddenReason: '',
  onDelete: null,
  profilePageBucket: 'A',
  canCommunicate: false,
  eoiClose: false,
};

EoiDefault.propTypes = {
  type: PropTypes.oneOf(['grid', 'list', 'profile', 'chat', 'premiumCarousel', 'dailyRecommendations', 'inbox', 'similarProfile'])
    .isRequired,
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
  status: PropTypes.connectionStatus.isRequired,
  justNow: PropTypes.bool.isRequired,
  justNowText: PropTypes.string,
  justNowIcon: PropTypes.string,
  isSearchLinkVisible: PropTypes.bool,
  onSendEmailClick: PropTypes.func,
  onViewPhoneNoClick: PropTypes.func,
  isConnectLimitExceeded: PropTypes.bool,
  isSameGender: PropTypes.bool.isRequired,
  note: PropTypes.string,
  isPartialLoading: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool.isRequired,
  isCarousel: PropTypes.bool,
  name: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  hiddenReason: PropTypes.string,
  onDelete: PropTypes.func,
  isHorizontal: PropTypes.bool,
  isDeleted: PropTypes.bool,
  listType: PropTypes.string,
  settings: PropTypes.shape({
    canSendPasswordOnConnect: PropTypes.bool.isRequired,
    canConnectWithMessage: PropTypes.bool.isRequired,
    isHidden: PropTypes.bool.isRequired,
    isPaidUser: PropTypes.bool.isRequired,
    isBothPartyPayUser: PropTypes.bool,
  }).isRequired,
  shortlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  shortlists: PropTypes.shape({
    ready: PropTypes.bool.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  onShortlistOpen: PropTypes.func.isRequired,
  onDirectlyShortlist: PropTypes.func.isRequired,
  onAddToShortlist: PropTypes.func.isRequired,
  onCreateShortlist: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onConnectWithPassword: PropTypes.func.isRequired,
  onIgnore: PropTypes.func.isRequired,
  chatMode: PropTypes.oneOf(['chatProfileCard', 'chatWindow']),
  onViewHistory: PropTypes.func.isRequired,
  showHistory: PropTypes.bool,
  onViewRequest: PropTypes.func.isRequired,
  request: PropTypes.shape({
    details: PropTypes.shape({
      count: PropTypes.number,
      request_type: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  presence: PropTypes.shape({
    onlineStatus: PropTypes.onlineStatus,
    lastOnlineDetails: PropTypes.string,
    chatIcon: PropTypes.string,
  }).isRequired,
  connectionAction: PropTypes.string,
  membershipTags: PropTypes.string.isRequired,
  canCommunicate: PropTypes.bool,
  onCallConsultant: PropTypes.func.isRequired,
  onChatNow: PropTypes.func,
  onShowContactDetails: PropTypes.func,
  connectPremiumCarousel: PropTypes.func.isRequired,
  profileCreatedBy: PropTypes.string,
  lastOnlineDetails: PropTypes.string,
  profileid: PropTypes.string,
  userHandle: PropTypes.string,
  wwwBaseUrl: PropTypes.string.isRequired,
  nextUrl: PropTypes.string.isRequired,
  drAction: PropTypes.string,
  profilePageBucket: PropTypes.string,
  eoiClose: PropTypes.bool,
};

export default EoiDefault;
