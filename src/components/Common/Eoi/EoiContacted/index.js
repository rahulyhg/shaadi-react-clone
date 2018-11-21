import React, { Fragment } from 'react';
import PropTypes from '../../../../PropTypes';
import Profile from './profile';
import ProfileB from './profileB';
import DailyRecommendations from './dailyRecommendations';
import DailyRecommendationsB from './dailyRecommendationsB';
import Inbox from './inbox';
import s from '../styles';
import ss from '../EoiActive/styles';
import SvgCheckmark from '../../../Common/SvgCheckmark';
import Timer from '../../../../helpers/timer';
import sss from '../../../Common/PremiumButton/styles';

const isPremiumFeature = props => props.settings.isPaidUser || props.canCommunicate;
const isPremiumFeatureForWriteMsg = props => props.settings.isPaidUser || (props.canCommunicate && !props.settings.isBothPartyPayUser);

const upgradeLink = profileId => (
  <Fragment>
    <s.UpgradeTextLink isExternal to={`/payment?loc=list&profileid=${profileId}&source=search_listing`} target="_blank">
      Upgrade&nbsp;
    </s.UpgradeTextLink>
  </Fragment>
);

const EoiContacted = props => {
  switch (props.type) {
    case 'inbox':
      return (
        <Inbox
          himHer={props.himHer}
          heShe={props.heShe}
          hisHer={props.hisHer}
          isPaidUser={props.settings.isPaidUser}
          membershipTags={props.membershipTags}
          profileId={props.profileId}
          isHovered={props.isHovered}
          canRemind={props.canRemind}
          canCancelInvite={props.canCancelInvite}
          onRemind={props.onRemind}
          justNow={props.justNow}
          onCancelInvite={props.onCancelInvite}
          status={props.status}
          note={props.note}
          hiddenReason={props.hiddenReason}
          listType={props.listType}
          isHidden={props.isHidden}
        />
      );
    case 'list':
      return (
        <s.StatusSuccess isVisible membershipType={props.membershipTags}>
          {props.settings.isPaidUser ? (
            props.justNow ? (
              <s.PremSuccessMsg>
                <s.StatusText isSingleLine isItalicText>
                  <SvgCheckmark isListingSvg />
                  Invitation sent.<br />
                  Contact {props.himHer.toLowerCase()} directly
                </s.StatusText>
              </s.PremSuccessMsg>
            ) : (
              <s.PremSuccessMsg>
                <s.StatusText isSingleLine isItalicText>
                  <s.SuccessTickImg />
                  Invitation sent.<br />
                  Contact {props.himHer.toLowerCase()} directly
                </s.StatusText>
              </s.PremSuccessMsg>
            )
          ) : props.justNow ? (
            <s.StatusText isSingleLine isItalicText>
              {props.canCommunicate && <br />}
              <SvgCheckmark isListingSvg />
              Invitation sent.<br />
              {!props.canCommunicate && upgradeLink(props.profileId)}
              {!props.canCommunicate && `to contact ${props.himHer.toLowerCase()} directly`}
            </s.StatusText>
          ) : (
            <s.StatusText isSingleLine isItalicText>
              {props.canCommunicate && <br />}
              <s.SuccessTickImg />
              Invitation sent.<br />
              {!props.canCommunicate && upgradeLink(props.profileId)}
              {!props.canCommunicate && `to contact ${props.himHer.toLowerCase()} directly`}
            </s.StatusText>
          )}
          {props.membershipTags === 'vip' ? (
            <s.WriteMessageBtnVip
              onClick={props.onChatNow}
              isPaidUser={props.settings.isPaidUser}
              isHovered={props.isHovered}
              title="Write Message"
            />
          ) : (
            <s.WriteMessageBtn
              onClick={props.onChatNow}
              isPaidUser={isPremiumFeatureForWriteMsg(props)}
              isHovered={props.isHovered}
              title="Write Message"
              data-writemessage={isPremiumFeature(props)}
            />
          )}
          <s.WriteMessageBtnText
            onClick={props.onChatNow}
            isHovered={props.isHovered}
            isPaidUser={isPremiumFeatureForWriteMsg(props)}
            membershipTags={props.membershipTags}
            data-writemessage={isPremiumFeature(props)}
          >
            Write Message
          </s.WriteMessageBtnText>

          {props.membershipTags === 'vip' ? (
            <s.VewContactBtnVip
              onClick={props.settings.isPaidUser ? props.onShowContactDetails : props.onChatNow}
              isPaidUser={props.settings.isPaidUser}
              isHovered={props.isHovered}
              title="View Contact"
            />
          ) : (
            <s.VewContactBtn
              onClick={isPremiumFeature(props) ? props.onShowContactDetails : props.onChatNow}
              isPaidUser={isPremiumFeature(props)}
              isHovered={props.isHovered}
              title="View Contact"
              data-viewcontact={isPremiumFeature(props)}
            />
          )}
          <s.VewContactBtnText
            onClick={isPremiumFeature(props) ? props.onShowContactDetails : props.onChatNow}
            isHovered={props.isHovered}
            isPaidUser={isPremiumFeature(props)}
            membershipTags={props.membershipTags}
            data-viewcontact={isPremiumFeature(props)}
          >
            View Contact
          </s.VewContactBtnText>
        </s.StatusSuccess>
      );
    case 'grid':
      return (
        <s.GridStyle>
          {props.justNow ? (
            <s.InvitationGridStatus isVisible status="contacted">
              Invitation Sent
            </s.InvitationGridStatus>
          ) : (
            <s.InvitationGridStatus isVisible status="none">
              Awaiting Response
            </s.InvitationGridStatus>
          )}
        </s.GridStyle>
      );
    case 'premiumCarousel':
      return (
        <Timer
          loader={
            <s.TickContainer>
              <SvgCheckmark isPremiumCarousel isListingSvg />
            </s.TickContainer>
          }
          response={
            props.settings.isPaidUser ? (
              <sss.ConnectNow btnType={'connect'}>
                <sss.ConnectInner
                  btnText={'Write Message'}
                  btnType={'connect'}
                  onClick={props.onChatNow}
                  isHovered={props.isHovered}
                  isPaidUser={props.settings.isPaidUser}
                  membershipTags={props.membershipTags}
                  hideTick
                />
              </sss.ConnectNow>
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

    case 'chat':
      return (
        <s.InvitationStatus isVisible>
          <s.InviteStatusIcon status="contacted" />
          <s.InviteStatusText status="contacted">Invitation Sent</s.InviteStatusText>
        </s.InvitationStatus>
      );
    case 'profile':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <ProfileB
            type={props.type}
            heShe={props.heShe}
            himHer={props.himHer}
            status={props.status}
            note={props.note}
            canRemind={props.canRemind}
            canCancelInvite={props.canCancelInvite}
            onRemind={props.onRemind}
            onCancelRemind={props.onCancelRemind}
            onCancelInvite={props.onCancelInvite}
            onViewHistory={props.onViewHistory}
            showHistory={props.showHistory}
            isLoggerBothPartyPayUser={props.settings.isBothPartyPayUser}
            request={props.request}
            onViewRequest={props.onViewRequest}
            isPaidUser={props.settings.isPaidUser}
            onChatNow={props.onChatNow}
            membershipTags={props.membershipTags}
            justNow={props.justNow}
            justNowText={props.justNowText}
            profileId={props.profileId}
            isHovered={props.isHovered}
            onViewPhoneNoClick={props.onViewPhoneNoClick}
            connectionAction={props.connectionAction}
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
          heShe={props.heShe}
          himHer={props.himHer}
          status={props.status}
          note={props.note}
          canRemind={props.canRemind}
          canCancelInvite={props.canCancelInvite}
          onRemind={props.onRemind}
          onCancelRemind={props.onCancelRemind}
          onCancelInvite={props.onCancelInvite}
          onViewHistory={props.onViewHistory}
          showHistory={props.showHistory}
          isLoggerBothPartyPayUser={props.settings.isBothPartyPayUser}
          request={props.request}
          onViewRequest={props.onViewRequest}
        />
      );
    case 'dailyRecommendations':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <DailyRecommendationsB
            status={props.status}
            name={props.name}
            onViewPhoneNoClick={props.onViewPhoneNoClick}
            onSendEmailClick={props.onSendEmailClick}
            settings={props.settings}
            uid={props.uid}
            wwwBaseUrl={props.wwwBaseUrl}
            nextUrl={props.nextUrl}
            justNow={props.justNow}
            heShe={props.heShe}
            himHer={props.himHer}
            drAction={props.drAction}
            isPaidUser={props.settings.isPaidUser}
            isHovered={props.isHovered}
            onChatNow={props.onChatNow}
            membershipTags={props.membershipTags}
            profileId={props.profileId}
            isLoggerBothPartyPayUser={props.settings.isBothPartyPayUser}
            canCommunicate={props.canCommunicate}
          />
        );
      }
      return (
        <DailyRecommendations
          status={props.status}
          name={props.name}
          onViewPhoneNoClick={props.onViewPhoneNoClick}
          onSendEmailClick={props.onSendEmailClick}
          settings={props.settings}
          uid={props.uid}
          wwwBaseUrl={props.wwwBaseUrl}
          nextUrl={props.nextUrl}
          justNow={props.justNow}
          heShe={props.heShe}
          himHer={props.himHer}
          drAction={props.drAction}
        />
      );
    case 'similarProfile':
      return (
        <ss.justNowCase type={props.type}>
          <ss.SvgCheckmark type={props.type}>
            <SvgCheckmark isListingSvg />
          </ss.SvgCheckmark>
          <s.MsgSpacer />
          Invitation Sent<br />
        </ss.justNowCase>
      );
    default:
      return null;
  }
};

EoiContacted.defaultProps = {
  isHovered: false,
  justNowText: null,
  justNowIcon: null,
  note: null,
  showHistory: false,
  isBothPartyPayUser: false,
  request: {
    details: {
      count: 0,
      request_type: [],
    },
  },
  profileId: '',
  wwwBaseUrl: null,
  nextUrl: null,
  name: null,
  uid: null,
  drAction: '',
  onSendEmailClick: null,
  onViewPhoneNoClick: null,
  onChatNow: null,
  onShowContactDetails: null,
  hiddenReason: 'default',
  listType: '',
  isHidden: false,
  connectionAction: '',
  profilePageBucket: 'A',
  canCommunicate: false,
};

EoiContacted.propTypes = {
  type: PropTypes.oneOf(['grid', 'list', 'profile', 'chat', 'premiumCarousel', 'dailyRecommendations', 'inbox', 'similarProfile'])
    .isRequired,
  status: PropTypes.connectionStatus.isRequired,
  justNow: PropTypes.bool.isRequired,
  justNowText: PropTypes.string,
  justNowIcon: PropTypes.string,
  note: PropTypes.string,
  onSendEmailClick: PropTypes.func,
  onViewPhoneNoClick: PropTypes.func,
  isSearchLinkVisible: PropTypes.bool.isRequired,
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
  listType: PropTypes.string,
  isHidden: PropTypes.bool,
  hiddenReason: PropTypes.string,
  canRemind: PropTypes.bool.isRequired,
  canCancelInvite: PropTypes.bool.isRequired,
  onRemind: PropTypes.func.isRequired,
  onCancelInvite: PropTypes.func.isRequired,
  onCancelRemind: PropTypes.func.isRequired,
  onViewHistory: PropTypes.func.isRequired,
  showHistory: PropTypes.bool,
  isHovered: PropTypes.bool,
  settings: PropTypes.shape({
    isBothPartyPayUser: PropTypes.bool,
    isPaidUser: PropTypes.bool,
  }).isRequired,
  request: PropTypes.shape({
    details: PropTypes.shape({
      count: PropTypes.number,
      request_type: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  onViewRequest: PropTypes.func.isRequired,
  onChatNow: PropTypes.func,
  onShowContactDetails: PropTypes.func,
  membershipTags: PropTypes.string.isRequired,
  canCommunicate: PropTypes.bool,
  profileId: PropTypes.string,
  wwwBaseUrl: PropTypes.string,
  nextUrl: PropTypes.string,
  name: PropTypes.string,
  uid: PropTypes.string,
  drAction: PropTypes.string,
  profilePageBucket: PropTypes.string,
  connectionAction: PropTypes.string,
};

export default EoiContacted;
