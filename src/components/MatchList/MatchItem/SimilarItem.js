/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React from 'react';
import PropTypes from '../../../PropTypes';
import ProfilePhotoList from '../../Common/ProfilePhotoList';
import Eoi from '../../Common/Eoi';
import s from './styles';
import TrackVisiblity from '../../TrackVisiblity';

const SimilarItem = props => {
  const trackNOpen = (target = '_blank', event = 'profile_view_from_list') => {
    handleDaTracking(event);
    window.open(props.profileUrl, target);
  };
  const handleDaTracking = event => {
    props.daTracking && props.daTracking(event, { uid: props.item.uid });
  };
  const isIndianDiaspora = props.profile.flags.isIndianDiaspora;
  return (
    <TrackVisiblity nodeRef={`track_visiblity_carousel_${props.profile.uid}`} daTracking={handleDaTracking}>
      <s.GridItem
        isSimilar
        id={`track_visiblity_carousel_${props.profile.uid}`}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <ProfilePhotoList
          type="similarCard"
          badgeType="crown"
          flags={props.profile.flags}
          photos={props.photos}
          tooltip={props.tooltip}
          loading={props.item.photoLoading}
          albumUrl={props.albumUrl}
          settings={props.settings}
          isTooltipVisible={props.tooltip.position === 'photo' && props.tooltip.uid === props.profile.uid}
          onTooltipClose={props.onPhotoTooltipClose}
          onShowWatermarkInfo={props.onShowWatermarkInfo}
          onRequestPhoto={props.onRequestPhoto}
          wwwBaseUrl={props.wwwBaseUrl}
          uid={props.profile.uid}
          profileUrl={props.profileUrl}
        />
        <s.Header isSimilar>
          <s.NameLink isSimilar onClick={() => trackNOpen()} target="_blank">
            {props.profile.name}
          </s.NameLink>
        </s.Header>
        <div role="navigation" onClick={() => trackNOpen()}>
          <s.Body isCarousel isSimilar>
            <s.DetailItems isSimilar>
              {props.profile.summary[isIndianDiaspora ? 'infoMapInboxIndian' : 'infoMapInboxNri']
                .filter(detail => ['info-0', 'info-2'].includes(detail.key))
                .map(detail => (
                  <s.DetailItem isSimilar key={detail.key}>
                    {detail.value}
                  </s.DetailItem>
                ))}
            </s.DetailItems>
          </s.Body>
        </div>
        <Eoi
          type={'similarProfile'}
          isCarousel
          justNow={props.item.justNow}
          profile={props.profile}
          tooltip={props.tooltip}
          loadingStyle={props.item.eoiLoadingStyle}
          heShe={props.profile.heShe}
          hisHer={props.profile.hisHer}
          connectionStatus={props.profile.flags.connectionStatus}
          justNowText={props.item.justNowText}
          onAction={props.onAction}
          settings={props.settings}
          onTooltipClose={props.onEoiTooltipClose}
          shortlistItems={props.shortlistItems}
          isHovered={props.isHovered}
        />
      </s.GridItem>
    </TrackVisiblity>
  );
};

SimilarItem.defaultProps = {
  daTracking: null,
  item: {
    photoLoading: false,
  },
};

SimilarItem.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
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
      contactStatus: PropTypes.contactStatus.isRequired,
      horoscopeStatus: PropTypes.horoscopeStatus.isRequired,
      albumStatus: PropTypes.albumStatus.isRequired,
      isTwoWayMatch: PropTypes.isTwoWayMatch.isRequired,
      isWatermarked: PropTypes.isWatermarked.isRequired,
      isBoldListing: PropTypes.bool.isRequired,
      isHoroscopeApplicable: PropTypes.bool.isRequired,
      isIndianDiaspora: PropTypes.bool.isRequired,
      isHidden: PropTypes.bool.isRequired,
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
    actionType: PropTypes.string,
    source: PropTypes.string,
    uid: PropTypes.string.isRequired,
    justNowText: PropTypes.string,
    photoLoading: PropTypes.bool,
  }).isRequired,

  settings: PropTypes.shape(PropTypes.searchSettings).isRequired,
  tooltip: PropTypes.shape(PropTypes.tooltip).isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  onRequestPhoto: PropTypes.func.isRequired,
  onEoiTooltipClose: PropTypes.func.isRequired,
  onPhotoTooltipClose: PropTypes.func.isRequired,
  onShowWatermarkInfo: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
  daTracking: PropTypes.func,
  isHovered: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default SimilarItem;
