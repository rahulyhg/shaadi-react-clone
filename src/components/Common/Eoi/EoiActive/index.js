import React, { Fragment } from 'react';
import PropTypes from '../../../../PropTypes';
import Profile from './profile';
import ProfileB from './profileB';
import SvgCheckmark from '../../../Common/SvgCheckmark';
import DailyRecommendations from './dailyRecommendations';
import DailyRecommendationsB from './dailyRecommendationsB';
import DashBoard from './DashBoard';
import EoiMessage from '../EoiMessage';
import Inbox from './inbox';
import s from '../styles';
import ss from './styles';
import Timer from '../../../../helpers/timer';

const connectionStatusMap = {
  contacted: 'Invitation Sent',
  misuseReported: 'Misuse Reported',
  theyAccepted: 'Accepted',
  accepted: 'Accepted',
  declined: 'Declined',
  theyDeclined: 'Declined',
  cancelled: 'Cancelled',
  theyCancelled: 'Cancelled',
};

const ProfileStatusMap = {
  accepted: 'Invitation Accepted',
  declined: 'Declined',
  contacted: 'Invitation Sent',
  shortlisted: `Added to My Maybe's`,
  misuseReported: 'Complaint raised for misuse ',
  respondLater: 'Added to respond later',
};

const membershipTags = {
  diamond_plus: `Diamond+`,
  platinum_plus: `Platinum+`,
};

const acceptableContactStatus = ['declined', 'accepted', 'theyAccepted', 'theyDeclined', 'theyCancelled'];

const isPremiumFeature = props => props.settings.isPaidUser || props.canCommunicate;
const isPremiumFeatureForWriteMsg = props => props.settings.isPaidUser || (props.canCommunicate && !props.settings.isBothPartyPayUser);

const upgradeLink = profileId => (
  <Fragment>
    <s.UpgradeTextLink isExternal to={`/payment?loc=list&profileid=${profileId}&source=search_listing`} target="_blank">
      Upgrade&nbsp;
    </s.UpgradeTextLink>
  </Fragment>
);

const EoiActive = props => {
  if (!acceptableContactStatus.includes(props.status)) {
    return null;
  }
  const searchConnectionStatusMap = {
    ...connectionStatusMap,
    accepted: 'Invitation Accepted!',
    theyAccepted: `${props.heShe} Accepted your Invitation!`,
    declined: `You declined ${props.hisHer.toLowerCase()} Invitation`,
    theyDeclined: `${props.heShe} Declined your Invitation. This member cannot be contacted.`,
    theyCancelled: `${props.heShe} Cancelled  ${props.hisHer.toLowerCase()} Invitation. This member cannot be contacted.`,
  };

  const gridConnectionStatusMap = {
    ...connectionStatusMap,
    accepted: 'Accepted Member',
  };
  switch (props.type) {
    case 'dashboard':
      return (
        <DashBoard
          type={props.type}
          justNow={props.justNow}
          status={props.status}
          heShe={props.heShe}
          onChatNow={props.onChatNow}
          onShowContactDetails={props.onShowContactDetails}
          isPaidUser={props.settings.isPaidUser}
          membershipTags={props.membershipTags}
        />
      );
    case 'featured':
    case 'inbox':
      return (
        <Inbox
          type={props.type}
          status={props.status}
          hisHer={props.hisHer}
          himHer={props.himHer}
          isDeleted={props.isDeleted}
          isHidden={props.isHidden}
          justNow={props.justNow}
          hiddenReason={props.hiddenReason}
          isHovered={props.isHovered}
          onChatNow={props.onChatNow}
          heShe={props.heShe}
          profileId={props.profileId}
          isPaidUser={props.settings.isPaidUser}
          membershipTags={props.membershipTags}
          onShowContactDetails={props.onShowContactDetails}
          searchConnectionStatusMap={searchConnectionStatusMap}
          isHorizontal={props.isHorizontal}
          onAccept={props.onAccept}
          listType={props.listType}
          onDeclineWithDelete={props.onDeclineWithDelete}
          onDelete={props.onDelete}
          canCommunicate={props.canCommunicate}
          isLoggerBothPartyPayUser={props.settings.isBothPartyPayUser}
        />
      );

    case 'list':
      return (
        <s.StatusSuccess isVisible membershipType={props.membershipTags}>
          {!['accepted', 'theyAccepted'].includes(props.status) && (
            <s.StatusText
              isDeclinedMsg={!!(props.status === 'declined' || props.status === 'theyDeclined' || props.status === 'theyCancelled')}
              isSingleLineMsg={props.status === 'declined'}
            >
              {props.isDeleted ? 'Deleted' : searchConnectionStatusMap[props.status]}
            </s.StatusText>
          )}
          {['accepted', 'theyAccepted'].includes(props.status) && (
            <s.AcceptedMsgWrap>
              {props.settings.isPaidUser ? (
                props.justNow ? (
                  <s.PremSuccessMsg>
                    <s.StatusText isSingleLine isItalicText>
                      <SvgCheckmark isListingSvg />
                      Invitation Accepted<br />
                      Contact {props.himHer.toLowerCase()} directly
                    </s.StatusText>
                  </s.PremSuccessMsg>
                ) : (
                  <s.PremSuccessMsg>
                    <s.StatusText isSingleLine isItalicText>
                      <s.SuccessTickImg />
                      Invitation Accepted<br />
                      Contact {props.himHer.toLowerCase()} directly
                    </s.StatusText>
                  </s.PremSuccessMsg>
                )
              ) : props.justNow ? (
                <s.StatusText isSingleLine isItalicText>
                  <SvgCheckmark isListingSvg />
                  Invitation Accepted<br />
                  {!props.canCommunicate && upgradeLink(props.profileId)}
                  {!props.canCommunicate
                    ? `to contact ${props.himHer.toLowerCase()} directly`
                    : `You can contact a ${membershipTags[props.membershipTags] || ''} Member`}
                </s.StatusText>
              ) : (
                <s.StatusText isSingleLine isItalicText>
                  <s.SuccessTickImg />
                  Invitation Accepted<br />
                  {!props.canCommunicate && upgradeLink(props.profileId)}
                  {!props.canCommunicate
                    ? `to contact ${props.himHer.toLowerCase()} directly`
                    : `You can contact a ${membershipTags[props.membershipTags] || ''} Member`}
                </s.StatusText>
              )}
              <s.ActiveBtnWrap>
                {props.membershipTags === 'vip' ? (
                  <s.WriteMessageBtnVip
                    onClick={props.onChatNow}
                    isHovered={props.isHovered}
                    isPaidUser={props.settings.isPaidUser}
                    title="Write Message"
                  />
                ) : (
                  <s.WriteMessageBtn
                    onClick={props.onChatNow}
                    isHovered={props.isHovered}
                    isPaidUser={isPremiumFeatureForWriteMsg(props)}
                    title="Write Message"
                  />
                )}
                <s.WriteMessageBtnText
                  onClick={props.onChatNow}
                  isHovered={props.isHovered}
                  isPaidUser={isPremiumFeatureForWriteMsg(props)}
                  membershipTags={props.membershipTags}
                >
                  Write Message
                </s.WriteMessageBtnText>
                {props.membershipTags === 'vip' ? (
                  <s.VewContactBtnVip
                    onClick={props.settings.isPaidUser ? props.onShowContactDetails : props.onChatNow}
                    isHovered={props.isHovered}
                    isPaidUser={props.settings.isPaidUser}
                    title="View Contact"
                  />
                ) : (
                  <s.VewContactBtn
                    onClick={isPremiumFeature(props) ? props.onShowContactDetails : props.onChatNow}
                    isHovered={props.isHovered}
                    isPaidUser={isPremiumFeature(props)}
                    title="View Contact"
                  />
                )}
                <s.VewContactBtnText
                  onClick={isPremiumFeature(props) ? props.onShowContactDetails : props.onChatNow}
                  isHovered={props.isHovered}
                  isPaidUser={isPremiumFeature(props)}
                  membershipTags={props.membershipTags}
                >
                  View Contact
                </s.VewContactBtnText>
              </s.ActiveBtnWrap>
            </s.AcceptedMsgWrap>
          )}
        </s.StatusSuccess>
      );
    case 'grid':
      return (
        <s.GridStyle>
          <s.InvitationGridStatus isVisible status={props.status}>
            <s.StatusTextGrid>{props.isDeleted ? 'Deleted' : gridConnectionStatusMap[props.status]}</s.StatusTextGrid>
          </s.InvitationGridStatus>
        </s.GridStyle>
      );
    case 'premiumCarousel':
      return (
        <Timer
          loader={
            <s.TickContainer>
              {' '}
              <SvgCheckmark isPremiumCarousel />
            </s.TickContainer>
          }
          response={
            props.isDeleted ? (
              <s.carouselConnectedBtn>Deleted</s.carouselConnectedBtn>
            ) : (
              <s.carouselConnectedBtn
                onClick={props.onChatNow}
                isHovered={props.isHovered}
                isPaidUser={props.settings.isPaidUser}
                membershipTags={props.membershipTags}
              >
                Write Message
              </s.carouselConnectedBtn>
            )
          }
          time={1}
        />
      );
    case 'chat': {
      const isVisible = Object.keys(connectionStatusMap).includes(props.status);
      return (
        <s.InvitationStatus isVisible={isVisible}>
          <s.InviteStatusIcon status={props.status} />
          <s.InviteStatusText status={props.status}>{props.isDeleted ? 'Deleted' : connectionStatusMap[props.status]}</s.InviteStatusText>
        </s.InvitationStatus>
      );
    }
    case 'profile':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <ProfileB
            status={props.status}
            note={props.note}
            heShe={props.heShe}
            himHer={props.himHer}
            hisHer={props.hisHer}
            onConnect={props.onConnect}
            onAccept={props.onAccept}
            onDecline={props.onDecline}
            onDeclineWithMessage={props.onDeclineWithMessage}
            onViewHistory={props.onViewHistory}
            showHistory={props.showHistory}
            onBlock={props.onBlock}
            onReportMisuse={props.onReportMisuse}
            onCancel={props.onCancel}
            onSendEmail={props.onSendEmail}
            connectMessages={props.connectMessages}
            contact={props.contact}
            isPaidUser={props.settings.isPaidUser}
            isProfileFree={props.isProfileFree}
            isLoggerBothPartyPayUser={props.settings.isBothPartyPayUser}
            profileName={props.profileName}
            request={props.request}
            onViewRequest={props.onViewRequest}
            membershipTags={props.membershipTags}
            onChatNow={props.onChatNow}
            isHovered={props.isHovered}
            onViewPhoneNoClick={props.onViewPhoneNoClick}
            canCommunicate={props.canCommunicate}
          />
        );
      }
      if (Object.keys(ProfileStatusMap).includes(props.status) && props.justNow) {
        return (
          <div>
            <s.ProfileStatusIcon status={props.justNowIcon || props.status} />
            <s.ProfileStatusText>{props.justNowText || ProfileStatusMap[props.status]}&nbsp;</s.ProfileStatusText>
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
          status={props.status}
          note={props.note}
          heShe={props.heShe}
          himHer={props.himHer}
          hisHer={props.hisHer}
          onConnect={props.onConnect}
          onAccept={props.onAccept}
          onDecline={props.onDecline}
          onDeclineWithMessage={props.onDeclineWithMessage}
          onViewHistory={props.onViewHistory}
          showHistory={props.showHistory}
          onBlock={props.onBlock}
          onReportMisuse={props.onReportMisuse}
          onCancel={props.onCancel}
          onSendEmail={props.onSendEmail}
          connectMessages={props.connectMessages}
          contact={props.contact}
          isPaidUser={props.settings.isPaidUser}
          isProfileFree={props.isProfileFree}
          isLoggerBothPartyPayUser={props.settings.isBothPartyPayUser}
          profileName={props.profileName}
          request={props.request}
          onViewRequest={props.onViewRequest}
        />
      );
    case 'dailyRecommendations':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <DailyRecommendationsB
            status={props.status}
            profileName={props.profileName}
            hisHer={props.hisHer}
            himHer={props.himHer}
            isHovered={props.isHovered}
            onViewPhoneNoClick={props.onViewPhoneNoClick}
            onSendEmailClick={props.onSendEmailClick}
            settings={props.settings}
            justNow={props.justNow}
            justNowText={props.justNowText}
            isSameGender={props.isSameGender}
            onDirectlyShortlist={props.onDirectlyShortlist}
            onAccept={props.onAccept}
            onDecline={props.onDecline}
            name={props.profileName}
            heShe={props.heShe}
            profileCreatedBy={props.profileCreatedBy}
            lastOnlineDetails={props.lastOnlineDetails}
            userHandle={props.userHandle}
            wwwBaseUrl={props.wwwBaseUrl}
            nextUrl={props.nextUrl}
            drAction={props.drAction}
            uid={props.uid}
            presence={props.presence}
            onChatNow={props.onChatNow}
            onCancel={props.onCancel}
            canCommunicate={props.canCommunicate}
            isPaidUser={props.settings.isPaidUser}
            isLoggerBothPartyPayUser={props.settings.isBothPartyPayUser}
          />
        );
      }
      return (
        <DailyRecommendations
          status={props.status}
          profileName={props.profileName}
          hisHer={props.hisHer}
          himHer={props.himHer}
          isHovered={props.isHovered}
          onViewPhoneNoClick={props.onViewPhoneNoClick}
          onSendEmailClick={props.onSendEmailClick}
          settings={props.settings}
          justNow={props.justNow}
          justNowText={props.justNowText}
          isSameGender={props.isSameGender}
          onDirectlyShortlist={props.onDirectlyShortlist}
          onAccept={props.onAccept}
          onDecline={props.onDecline}
          name={props.profileName}
          heShe={props.heShe}
          profileCreatedBy={props.profileCreatedBy}
          lastOnlineDetails={props.lastOnlineDetails}
          userHandle={props.userHandle}
          wwwBaseUrl={props.wwwBaseUrl}
          nextUrl={props.nextUrl}
          drAction={props.drAction}
          uid={props.uid}
          presence={props.presence}
          onChatNow={props.onChatNow}
        />
      );

    case 'similarProfile': {
      if (props.status === 'accepted') {
        return (
          <ss.justNowCase type={props.type}>
            <ss.SvgCheckmark type={props.type}>
              <SvgCheckmark isListingSvg />
            </ss.SvgCheckmark>
            <s.MsgSpacer />
            Invitation Accepted<br />
          </ss.justNowCase>
        );
      }
      return (
        <EoiMessage
          status={props.status}
          type={props.type}
          justNow={props.justNow}
          justNowText="Oops! Something went wrong"
          justNowIcon={props.justNowIcon}
        />
      );
    }
    default:
      return null;
  }
};

EoiActive.defaultProps = {
  note: null,
  isHovered: false,
  justNowText: null,
  justNowIcon: null,
  contact: {},
  showHistory: false,
  isProfileFree: true,
  isBothPartyPayUser: false,
  profileName: null,
  request: {
    details: {
      count: 0,
      request_type: [],
    },
  },
  profileId: '',
  onChatNow: null,
  onShowContactDetails: null,
  membershipTags: '',
  wwwBaseUrl: '',
  uid: null,
  profileCreatedBy: '',
  lastOnlineDetails: '',
  userHandle: '',
  nextUrl: '',
  isSameGender: false,
  drAction: '',
  onSendEmailClick: null,
  onViewPhoneNoClick: null,
  hiddenReason: '',
  isHorizontal: false,
  listType: '',
  onDeclineWithDelete: null,
  onDelete: null,
  profilePageBucket: 'A',
  canCommunicate: false,
};

EoiActive.propTypes = {
  type: PropTypes.oneOf(['grid', 'list', 'profile', 'chat', 'premiumCarousel', 'dailyRecommendations', 'inbox', 'featured']).isRequired,
  heShe: PropTypes.heShe.isRequired,
  himHer: PropTypes.himHer.isRequired,
  hisHer: PropTypes.hisHer.isRequired,
  status: PropTypes.connectionStatus.isRequired,
  note: PropTypes.string,
  justNow: PropTypes.bool.isRequired,
  justNowText: PropTypes.string,
  justNowIcon: PropTypes.string,
  isDeleted: PropTypes.bool.isRequired,
  isHidden: PropTypes.bool.isRequired,
  canCommunicate: PropTypes.bool,
  isHorizontal: PropTypes.bool,
  hiddenReason: PropTypes.oneOf(['', 'selfHidden', 'systemHidden', 'selfDeleted', 'systemDeleted', 'defaultDeleted']),
  isSearchLinkVisible: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    isPaidUser: PropTypes.bool.isRequired,
    isBothPartyPayUser: PropTypes.bool,
  }).isRequired,
  onConnect: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onBlock: PropTypes.func.isRequired,
  onReportMisuse: PropTypes.func.isRequired,
  onSendEmail: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onDeclineWithMessage: PropTypes.func.isRequired,
  onDirectlyShortlist: PropTypes.func.isRequired,
  onViewHistory: PropTypes.func.isRequired,
  onDeclineWithDelete: PropTypes.func,
  connectMessages: PropTypes.arrayOf(PropTypes.shape(PropTypes.connectMessage)).isRequired,
  contact: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  showHistory: PropTypes.bool,
  isProfileFree: PropTypes.bool,
  isHovered: PropTypes.bool,
  profileName: PropTypes.string,
  onViewRequest: PropTypes.func.isRequired,
  request: PropTypes.shape({
    details: PropTypes.shape({
      count: PropTypes.number,
      request_type: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  onChatNow: PropTypes.func,
  presence: PropTypes.shape({
    onlineStatus: PropTypes.onlineStatus.isRequired,
    lastOnlineDetails: PropTypes.string.isRequired,
    chatIcon: PropTypes.string.isRequired,
  }).isRequired,
  onShowContactDetails: PropTypes.func,
  membershipTags: PropTypes.string,
  profileId: PropTypes.string,
  wwwBaseUrl: PropTypes.string,
  uid: PropTypes.string,
  profileCreatedBy: PropTypes.string,
  lastOnlineDetails: PropTypes.string,
  userHandle: PropTypes.string,
  nextUrl: PropTypes.string,
  isSameGender: PropTypes.bool,
  drAction: PropTypes.string,
  onSendEmailClick: PropTypes.func,
  onViewPhoneNoClick: PropTypes.func,
  listType: PropTypes.string,
  profilePageBucket: PropTypes.string,
};

export default EoiActive;
