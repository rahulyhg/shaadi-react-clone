import React from 'react';
import PropTypes from '../../../../PropTypes';
import Eoi from '../../../Common/Eoi';
import EoiRequest from '../../../Common/Eoi/EoiRequest';

import ProfilePhotoList from '../../../Common/ProfilePhotoList';
import PremiumBadge from '../../../Common/ProfilePhotoList/PremiumBadge';
import VerificationShield from '../../../Common/VerificationShield';
import s from './styles';
import ActionMsg from '../ActionMsg';
import CtaInfo from './ctaInfo';
import ChatIcon from '../../../Common/ChatIcon';
import InterestListBanner from '../../InterestListBanner';
import BoldListing from '../../BoldListing';
import { formatText } from '../../../../utils';

const onUserAction = (onAction, ...newArgs) => (...args) => {
  const updateArg = args[1] === 'delete' ? [...args, ...newArgs] : args;
  onAction(...updateArg);
};

// const formatText = (text, values, regex , jsxText) => {
//     if (!values.length)
//         return text;

//     return (<div>
//         {text.split(regex)
//             .reduce((prev, current, i) => {
//                 if (!i)
//                     return [current];

//                 return prev.concat(
//                     values.includes(current)  ?
//                         jsxText
//                         : current
//                 );
//             }, [])}
//     </div>);
// };

const hideContactData = (regEx, str, infoToDisplay) => {
  const splitedStr = str.split(regEx);
  if (splitedStr.length === 1) {
    return str;
  }
  return splitedStr.map(value => {
    if (infoToDisplay.includes(value)) {
      return <s.emailPhoneHiddenMsg>{value}</s.emailPhoneHiddenMsg>;
    }
    return value;
  });
};
const trim = (regEx, str, maxLength) => {
  const splitedStr = str.split(regEx);
  let updatedMsg = '';
  let newLength = 0;
  if (splitedStr.length === 1) {
    updatedMsg = str;
  } else {
    updatedMsg = splitedStr.reduce((accum, info) => {
      switch (info) {
        case '#Email_Hidden#':
          newLength = accum.length + 'Email Visible on Accept'.length;
          break;
        case '#Phone_No_Hidden#':
          newLength = accum.length + 'Phone No Visible on Accept'.length;
          break;
        default:
          newLength = accum.length + info.length;
      }

      if (newLength < maxLength) {
        switch (info) {
          case '#Email_Hidden#':
            return `${accum}#Email Visible on Accept#`;
          case '#Phone_No_Hidden#':
            return `${accum}#Phone No Visible on Accept#`;
          default:
            return `${accum}${info} `;
        }
      } else {
        switch (info) {
          case '#Email_Hidden#':
          case '#Phone_No_Hidden#':
            return accum;
          default:
            return `${accum}${info} `;
        }
      }
    }, '');
  }

  return updatedMsg;
};

const renderInterestListBanner = (profile, item, settings, wwwBaseUrl) => {
  const premiumBannner = {
    profilePhotoPath: profile.photoMedium,
    profileDisplayName: profile.name,
    contactPartial: (item.contact.mask_contact_no && `${item.contact.country_code} ${item.contact.mask_contact_no}`) || '',
    himHer: profile.himHer,
    heShe: profile.heShe,
    bannerType: 'accept',
  };
  return (
    <InterestListBanner premiumBannner={premiumBannner} settings={settings} type="list" wwwBaseUrl={wwwBaseUrl} source="inboxBanner" />
  );
};

const canShowImidiateAction = ({ source, eoiReqType, justNow, toggleCard }) =>
  source !== 'featured' && ['accept', 'accept_confirm', 'connect_confirm', 'connect'].includes(eoiReqType) && justNow && toggleCard;
const InboxItem = props => {
  const { type, action } = props.requestType;
  if (
    props.item.eoiReqType &&
    ['decline', 'decline_confirm', 'cancel_invitation', 'decline_with_delete', 'delete'].includes(props.item.eoiReqType)
  ) {
    return (
      <ActionMsg
        eoiReqType={props.item.eoiReqType}
        justNow={props.item.justNow}
        uid={props.profile.uid}
        name={props.profile.name}
        loadingStyle={props.item.eoiLoadingStyle}
        profile={props.profile}
        reqType={props.item.requests[`${type}_${action}`].type}
      />
    );
  }

  const { connectionStatus, isHidden } = props.profile.flags;
  let ctaHorizonatal =
    connectionStatus === 'disabled'
      ? ['connect_deleted'].includes(`${type}_${action}`)
      : ['theyDeclined', 'theyCancelled'].includes(connectionStatus);

  ctaHorizonatal = ['declined', 'cancelled', 'accepted'].includes(connectionStatus) && isHidden ? true : ctaHorizonatal;
  const isIndianDiaspora = props.profile.flags.isIndianDiaspora;
  const listType = `${type}_${action}`;
  const { message = '', actionDate, isNew, type: requestType, requestDirection } = props.item.requests[`${type}_${action}`];
  const showMsg = trim(/\s/g, message, 99);
  const justNow = canShowImidiateAction({
    source: props.item.source,
    eoiReqType: props.item.eoiReqType,
    justNow: props.item.justNow,
    toggleCard: props.item.toggleCard,
  });

  const isExperiment =
    props.settings.experiments && props.settings.experiments.accept_success && props.settings.experiments.accept_success.bucket === 'B';
  return (
    <s.ItemWrap justNow={justNow}>
      {justNow && !props.settings.isPaidUser && isExperiment ? (
        renderInterestListBanner(props.profile, props.item, props.settings, props.wwwBaseUrl)
      ) : (
        <React.Fragment>
          <s.MatchItemWrap
            membershipTags={props.membershipTags}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            isNew={isNew}
            isHorizontal={ctaHorizonatal}
          >
            {props.profile.flags.isBoldListing && (
              <BoldListing
                membershipTags={props.profile.flags.membershipTags}
                membershipLevel={props.profile.flags.membershipLevel}
                source="inboxCard"
              />
            )}
            <ProfilePhotoList
              type={'inboxCard'}
              flags={props.profile.flags}
              isPlaying={!!(props.settings.hasUploadedPhoto && props.isHovered && props.profile.summary.listAlbum.length)}
              photos={[props.profile.photoMedium]}
              tooltip={props.tooltip}
              loading={props.item.photoLoading}
              albumUrl={props.albumUrl}
              settings={props.settings}
              isTooltipVisible={props.tooltip.position === 'photo' && props.tooltip.uid === props.profile.uid}
              onTooltipClose={props.onPhotoTooltipClose}
              onShowWatermarkInfo={props.onShowWatermarkInfo}
              onRequestPhoto={props.onRequestPhoto}
              onRequestPassword={() => {}}
              wwwBaseUrl={props.wwwBaseUrl}
              uid={props.profile.uid}
              onShowPhotoClick={props.onShowPhotoClick}
            />
            <s.ProfileDetailsWrap>
              <s.ProfileTopWrap>
                <s.ProNameWrap>
                  <s.ProNameInnerWrap>
                    <s.ProNameLink membershipTags={props.membershipTags} to={props.profileUrl} target="_blank">
                      {props.profile.name}
                    </s.ProNameLink>
                    {props.isPremium && (
                      <s.PremiumBadgeWrap>
                        <PremiumBadge
                          source="inboxCard"
                          membershipTags={props.membershipTags}
                          membershipLevel={props.membershipLevel}
                          isVisible
                        />
                      </s.PremiumBadgeWrap>
                    )}
                    {props.profile.verification.shield_state && (
                      <VerificationShield verification={props.profile.verification} source="inboxCard" />
                    )}
                  </s.ProNameInnerWrap>
                  <s.PostTime>{actionDate}</s.PostTime>
                </s.ProNameWrap>
                {props.membershipTags !== 'vip' &&
                  !props.profile.flags.isHidden && (
                    <s.ProfileTopInnerWrap>
                      <s.ChatLink
                        isLinkActive={props.profile.presence.lastOnlineDetails === 'Online now'}
                        onClick={props.onChatNow}
                        title="Chat Now"
                      >
                        {['Online', 'Offline', 'Idle'].includes(props.profile.presence.onlineStatus) && (
                          <ChatIcon viewType="inbox" chatDetails={props.profile.presence} clickFn={props.onChatNow} />
                        )}
                        <s.LastOnlineAt isLinkActive={props.profile.presence.lastOnlineDetails === 'Online now'}>
                          {props.profile.presence.lastOnlineDetails}
                        </s.LastOnlineAt>
                      </s.ChatLink>
                    </s.ProfileTopInnerWrap>
                  )}
                {props.membershipTags === 'vip' && (
                  <s.ProfileTopInnerWrap>
                    <s.AvailabilityText>
                      This profile is managed by a{' '}
                      <s.BoldText>
                        VIP Consultant | Contact -&nbsp;<s.BoldTextLink onClick={props.onCallConsultantInvited}>FREE</s.BoldTextLink>
                      </s.BoldText>
                    </s.AvailabilityText>
                  </s.ProfileTopInnerWrap>
                )}
              </s.ProfileTopWrap>
              <s.ProfileDetails>
                {props.profile.summary[isIndianDiaspora ? 'infoMapInboxIndian' : 'infoMapInboxNri'].map(detail => (
                  <s.DetailDesc key={detail.key}>{detail.value}</s.DetailDesc>
                ))}
              </s.ProfileDetails>

              {type === 'connect' &&
                action !== 'deleted' &&
                props.item.requests[`connect_${action}`].message_id && (
                  <s.Bios>
                    {props.item.requests[`connect_${action}`].hide_message ? (
                      <s.BothPartyWrap>
                        <s.BothPartyIcon />
                        {formatText(
                          props.item.requests[`connect_${action}`].message.replace('display_name_profile', props.profile.name),
                          props.profile.name,
                          new RegExp(/{(.*?)}/),
                          <s.LockIconWrapper>
                            <s.LockIcon />
                            <s.ProfileNameLink target="_blank" isExternal={false} to={props.profileUrl}>
                              {props.profile.name}
                            </s.ProfileNameLink>
                          </s.LockIconWrapper>,
                        )}
                        <s.ParaDivider />
                        <s.BothPartyLinkWrap>
                          <s.BothPartyLink isExternal to="/payment">
                            Upgrade Now
                          </s.BothPartyLink>{' '}
                          or{' '}
                          <s.BothPartyLink External to="https://www.facebook.com">
                            Get Facebook Verified<s.LinkArrow />
                          </s.BothPartyLink>
                        </s.BothPartyLinkWrap>
                      </s.BothPartyWrap>
                    ) : (
                      <div>
                        <s.MsgIcon />

                        {hideContactData(/#/g, showMsg.substr(0, 99), ['Phone No Visible on Accept', 'Email Visible on Accept'])}
                        {showMsg.length > 99 && (
                          <s.RMSection>
                            ...<s.ReadMoreLink target="_blank" to={props.profileUrl}>
                              Read More
                            </s.ReadMoreLink>
                          </s.RMSection>
                        )}
                      </div>
                    )}
                  </s.Bios>
                )}

              <CtaInfo
                listType={`${props.requestType.type}_${props.requestType.action}`}
                heShe={props.profile.heShe}
                hisHer={props.profile.hisHer}
                himHer={props.profile.himHer}
                justNow={props.item.justNow}
                reqInfo={props.item.requests}
                isHidden={props.profile.flags.isHidden}
                connectionStatus={connectionStatus}
              />
            </s.ProfileDetailsWrap>

            {type === 'connect' ? (
              <s.CtaWrap isHorizontal={ctaHorizonatal} type="inbox" isSkuFeature={props.profile.flags.canCommunicate ? 'sku_user' : ''}>
                <Eoi
                  type="inbox"
                  justNow={props.item.justNow}
                  profile={props.profile}
                  settings={props.settings}
                  tooltip={props.tooltip}
                  loadingStyle={props.item.eoiLoadingStyle}
                  onAction={onUserAction(props.onAction, requestDirection, requestType)}
                  onTooltipClose={props.onEoiTooltipClose}
                  shortlistItems={props.shortlistItems}
                  isHovered={props.isHovered}
                  onChatNow={props.onChatNow}
                  onShowContactDetails={props.onShowContactDetails}
                  actionType={props.item.actionType}
                  isHorizontal={ctaHorizonatal}
                  listType={`${props.requestType.type}_${props.requestType.action}`}
                />
              </s.CtaWrap>
            ) : (
              <EoiRequest
                type="inbox"
                profile={props.profile}
                isHovered={props.isHovered}
                isMemberHidden={props.settings.isHidden}
                onAction={onUserAction(props.onAction, requestDirection, requestType)}
                listType={`${props.requestType.type}_${props.requestType.action}`}
                reqType={`${props.item.requests[listType].type}`}
              />
            )}
          </s.MatchItemWrap>
        </React.Fragment>
      )}
    </s.ItemWrap>
  );
};
InboxItem.defaultProps = {
  requestType: {},
  isPremium: false,
  canCommunicate: false,
};
InboxItem.propTypes = {
  isHovered: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool,
  profileUrl: PropTypes.string.isRequired,
  albumUrl: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    heShe: PropTypes.heShe.isRequired,
    himHer: PropTypes.himHer.isRequired,
    hisHer: PropTypes.hisHer.isRequired,
    photoMedium: PropTypes.string.isRequired,
    presence: PropTypes.shape({
      onlineStatus: PropTypes.onlineStatus.isRequired,
      lastOnlineDetails: PropTypes.string.isRequired,
    }).isRequired,

    summary: PropTypes.shape({
      infoMap: PropTypes.arrayOf(PropTypes.shape(PropTypes.summaryInfoMapItem)).isRequired,
      listAlbum: PropTypes.arrayOf(PropTypes.string).isRequired,
      gridAlbum: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,

    flags: PropTypes.shape({
      connectionStatus: PropTypes.connectionStatus.isRequired,
      membershipLevel: PropTypes.membershipLevel.isRequired,
      membershipTags: PropTypes.membershipTags.isRequired,
      contactStatus: PropTypes.contactStatus.isRequired,
      horoscopeStatus: PropTypes.horoscopeStatus.isRequired,
      albumStatus: PropTypes.albumStatus.isRequired,
      isTwoWayMatch: PropTypes.isTwoWayMatch.isRequired,
      isWatermarked: PropTypes.isWatermarked.isRequired,
      isBoldListing: PropTypes.bool.isRequired,
      isHoroscopeApplicable: PropTypes.bool.isRequired,
      isIndianDiaspora: PropTypes.bool.isRequired,
      isHidden: PropTypes.bool.isRequired,
      canCommunicate: PropTypes.bool,
    }),
    verification: PropTypes.shape({
      count: PropTypes.number.isRequired,
      shield_state: PropTypes.string,
      derived_text: PropTypes.string,
      verified_proofs: PropTypes.array,
    }),
  }).isRequired,

  item: PropTypes.shape({
    justNow: PropTypes.bool.isRequired,
    eoiLoadingStyle: PropTypes.loadingStyle.isRequired,
    photoLoading: PropTypes.bool.isRequired,
    actionType: PropTypes.string,
    displayStatusMessage: PropTypes.string,
    eoiReqType: PropTypes.string,
    requests: PropTypes.object, // eslint-disable-line react/forbid-prop-types,
    source: PropTypes.string,
    contact: PropTypes.shape({
      mask_contact_no: PropTypes.string.isRequired,
      country_code: PropTypes.string,
    }).isRequired,
    toggleCard: PropTypes.bool,
  }).isRequired,

  settings: PropTypes.shape(PropTypes.searchSettings).isRequired,
  tooltip: PropTypes.shape(PropTypes.tooltip).isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  requestType: PropTypes.shape({
    type: PropTypes.oneOf(['connect', 'request']).isRequired,
    action: PropTypes.oneOf(['pending', 'accepted', 'awaiting', 'deleted', 'filtered']).isRequired,
  }),
  onAction: PropTypes.func.isRequired,
  onChatNow: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onShowContactDetails: PropTypes.func.isRequired,
  onShowWatermarkInfo: PropTypes.func.isRequired,
  onEoiTooltipClose: PropTypes.func.isRequired,
  onPhotoTooltipClose: PropTypes.func.isRequired,
  onRequestPhoto: PropTypes.func.isRequired,
  membershipTags: PropTypes.string.isRequired,
  onCallConsultantInvited: PropTypes.func.isRequired,
  membershipLevel: PropTypes.oneOf(['Free', 'Premium', 'PremiumPlus', 'Select', 'none']).isRequired,
  onShowPhotoClick: PropTypes.func.isRequired,
};

export default InboxItem;
