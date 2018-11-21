/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React from 'react';
import PropTypes from '../../../PropTypes';
import ProfilePhoto from '../../Common/ProfilePhoto';
import Eoi from '../../Common/Eoi';
import ss from '../../PremiumPlusCarousel/styles';
import Timer from '../../../helpers/timer';

const PremiumCarouselItem = props => {
  const moreLink = <ss.MoreText>More</ss.MoreText>;
  const profileMainUrl = `${props.profileUrl}&referrerUrl=${encodeURIComponent(window.location.href)}`;
  return (
    <React.Fragment>
      <ss.CarouselDetails>
        <ss.CarouselTitle>
          <ss.ContentWrapper target="_blank" to={profileMainUrl}>
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
              profileUrl={profileMainUrl}
              wwwBaseUrl={props.wwwBaseUrl}
              uid={props.profile.uid}
              premiumCarousel
              daTracking={props.daTracking}
              isOverlay={props.profile.flags.isMaskedProfile}
            />
          </ss.ContentWrapper>
          <ss.BottomWrapper>
            <ss.BasicWrapper>
              <ss.ProfileName target="_blank" to={profileMainUrl}>
                {props.profile.name.substr(0, 12) + (props.profile.name.length > 12 ? '...' : '')}
              </ss.ProfileName>
              <ss.TextNormal>
                {props.profile.summary.infoMapIndian.map(
                  detail => (detail.key === 'age_height_list' || detail.key === 'mother_tongue') && `${detail.value}, `,
                )}
              </ss.TextNormal>
              {props.profile.flags.isNri === true &&
                props.profile.base.premiumInfo.map(
                  detail => detail.key === 'location' && <ss.TextNormal key={detail.key}>{detail.value}</ss.TextNormal>,
                )}
              {props.profile.flags.isNri !== true &&
                props.profile.summary.infoMapPremiumCarousel.map(
                  detail => detail.key === 'city' && <ss.TextNormal key={detail.key}>{detail.value}</ss.TextNormal>,
                )}
            </ss.BasicWrapper>
            {!['contacted', 'accepted'].includes(props.profile.flags.connectionStatus) && (
              <ss.ProfileDescription>
                <ss.ProfileSpacer />
                <ss.ProfileLink target="_blank" to={profileMainUrl}>
                  {props.profile.summary.shortBio.substr(0, 60) + (props.profile.summary.shortBio.length > 60 ? `...` : '')}
                  {props.profile.summary.shortBio.length > 60 ? moreLink : ''}
                </ss.ProfileLink>
              </ss.ProfileDescription>
            )}
            {['contacted', 'accepted'].includes(props.profile.flags.connectionStatus) && (
              <Timer
                loader={
                  <ss.ProfileDescription>
                    <ss.ProfileSpacer />
                    <ss.ProfileLink target="_blank" to={profileMainUrl}>
                      {props.profile.summary.shortBio.substr(0, 60) + (props.profile.summary.shortBio.length > 60 ? `...` : '')}
                      {props.profile.summary.shortBio.length > 60 ? moreLink : ''}
                    </ss.ProfileLink>
                  </ss.ProfileDescription>
                }
                response={<ss.ContactedText>Contact {props.profile.hisHer.toLowerCase()} directly</ss.ContactedText>}
                time={1}
              />
            )}
          </ss.BottomWrapper>
        </ss.CarouselTitle>
      </ss.CarouselDetails>
      <ss.ButtonWrapper>
        <Eoi
          type={'premiumCarousel'}
          justNow={props.item.justNow}
          profile={props.profile}
          tooltip={props.tooltip}
          loadingStyle={'none'}
          heShe={props.profile.heShe}
          hisHer={props.profile.hisHer}
          connectionStatus={props.profile.flags.connectionStatus}
          justNowText={props.profile.flags.connectionJustNowText}
          onAction={props.onAction}
          settings={props.settings}
          onTooltipClose={props.onEoiTooltipClose}
          shortlistItems={props.shortlistItems}
          onChatNow={props.onChatNow}
          eoiClose={props.item.eoiClose}
        />
      </ss.ButtonWrapper>
    </React.Fragment>
  );
};

PremiumCarouselItem.defaultProps = {
  isShortlisted: false,
  isIgnored: false,
  daTracking: null,
};

PremiumCarouselItem.propTypes = {
  profile: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    heShe: PropTypes.heShe.isRequired,
    himHer: PropTypes.himHer.isRequired,
    hisHer: PropTypes.hisHer.isRequired,

    base: PropTypes.shape({
      premiumInfo: PropTypes.arrayOf(PropTypes.shape(PropTypes.baseInfoMapItem)).isRequired,
    }),

    presence: PropTypes.shape({
      onlineStatus: PropTypes.onlineStatus.isRequired,
      lastOnlineDetails: PropTypes.string.isRequired,
      chatIcon: PropTypes.string,
    }).isRequired,

    summary: PropTypes.shape({
      gridAlbum: PropTypes.arrayOf(PropTypes.string).isRequired,
      infoMap: PropTypes.arrayOf(PropTypes.object).isRequired,
      infoMapIndian: PropTypes.arrayOf(PropTypes.object).isRequired,
      infoMapNri: PropTypes.arrayOf(PropTypes.object).isRequired,
      infoMapPremiumCarousel: PropTypes.arrayOf(PropTypes.object).isRequired,
      shortBio: PropTypes.string,
    }).isRequired,

    flags: PropTypes.shape({
      connectionJustNowText: PropTypes.string,
      connectionStatus: PropTypes.connectionStatus.isRequired,
      membershipLevel: PropTypes.membershipLevel.isRequired,
      albumStatus: PropTypes.albumStatus.isRequired,
      isTwoWayMatch: PropTypes.isTwoWayMatch.isRequired,
      isWatermarked: PropTypes.isWatermarked.isRequired,
      isBoldListing: PropTypes.bool.isRequired,
      isMaskedProfile: PropTypes.bool,
      isNri: PropTypes.bool,
    }),
  }).isRequired,
  item: PropTypes.shape({
    justNow: PropTypes.bool.isRequired,
    eoiLoadingStyle: PropTypes.loadingStyle.isRequired,
    photoLoading: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired,
    eoiClose: PropTypes.bool.isRequired,
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
  onEoiTooltipClose: PropTypes.func.isRequired,
  daTracking: PropTypes.func,
};

export default PremiumCarouselItem;
