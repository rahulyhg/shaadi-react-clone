import React from 'react';
import get from 'lodash/get';
import PropTypes from '../../../PropTypes';
import ProfilePhotoList from '../../Common/ProfilePhotoList';
import Eoi from '../../Common/Eoi';
import Tooltip from '../../Common/Tooltip';
import MoreAction from '../../Common/MoreAction';
import VerificationShield from '../../Common/VerificationShield';
import ChatIcon from '../../Common/ChatIcon';
import s from './ListItemStyles';
import TrackVisiblity from '../../TrackVisiblity';
import OverLay from '../../Common/OverLay';
import { UpgradeBannerBox } from '../../Common/UpgradeBanner';
import SimilarProfile from '../../Common/SimilarProfile';
import BoldListing from '../BoldListing';
import { openWindowPopUp } from '../../../utils';

const horoscopeLabels = {
  available: 'Horoscope available',
  availableOnRequest: 'Horoscope available for Accepted Members',
  locked: 'Member has hidden the horoscope',
};
const isSearchList = searchType =>
  ['basic_search', 'smart_search', 'whoisonline', 'specialcase_search', 'astrology_search'].includes(searchType);
const renderSpotLight = ({ searchType, isSpotLight }) =>
  isSearchList(searchType) &&
  isSpotLight && (
    <s.spotlightHeader>
      Spotlight
      <s.SpotLightIcon />
      <s.SpotLightDesc>Feature your profile here</s.SpotLightDesc>
    </s.spotlightHeader>
  );

const ListItem = props => {
  const isIndianDiaspora = props.profile.flags.isIndianDiaspora;
  const displayStatusMessageLength = (props.item.displayStatusMessage && props.item.displayStatusMessage.length) || 0;
  const handleDaTracking = (event = 'profile_view_from_list') => {
    props.daTracking && props.daTracking(event, { uid: props.item.uid });
  };
  const similarExperiment = get(props.settings, ['experiments', 'similar_profile', 'bucket'], 'A');
  return (
    <TrackVisiblity nodeRef={`true_view_${props.profile.uid}`} daTracking={handleDaTracking}>
      <div id={`true_view_${props.profile.uid}`}>
        <s.MatchItem>
          {renderSpotLight(props)}
          <s.MatchItemWrap
            membershipTags={props.membershipTags}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            isSimilar
          >
            {props.profile.flags.isBoldListing && (
              <BoldListing membershipTags={props.profile.flags.membershipTags} membershipLevel={props.profile.flags.membershipLevel} />
            )}
            <ProfilePhotoList
              type={'list'}
              flags={props.profile.flags}
              isPlaying={!!(props.settings.hasUploadedPhoto && props.isHovered && props.profile.summary.listAlbum.length)}
              photos={props.profile.summary.gridAlbum}
              tooltip={props.tooltip}
              loading={props.item.photoLoading}
              albumUrl={props.albumUrl}
              settings={props.settings}
              isTooltipVisible={props.tooltip.position === 'photo' && props.tooltip.uid === props.profile.uid}
              onTooltipClose={props.onPhotoTooltipClose}
              onShowWatermarkInfo={props.onShowWatermarkInfo}
              onRequestPhoto={props.onRequestPhoto}
              onRequestPassword={props.onRequestPassword}
              wwwBaseUrl={props.wwwBaseUrl}
              uid={props.profile.uid}
              onShowPhotoClick={props.onShowPhotoClick}
              daTracking={props.daTracking}
              isOverlay={props.profile.flags.isMaskedProfile}
              showSpotLight={isSearchList(props.searchType) && props.isSpotLight}
            />
            <s.ProfileDetailsWrap>
              <s.ProfileTopWrap>
                <s.ProNameWrap>
                  <s.ProNameInnerWrap>
                    <s.ProNameLink
                      membershipTags={props.membershipTags}
                      target="_blank"
                      isExternal={false}
                      to={props.profileUrl}
                      onClick={() => handleDaTracking()}
                    >
                      {props.profile.name}
                    </s.ProNameLink>
                    {props.profile.verification.shield_state && <VerificationShield verification={props.profile.verification} />}
                  </s.ProNameInnerWrap>
                  {!props.item.displayStatusMessage &&
                    !['blocked', 'theyDeclined', 'theyCancelled', 'sameGender', 'hidden', 'misuseReported'].includes(
                      props.profile.flags.connectionStatus,
                    ) &&
                    !props.settings.isHidden && (
                      <MoreAction
                        status={props.profile.flags.connectionStatus}
                        onShortlistOpen={props.onShortlistOpen}
                        onDirectlyShortlist={props.onDirectlyShortlist}
                        onDirectlyRemoveShortlist={props.onDirectlyRemoveShortlist}
                        onDirectlyIgnore={props.onDirectlyIgnore}
                        loadingStyle={props.item.eoiLoadingStyle}
                        actionType={props.item.actionType}
                        onBlockClick={props.onBlockClick}
                        onMisuseClick={props.onMisuseClick}
                      />
                    )}
                </s.ProNameWrap>
                {props.membershipTags !== 'vip' && (
                  <s.ProfileTopInnerWrap>
                    <s.ChatLink
                      isLinkActive={props.profile.presence.lastOnlineDetails === 'Online now'}
                      onClick={props.onChatNow}
                      title="Chat Now"
                    >
                      {['Online', 'Offline', 'Idle'].includes(props.profile.presence.onlineStatus) && (
                        <ChatIcon viewType="list" chatDetails={props.profile.presence} clickFn={props.onChatNow} />
                      )}
                      <s.LastOnlineAt isLinkActive={props.profile.presence.lastOnlineDetails === 'Online now'}>
                        {props.profile.presence.lastOnlineDetails}
                      </s.LastOnlineAt>
                    </s.ChatLink>
                    {props.searchType === 'astrology_search' &&
                      props.profile.horoscopeScore &&
                      props.profile.horoscopeScore.rankdata && (
                        <s.Score>
                          <img src="/assets/planet.svg" alt="horoscope score" />
                          <s.ScoreText>Horoscope Match:</s.ScoreText>
                          <s.HoroscopeLink
                            onClick={() => openWindowPopUp(880, 635, `/horoscope/${props.profile.uid}/l/ENG/hs/1`, 'center')}
                          >
                            {`${Math.floor(props.profile.score * 36 / 100)}/36`}{' '}
                          </s.HoroscopeLink>
                        </s.Score>
                      )}
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
                {props.profile.summary[isIndianDiaspora ? 'infoMapIndian' : 'infoMapNri'].map(detail => (
                  <s.DetailDesc key={detail.key}>{detail.value}</s.DetailDesc>
                ))}
              </s.ProfileDetails>
              {props.membershipTags === 'vip' && (
                <s.VipBios>
                  <s.VipBioDetails isVisible={props.settings.membershipTags !== 'vip'}>
                    {`VIP Shaadi - Matchmaking for society's finest.`}
                    <s.VipReadMoreLink>
                      <s.ReadMoreLinkText onClick={props.onCallConsultantInvited}>Get Invited</s.ReadMoreLinkText>
                    </s.VipReadMoreLink>
                  </s.VipBioDetails>
                </s.VipBios>
              )}
              {props.membershipTags !== 'vip' && (
                <s.Bios>
                  {`${(props.profile.summary.shortBio || '').substr(0, 100)}...`}
                  <s.ReadMoreLink isExternal={false} target="_blank" to={props.profileUrl} onClick={() => handleDaTracking()}>
                    More
                  </s.ReadMoreLink>
                </s.Bios>
              )}
            </s.ProfileDetailsWrap>
            <s.CtaWrap type={'list'} isSkuFeature={props.profile.flags.canCommunicate ? 'sku_user' : ''}>
              {props.item.displayStatusMessage ? (
                <s.FailureMessage displayStatusMessageLength={displayStatusMessageLength}>
                  {props.item.displayStatusMessage}
                </s.FailureMessage>
              ) : (
                <Eoi
                  type={'list'}
                  justNow={props.item.justNow}
                  profile={props.profile}
                  settings={props.settings}
                  tooltip={props.tooltip}
                  loadingStyle={props.item.eoiLoadingStyle}
                  onAction={props.onAction}
                  onTooltipClose={props.onEoiTooltipClose}
                  shortlistItems={props.shortlistItems}
                  isHovered={props.isHovered}
                  onChatNow={props.onChatNow}
                  onShowContactDetails={props.onShowContactDetails}
                  actionType={props.item.actionType}
                />
              )}
            </s.CtaWrap>
            {props.profile.flags.isMaskedProfile && (
              <div onMouseEnter={props.onNewMatchHover} onMouseLeave={props.onNewMatchHover}>
                <OverLay onHover>
                  <UpgradeBannerBox isVisible={props.isNewMatchHovered} source="newmatches_block_listing" />
                </OverLay>
              </div>
            )}
          </s.MatchItemWrap>
        </s.MatchItem>
        {similarExperiment === 'B' &&
          props.item.justNow && (
            <SimilarProfile
              profileName={props.profile.name}
              uid={props.item.uid}
              settings={props.settings}
              wwwBaseUrl={props.wwwBaseUrl}
              onAction={props.onAction}
              order={props.order}
              page={props.page}
              pg_ubt={props.pg_ubt}
            />
          )}
      </div>
    </TrackVisiblity>
  );
};

const HoroscopeIcon = props => (
  <Tooltip isVisible={props.isTooltipVisible} tooltip={props.tooltip} onClose={props.onTooltipClose} offset={[125, -26]}>
    <s.HoroscopeIcon
      title={horoscopeLabels[props.horoscopeStatus] || ''}
      onClick={props.onClick}
      horoscopeStatus={props.horoscopeStatus}
      isVisible={props.isVisible}
    />
  </Tooltip>
);

HoroscopeIcon.propTypes = {
  isTooltipVisible: PropTypes.bool.isRequired,
  tooltip: PropTypes.shape(PropTypes.tooltip).isRequired,
  horoscopeStatus: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onTooltipClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

ListItem.defaultProps = {
  daTracking: null,
  order: 0,
  page: 0,
  pg_ubt: '',
  isSpotLight: false,
  searchType: null,
  canCommunicate: false,
};

ListItem.propTypes = {
  isHovered: PropTypes.bool.isRequired,
  profileUrl: PropTypes.string.isRequired,
  albumUrl: PropTypes.string.isRequired,
  isSpotLight: PropTypes.bool,
  searchType: PropTypes.string,
  profile: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    heShe: PropTypes.heShe.isRequired,
    himHer: PropTypes.himHer.isRequired,
    hisHer: PropTypes.hisHer.isRequired,
    horoscopeScore: PropTypes.string,
    score: PropTypes.string,
    presence: PropTypes.shape({
      onlineStatus: PropTypes.onlineStatus.isRequired,
      lastOnlineDetails: PropTypes.string.isRequired,
      chatIcon: PropTypes.string.isRequired,
    }).isRequired,

    summary: PropTypes.shape({
      infoMap: PropTypes.arrayOf(PropTypes.shape(PropTypes.summaryInfoMapItem)).isRequired,
      listAlbum: PropTypes.arrayOf(PropTypes.string).isRequired,
      createdBy: PropTypes.string.isRequired,
      shortBio: PropTypes.string.isRequired,
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
      isMaskedProfile: PropTypes.bool.isRequired,
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
    uid: PropTypes.string.isRequired,
  }).isRequired,

  settings: PropTypes.shape(PropTypes.searchSettings).isRequired,
  tooltip: PropTypes.shape(PropTypes.tooltip).isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,

  onAction: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onShowContactDetails: PropTypes.func.isRequired,
  onChatNow: PropTypes.func.isRequired,
  onShowWatermarkInfo: PropTypes.func.isRequired,
  onEoiTooltipClose: PropTypes.func.isRequired,
  onPhotoTooltipClose: PropTypes.func.isRequired,
  onRequestPhoto: PropTypes.func.isRequired,
  onRequestPassword: PropTypes.func.isRequired,
  membershipTags: PropTypes.string.isRequired,
  onCallConsultantInvited: PropTypes.func.isRequired,
  onShortlistOpen: PropTypes.func.isRequired,
  onDirectlyShortlist: PropTypes.func.isRequired,
  onDirectlyRemoveShortlist: PropTypes.func.isRequired,
  onDirectlyIgnore: PropTypes.func.isRequired,
  onShowPhotoClick: PropTypes.func.isRequired,
  onNewMatchHover: PropTypes.func.isRequired,
  isNewMatchHovered: PropTypes.bool.isRequired,
  daTracking: PropTypes.func,
  onBlockClick: PropTypes.func.isRequired,
  onMisuseClick: PropTypes.func.isRequired,
  order: PropTypes.number,
  page: PropTypes.number,
  pg_ubt: PropTypes.string,
};

export default ListItem;
