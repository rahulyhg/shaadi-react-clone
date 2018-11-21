import React from 'react';
import PropTypes from '../../../../PropTypes';
import List from './list';
import Grid from './grid';
import Chat from './chat';
import PremiumCarousel from './premiumCarousel';
import Profile from './profile';
import ProfileB from './profileB';
import DailyRecommendations from './dailyRecommendations';
import DailyRecommendationsB from './dailyRecommendationsB';
import Inbox from './inbox';
import SimilarProfile from './similarProfile';
import DashBoard from './DashBoard';
import s from './styles';

const EoiTheyContacted = props => {
  switch (props.type) {
    case 'dashboard': {
      return (
        <DashBoard
          hisHer={props.hisHer}
          status={props.status}
          justNow={props.justNow}
          isHidden={props.isHidden}
          hiddenReason={props.hiddenReason}
          isHovered={props.isHovered}
          canConnectWithMessage={props.settings.canConnectWithMessage}
          onAccept={props.onAccept}
          onDecline={props.onDecline}
          membershipTags={props.membershipTags}
          profileid={props.profileid}
        />
      );
    }
    case 'featured':
    case 'inbox':
      return (
        <Inbox
          type={props.type}
          heShe={props.heShe}
          hisHer={props.hisHer}
          status={props.status}
          justNow={props.justNow}
          isHidden={props.isHidden}
          hiddenReason={props.hiddenReason}
          isHovered={props.isHovered}
          canConnectWithMessage={props.settings.canConnectWithMessage}
          canSendPasswordOnConnect={props.settings.canSendPasswordOnConnect}
          onAccept={props.onAccept}
          onDecline={props.onDecline}
          onDeclineWithMessage={props.onDeclineWithMessage}
          onDeclineWithDelete={props.onDeclineWithDelete}
          onDelete={props.onDelete}
          membershipTags={props.membershipTags}
          listType={props.listType}
          profileid={props.profileid}
        />
      );
    case 'list':
      return (
        <List
          type={props.type}
          heShe={props.heShe}
          status={props.status}
          justNow={props.justNow}
          isDeleted={props.isDeleted}
          isHovered={props.isHovered}
          canConnectWithMessage={props.settings.canConnectWithMessage}
          canSendPasswordOnConnect={props.settings.canSendPasswordOnConnect}
          onAccept={props.onAccept}
          onDecline={props.onDecline}
          onDeclineWithMessage={props.onDeclineWithMessage}
          onDeclineWithDelete={props.onDeclineWithDelete}
          membershipTags={props.membershipTags}
        />
      );
    case 'premiumCarousel':
      return (
        <PremiumCarousel
          type={props.type}
          status={props.status}
          onAcceptPremiumCarousel={props.onAcceptPremiumCarousel}
          eoiClose={props.eoiClose}
        />
      );
    case 'grid':
      return (
        <Grid
          type={props.type}
          status={props.status}
          justNow={props.justNow}
          himHer={props.himHer}
          hisHer={props.hisHer}
          isDeleted={props.isDeleted}
          isCarousel={props.isCarousel}
          canConnectWithMessage={props.settings.canConnectWithMessage}
          canSendPasswordOnConnect={props.settings.canSendPasswordOnConnect}
          onAccept={props.onAccept}
          onDecline={props.onDecline}
          onDeclineWithMessage={props.onDeclineWithMessage}
          onDeclineWithDelete={props.onDeclineWithDelete}
        />
      );
    case 'chat':
      return <Chat onAccept={props.onAccept} onDecline={props.onDecline} chatMode={props.chatMode} />;
    case 'profile':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <ProfileB
            type={props.type}
            status={props.status}
            justNow={props.justNow}
            note={props.note}
            heShe={props.heShe}
            isPaidUser={props.settings.isPaidUser}
            isDeleted={props.isDeleted}
            canConnectWithMessage={props.settings.canConnectWithMessage}
            canSendPasswordOnConnect={props.settings.canSendPasswordOnConnect}
            onAccept={props.onAccept}
            onDecline={props.onDecline}
            onDeclineWithMessage={props.onDeclineWithMessage}
            onDeclineWithDelete={props.onDeclineWithDelete}
            connectMessages={props.connectMessages}
            modalShowCount={props.modalShowCount}
            contact={props.contact}
            isLoggerBothPartyPayUser={props.settings.isBothPartyPayUser}
            profileName={props.profileName}
            onViewHistory={props.onViewHistory}
            onViewRequest={props.onViewRequest}
            showHistory={props.showHistory}
            connectionAction={props.connectionAction}
            request={props.request}
            isProfileFree={props.isProfileFree}
            membershipTags={props.membershipTags}
            isHovered={props.isHovered}
          />
        );
      }
      if (props.justNow) {
        return (
          <div>
            <s.ProfileStatusIcon status={props.justNowIcon || 'declined'} />
            <s.ProfileStatusText>{props.justNowText || 'Invitation Declined'}&nbsp;</s.ProfileStatusText>
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
          justNow={props.justNow}
          note={props.note}
          heShe={props.heShe}
          isPaidUser={props.settings.isPaidUser}
          isDeleted={props.isDeleted}
          canConnectWithMessage={props.settings.canConnectWithMessage}
          canSendPasswordOnConnect={props.settings.canSendPasswordOnConnect}
          onAccept={props.onAccept}
          onDecline={props.onDecline}
          onDeclineWithMessage={props.onDeclineWithMessage}
          onDeclineWithDelete={props.onDeclineWithDelete}
          connectMessages={props.connectMessages}
          modalShowCount={props.modalShowCount}
          contact={props.contact}
          isLoggerBothPartyPayUser={props.settings.isBothPartyPayUser}
          profileName={props.profileName}
          onViewHistory={props.onViewHistory}
          onViewRequest={props.onViewRequest}
          showHistory={props.showHistory}
          connectionAction={props.connectionAction}
          request={props.request}
          isProfileFree={props.isProfileFree}
        />
      );
    case 'dailyRecommendations':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <DailyRecommendationsB
            himHer={props.himHer}
            onAccept={props.onAccept}
            onDecline={props.onDecline}
            profileName={props.profileName}
            profileCreatedBy={props.profileCreatedBy}
            lastOnlineDetails={props.lastOnlineDetails}
            profileid={props.profileid}
            userHandle={props.userHandle}
            wwwBaseUrl={props.wwwBaseUrl}
            nextUrl={props.nextUrl}
            onDirectlyShortlist={props.onDirectlyShortlist}
            presence={props.presence}
            onChatNow={props.onChatNow}
            heShe={props.heShe}
            canCommunicate={props.canCommunicate}
            isPaidUser={props.settings.isPaidUser}
          />
        );
      }
      if (props.justNow) {
        return (
          <div>
            <s.ProfileStatusIcon status={props.justNowIcon || 'declined'} />
            <s.ProfileStatusText>{props.justNowText || 'Invitation Declined'}&nbsp;</s.ProfileStatusText>
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
        <DailyRecommendations
          onAccept={props.onAccept}
          onDecline={props.onDecline}
          profileName={props.profileName}
          profileCreatedBy={props.profileCreatedBy}
          lastOnlineDetails={props.lastOnlineDetails}
          profileid={props.profileid}
          userHandle={props.userHandle}
          wwwBaseUrl={props.wwwBaseUrl}
          nextUrl={props.nextUrl}
          onDirectlyShortlist={props.onDirectlyShortlist}
          presence={props.presence}
          onChatNow={props.onChatNow}
        />
      );
    case 'widget':
    case 'similarProfile':
      return (
        <SimilarProfile
          type={props.type}
          heShe={props.heShe}
          hisHer={props.hisHer}
          status={props.status}
          justNow={props.justNow}
          isHidden={props.isHidden}
          isDeleted={props.isDeleted}
          hiddenReason={props.hiddenReason}
          isHovered={props.isHovered}
          canConnectWithMessage={props.settings.canConnectWithMessage}
          canSendPasswordOnConnect={props.settings.canSendPasswordOnConnect}
          onAccept={props.onAccept}
          onDecline={props.onDecline}
          onDeclineWithMessage={props.onDeclineWithMessage}
          onDeclineWithDelete={props.onDeclineWithDelete}
          onDelete={props.onDelete}
          membershipTags={props.membershipTags}
          listType={props.listType}
          profileid={props.profileid}
          isSameGender={props.isSameGender}
        />
      );
    default:
      return null;
  }
};

EoiTheyContacted.defaultProps = {
  note: null,
  isHovered: false,
  chatMode: 'chatProfileCard',
  contact: {},
  showHistory: false,
  isBothPartyPayUser: false,
  connectionAction: '',
  isCarousel: false,
  listType: '',
  request: {
    details: {
      count: 0,
      request_type: [],
    },
  },
  profileName: null,
  justNowText: '',
  justNowIcon: '',
  isSearchLinkVisible: false,
  isProfileFree: true,
  profileCreatedBy: null,
  lastOnlineDetails: null,
  profileid: null,
  userHandle: null,
  wwwBaseUrl: null,
  nextUrl: null,
  onDirectlyShortlist: null,
  isHidden: false,
  hiddenReason: null,
  onChatNow: null,
  onDelete: null,
  profilePageBucket: 'A',
  isSameGender: false,
  eoiClose: false,
  canCommunicate: false,
};

EoiTheyContacted.propTypes = {
  type: PropTypes.oneOf([
    'grid',
    'list',
    'profile',
    'chat',
    'premiumCarousel',
    'dailyRecommendations',
    'inbox',
    'featured',
    'similarProfile',
  ]).isRequired,
  himHer: PropTypes.himHer.isRequired,
  hisHer: PropTypes.hisHer.isRequired,
  heShe: PropTypes.heShe.isRequired,
  status: PropTypes.connectionStatus.isRequired,
  isCarousel: PropTypes.bool,
  note: PropTypes.string,
  isDeleted: PropTypes.bool.isRequired,
  isHidden: PropTypes.bool,
  isSameGender: PropTypes.bool,
  hiddenReason: PropTypes.oneOf(['selfHidden', 'systemHidden', 'selfDeleted', 'systemDeleted', 'defaultDeleted']),
  isHovered: PropTypes.bool.isRequired,
  justNow: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    canConnectWithMessage: PropTypes.bool.isRequired,
    canSendPasswordOnConnect: PropTypes.bool.isRequired,
    isPaidUser: PropTypes.bool.isRequired,
    isBothPartyPayUser: PropTypes.bool,
    isHidden: PropTypes.bool,
  }).isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  onDeclineWithMessage: PropTypes.func.isRequired,
  modalShowCount: PropTypes.number.isRequired,
  onDeclineWithDelete: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onChatNow: PropTypes.func,
  chatMode: PropTypes.oneOf(['chatProfileCard', 'chatWindow']),
  connectMessages: PropTypes.arrayOf(PropTypes.shape(PropTypes.connectMessage)).isRequired,
  contact: PropTypes.object, // eslint-disable-line react/forbid-prop-types,
  profileName: PropTypes.string,
  onViewHistory: PropTypes.func.isRequired,
  onViewRequest: PropTypes.func.isRequired,
  showHistory: PropTypes.bool,
  connectionAction: PropTypes.string,
  request: PropTypes.shape({
    details: PropTypes.shape({
      count: PropTypes.number,
      request_type: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  presence: PropTypes.shape({
    onlineStatus: PropTypes.onlineStatus.isRequired,
    lastOnlineDetails: PropTypes.string.isRequired,
    chatIcon: PropTypes.string.isRequired,
  }).isRequired,
  justNowText: PropTypes.string,
  justNowIcon: PropTypes.string,
  isSearchLinkVisible: PropTypes.bool,
  isProfileFree: PropTypes.bool,
  membershipTags: PropTypes.string.isRequired,
  onAcceptPremiumCarousel: PropTypes.func.isRequired,
  profileCreatedBy: PropTypes.string,
  lastOnlineDetails: PropTypes.string,
  profileid: PropTypes.string,
  userHandle: PropTypes.string,
  wwwBaseUrl: PropTypes.string,
  nextUrl: PropTypes.string,
  onDirectlyShortlist: PropTypes.func,
  listType: PropTypes.string,
  profilePageBucket: PropTypes.string,
  eoiClose: PropTypes.bool,
  canCommunicate: PropTypes.bool,
};

export default EoiTheyContacted;
