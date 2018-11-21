/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React from 'react';
import PropTypes from '../../../PropTypes';
import ProfilePhoto from '../../Common/ProfilePhoto';
import Eoi from '../../Common/Eoi';
import ChatIcon from '../../Common/ChatIcon';
import s from './styles';
import TrackVisiblity from '../../TrackVisiblity';
import OverLay from '../../Common/OverLay';
import { UpgradeBannerBox } from '../../Common/UpgradeBanner';

const GridItem = props => {
  const renderSpotlightDiv = () => (
    <div role="navigation" onClick={() => trackNOpen('_blank')}>
      <s.spotlightOverlayGrid />
      <s.spotLightSpanGrid>Spotlight</s.spotLightSpanGrid>
    </div>
  );

  const trackNOpen = (target = '_blank', event = 'profile_view_from_list') => {
    handleDaTracking(event);
    window.open(props.profileUrl, target);
  };
  const handleDaTracking = event => {
    props.daTracking && props.daTracking(event, { uid: props.item.uid });
  };
  return (
    <TrackVisiblity nodeRef={`true_view_grid_${props.profile.uid}`} daTracking={handleDaTracking}>
      <div id={`true_view_grid_${props.profile.uid}`}>
        <s.GridItem>
          {props.isSpotLight && renderSpotlightDiv()}
          <s.PlanBorder
            plan={props.profile.flags.membershipLevel}
            isSpotLight={props.isSpotLight}
            isBoldListing={props.profile.flags.isBoldListing}
          />
          <ProfilePhoto
            type={'grid'}
            photos={props.profile.summary.gridAlbum}
            flags={props.profile.flags}
            settings={props.settings}
            albumUrl={props.albumUrl}
            tooltip={props.tooltip}
            loading={props.item.photoLoading}
            isTooltipVisible={props.tooltip.position === 'photo' && props.tooltip.uid === props.profile.uid}
            onTooltipClose={props.onPhotoTooltipClose}
            onShowWatermarkInfo={props.onShowWatermarkInfo}
            onRequestPhoto={props.onRequestPhoto}
            onRequestPassword={props.onRequestPassword}
            profileUrl={props.profileUrl}
            wwwBaseUrl={props.wwwBaseUrl}
            uid={props.profile.uid}
            daTracking={props.daTracking}
            isOverlay={props.profile.flags.isMaskedProfile}
          />
          <div role="navigation" onClick={() => trackNOpen()}>
            <s.Availability>
              {props.profile.presence.lastOnlineDetails}
              {['Online', 'Offline', 'Idle'].includes(props.profile.presence.onlineStatus) && (
                <ChatIcon viewType="grid" chatDetails={props.profile.presence} clickFn={props.onChatNow} />
              )}
            </s.Availability>
            <s.Body>
              <s.Header>
                <s.NameLink isGridPage to={props.profileUrl} target="_blank">
                  {props.profile.name.substr(0, 23) + (props.profile.name.length > 25 ? '...' : '')}
                </s.NameLink>
                <s.AvailabilityText title={props.profile.flags.connectionStatus}>
                  Profile created by {props.profile.summary.createdBy}
                </s.AvailabilityText>
              </s.Header>
              <s.DetailItems>
                {props.profile.base.infoList.map(detail => (
                  <s.DetailItem key={detail.key} isGridItem title={detail.value}>
                    {detail.value}
                  </s.DetailItem>
                ))}
              </s.DetailItems>
            </s.Body>
          </div>
          <Eoi
            type={'grid'}
            justNow={props.item.justNow}
            profile={props.profile}
            tooltip={props.tooltip}
            loadingStyle={props.item.eoiLoadingStyle}
            heShe={props.profile.heShe}
            hisHer={props.profile.hisHer}
            connectionStatus={props.profile.flags.connectionStatus}
            justNowText={props.profile.flags.connectionJustNowText}
            onAction={props.onAction}
            settings={props.settings}
            onTooltipClose={props.onEoiTooltipClose}
            shortlistItems={props.shortlistItems}
          />
          <s.PlanBtmBorder
            plan={props.profile.flags.membershipLevel}
            isSpotLight={props.isSpotLight}
            isBoldListing={props.profile.flags.isBoldListing}
          />
          {props.profile.flags.isMaskedProfile && (
            <div onMouseEnter={props.onNewMatchHover} onMouseLeave={props.onNewMatchHover}>
              <OverLay onHover>
                <UpgradeBannerBox isVisible={props.isNewMatchHovered} type="grid" source="newmatches_block_listing" />
              </OverLay>
            </div>
          )}
        </s.GridItem>
      </div>
    </TrackVisiblity>
  );
};
GridItem.defaultProps = {
  isShortlisted: false,
  isIgnored: false,
  daTracking: null,
};

GridItem.propTypes = {
  profile: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    heShe: PropTypes.heShe.isRequired,
    himHer: PropTypes.himHer.isRequired,
    hisHer: PropTypes.hisHer.isRequired,

    base: PropTypes.shape({
      infoList: PropTypes.arrayOf(PropTypes.shape(PropTypes.baseInfoMapItem)).isRequired,
    }),

    presence: PropTypes.shape({
      onlineStatus: PropTypes.onlineStatus.isRequired,
      lastOnlineDetails: PropTypes.string.isRequired,
      chatIcon: PropTypes.string.isRequired,
    }).isRequired,

    summary: PropTypes.shape({
      gridAlbum: PropTypes.arrayOf(PropTypes.string).isRequired,
      createdBy: PropTypes.string.isRequired,
      shortBio: PropTypes.string.isRequired,
    }).isRequired,

    flags: PropTypes.shape({
      connectionJustNowText: PropTypes.string,
      connectionStatus: PropTypes.connectionStatus.isRequired,
      membershipLevel: PropTypes.membershipLevel.isRequired,
      albumStatus: PropTypes.albumStatus.isRequired,
      isTwoWayMatch: PropTypes.isTwoWayMatch.isRequired,
      isWatermarked: PropTypes.isWatermarked.isRequired,
      isBoldListing: PropTypes.bool.isRequired,
      isMaskedProfile: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  item: PropTypes.shape({
    justNow: PropTypes.bool.isRequired,
    eoiLoadingStyle: PropTypes.loadingStyle.isRequired,
    photoLoading: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  isSpotLight: PropTypes.bool.isRequired,
  profileUrl: PropTypes.string.isRequired,
  albumUrl: PropTypes.string.isRequired,
  settings: PropTypes.shape(PropTypes.searchSettings).isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  onAction: PropTypes.func.isRequired,
  tooltip: PropTypes.shape(PropTypes.tooltip).isRequired,
  onChatNow: PropTypes.func.isRequired,
  onShowWatermarkInfo: PropTypes.func.isRequired,
  onPhotoTooltipClose: PropTypes.func.isRequired,
  onRequestPhoto: PropTypes.func.isRequired,
  onRequestPassword: PropTypes.func.isRequired,
  onEoiTooltipClose: PropTypes.func.isRequired,
  onNewMatchHover: PropTypes.func.isRequired,
  isNewMatchHovered: PropTypes.bool.isRequired,
  daTracking: PropTypes.func,
};

export default GridItem;
