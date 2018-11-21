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

const CasouselItem = props => {
  const trackNOpen = (target = '_blank', event = 'profile_view_from_list') => {
    handleDaTracking(event);
    window.open(props.profileUrl, target);
  };
  const handleDaTracking = event => {
    props.daTracking && props.daTracking(event, { uid: props.item.uid });
  };
  return (
    <TrackVisiblity nodeRef={`track_visiblity_carousel_${props.profile.uid}`} daTracking={handleDaTracking}>
      <s.GridItem isCarousel id={`track_visiblity_carousel_${props.profile.uid}`}>
        <s.PlanBorder plan={props.profile.flags.membershipLevel} isBoldListing={props.profile.flags.isBoldListing} />
        <ProfilePhoto
          type={'grid'}
          isCarousel
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
          hasMore={props.hasMore}
          count={props.count}
          listUrl={props.listUrl}
          uid={props.profile.uid}
          daTracking={props.daTracking}
          isOverlay={props.profile.flags.isMaskedProfile}
        />
        <div role="navigation" onClick={() => trackNOpen()}>
          {!props.profile.flags.isHidden &&
            (props.hasMore !== true || !['ignored', 'blocked'].includes(props.searchType)) && (
              <s.Availability>
                {props.profile.presence.lastOnlineDetails}
                {['Online', 'Offline', 'Idle'].includes(props.profile.presence.onlineStatus) && (
                  <ChatIcon viewType="carousel" chatDetails={props.profile.presence} clickFn={props.onChatNow} />
                )}
              </s.Availability>
            )}
          <s.Body isCarousel hasMore={props.hasMore && ['ignored', 'blocked'].includes(props.searchType)}>
            {(props.hasMore !== true || !['ignored', 'blocked'].includes(props.searchType)) && (
              <s.Header>
                <s.NameLink isGridPage to={props.profileUrl} target="_blank">
                  {props.profile.name.substr(0, 23) + (props.profile.name.length > 25 ? '...' : '')}
                </s.NameLink>
              </s.Header>
            )}
            {(props.hasMore !== true || !['ignored', 'blocked'].includes(props.searchType)) && (
              <s.DetailItems>
                {((props.settings.isNri === true && props.profile.base.miniNriList) || props.profile.base.miniList).map(detail => (
                  <s.DetailItem key={detail.key} isGridItem>
                    {detail.value}
                  </s.DetailItem>
                ))}
              </s.DetailItems>
            )}
          </s.Body>
        </div>
        {!['ignored', 'blocked'].includes(props.searchType) && (
          <Eoi
            type={'grid'}
            isCarousel
            hasMore={props.hasMore}
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
            listUrl={props.listUrl}
            viewMorecount={props.count}
            onTooltipClose={props.onEoiTooltipClose}
            shortlistItems={props.shortlistItems}
          />
        )}
        <s.PlanBtmBorder plan={props.profile.flags.membershipLevel} isBoldListing={props.profile.flags.isBoldListing} />

        {props.profile.flags.isMaskedProfile && (
          <div onMouseEnter={props.onNewMatchHover} onMouseLeave={props.onNewMatchHover}>
            <OverLay onHover>
              <UpgradeBannerBox isVisible={props.isNewMatchHovered} type="grid" source="newmatches_block_carousel" />
            </OverLay>
          </div>
        )}
      </s.GridItem>
    </TrackVisiblity>
  );
};

CasouselItem.defaultProps = {
  isShortlisted: false,
  isIgnored: false,
  daTracking: null,
};

CasouselItem.propTypes = {
  profile: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    heShe: PropTypes.heShe.isRequired,
    himHer: PropTypes.himHer.isRequired,
    hisHer: PropTypes.hisHer.isRequired,

    base: PropTypes.shape({
      miniList: PropTypes.arrayOf(PropTypes.shape(PropTypes.baseInfoMapItem)).isRequired,
      miniNriList: PropTypes.arrayOf(PropTypes.shape(PropTypes.baseInfoMapItem)).isRequired,
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
      isHidden: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  item: PropTypes.shape({
    justNow: PropTypes.bool.isRequired,
    eoiLoadingStyle: PropTypes.loadingStyle.isRequired,
    photoLoading: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,

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
  hasMore: PropTypes.bool.isRequired,
  listUrl: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onEoiTooltipClose: PropTypes.func.isRequired,
  onNewMatchHover: PropTypes.func.isRequired,
  isNewMatchHovered: PropTypes.bool.isRequired,
  daTracking: PropTypes.func,
};

export default CasouselItem;
