import React from 'react';
import PropTypes from '../../../../PropTypes';
import ProfilePhotoList from '../../../Common/ProfilePhotoList';
import PremiumBadge from '../../../Common/ProfilePhotoList/PremiumBadge';
import s from './styles';
import Eoi from '../../../Common/Eoi';
import DiscountMsg from '../../../Common/DiscountMsg';

const FeaturedItem = props => {
  const { type } = props.requestType;

  const isIndianDiaspora = props.profile.flags.isIndianDiaspora;
  const canShowImidiateAction = ({ eoiReqType, justNow, toggleCard }) =>
    ['accept', 'accept_confirm', 'connect_confirm', 'connect'].includes(eoiReqType) && justNow && toggleCard;
  const justNow = canShowImidiateAction({
    eoiReqType: props.item.eoiReqType,
    justNow: props.item.justNow,
    toggleCard: props.item.toggleCard,
  });
  const paymentPageRedirect = () => {
    !props.settings.isPaidUser && justNow && window.open(`${props.wwwBaseUrl}/payment?source=listing_banner`, '_blank');
  };
  const contactPartial =
    (props.item.contact.mask_contact_no && `${props.item.contact.country_code} ${props.item.contact.mask_contact_no}`) || '';
  const showPointer = justNow && !props.settings.isPaidUser;
  return (
    <div>
      <s.MatchItemWrap membershipTags={props.membershipTags}>
        <s.ProfileInfoActionWarp>
          <s.ProfileImgWrap justNow={justNow}>
            <ProfilePhotoList
              type={'FeaturedCard'}
              flags={props.profile.flags}
              photos={props.photos}
              tooltip={props.tooltip}
              loading={props.item.photoLoading}
              albumUrl={props.albumUrl}
              settings={props.settings}
              isTooltipVisible={false}
              onTooltipClose={props.onPhotoTooltipClose}
              onShowWatermarkInfo={props.onShowWatermarkInfo}
              onRequestPhoto={props.onRequestPhoto}
              wwwBaseUrl={props.wwwBaseUrl}
              uid={props.profile.uid}
              onShowPhotoClick={props.onShowPhotoClick}
            />
          </s.ProfileImgWrap>

          <s.ProfileDetailsWrap justNow={justNow}>
            <s.ProNameWrap>
              <s.ProNameInnerWrap>
                <s.ProNameLink membershipTags={props.membershipTags} to={props.profileUrl} target="_blank">
                  {props.profile.name}
                </s.ProNameLink>
                {props.membershipTags !== 'free' && (
                  <s.PremiumBadgeWrap>
                    <PremiumBadge
                      source="inboxCard"
                      membershipTags={props.membershipTags}
                      membershipLevel={props.membershipLevel}
                      isVisible
                    />
                  </s.PremiumBadgeWrap>
                )}
              </s.ProNameInnerWrap>
            </s.ProNameWrap>

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

            {justNow && !props.settings.isPaidUser ? (
              <s.ContactDetails onClick={() => paymentPageRedirect()} showPointer={showPointer}>
                <s.ContactMsg>
                  Contact {`${props.profile.himHer.toLowerCase()}`} directly{contactPartial ? ` on ` : `.`}
                </s.ContactMsg>
                <s.MaskedNumber>
                  {`${contactPartial.substr(0, contactPartial.length - 5)} ${contactPartial.substr(
                    contactPartial.length - 5,
                    contactPartial.length,
                  )}`}
                </s.MaskedNumber>
              </s.ContactDetails>
            ) : (
              <s.ProfileDetails>
                {props.profile.summary[isIndianDiaspora ? 'infoMapFeatured' : 'infoMapFeaturedNri'].map(detail => (
                  <s.DetailDesc key={detail.key}>{detail.value}</s.DetailDesc>
                ))}
              </s.ProfileDetails>
            )}
          </s.ProfileDetailsWrap>
        </s.ProfileInfoActionWarp>
        {type === 'connect' && (
          <s.CtaWrap justNow={justNow}>
            {justNow && !props.settings.isPaidUser ? (
              <s.OfferDetails onClick={() => paymentPageRedirect()} showPointer={showPointer}>
                {props.settings.offer_details !== undefined &&
                  props.settings.offer_details.length > 0 && (
                    <DiscountMsg offer_details={props.settings.offer_details} bannerType="listbanner" />
                  )}
                <s.BannerBtn>View Plans</s.BannerBtn>
              </s.OfferDetails>
            ) : (
              <Eoi
                type="featured"
                justNow={props.item.justNow}
                profile={props.profile}
                settings={props.settings}
                tooltip={props.tooltip}
                loadingStyle={props.item.eoiLoadingStyle}
                onAction={props.onAction}
                onTooltipClose={props.onEoiTooltipClose}
                shortlistItems={props.shortlistItems}
                onShowContactDetails={props.onShowContactDetails}
                onChatNow={props.onChatNow}
              />
            )}
          </s.CtaWrap>
        )}
      </s.MatchItemWrap>
    </div>
  );
};
FeaturedItem.defaultProps = {
  requestType: {},
};
FeaturedItem.propTypes = {
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
    summary: PropTypes.shape({
      infoMap: PropTypes.arrayOf(PropTypes.shape(PropTypes.summaryInfoMapItem)).isRequired,
      listAlbum: PropTypes.arrayOf(PropTypes.string).isRequired,
      gridAlbum: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    flags: PropTypes.shape({
      connectionStatus: PropTypes.connectionStatus.isRequired,
      membershipLevel: PropTypes.membershipLevel.isRequired,
      contactStatus: PropTypes.contactStatus.isRequired,
      isIndianDiaspora: PropTypes.bool.isRequired,
      isHidden: PropTypes.bool.isRequired,
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
    contact: PropTypes.shape({
      mask_contact_no: PropTypes.string,
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
  onShowContactDetails: PropTypes.func.isRequired,
  onShowWatermarkInfo: PropTypes.func.isRequired,
  onEoiTooltipClose: PropTypes.func.isRequired,
  onPhotoTooltipClose: PropTypes.func.isRequired,
  onRequestPhoto: PropTypes.func.isRequired,
  membershipTags: PropTypes.string.isRequired,
  onCallConsultantInvited: PropTypes.func.isRequired,
  membershipLevel: PropTypes.oneOf(['Free', 'Premium', 'PremiumPlus', 'Select', 'none']).isRequired,
  onChatNow: PropTypes.func.isRequired,
  onShowPhotoClick: PropTypes.func.isRequired,
};
export default FeaturedItem;
