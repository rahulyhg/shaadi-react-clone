import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import DiscountMsg from '../../Common/DiscountMsg';

const InterestListBanner = props => {
  if (props.settings.isPaidUser) {
    return null;
  }
  const lapsedMember = props.settings.wasPaidUser && !props.settings.isPaidUser;
  if (Object.keys(props.premiumBannner).length === 0) {
    return (
      <s.premiumBannerWrapper
        bannerType="static"
        type={props.type}
        onClick={() => paymentPageRedirect(props, '/payment?source=listing_banner')}
      >
        <s.premiumBannerContainer>
          <s.premiumHankyWrapper>
            <s.premiumHanky />
          </s.premiumHankyWrapper>
          <s.premiumBannerInner>
            <s.premiumBannerHeading>Get 10 times better response by calling directly!</s.premiumBannerHeading>
            {lapsedMember ? (
              <s.premiumBannerGoldenBtn>
                <s.ButtonCrown />
                Renew Premium
              </s.premiumBannerGoldenBtn>
            ) : (
              <s.premiumBannerBtn>View Plans</s.premiumBannerBtn>
            )}
            {props.settings.offer_details !== undefined &&
              props.settings.offer_details.length > 0 && (
                <DiscountMsg offer_details={props.settings.offer_details} bannerType="listbanner" />
              )}
          </s.premiumBannerInner>
        </s.premiumBannerContainer>
      </s.premiumBannerWrapper>
    );
  }

  const profileName = name => (
    <s.ProfileNameWrap>
      <s.ProfileName>{name}&nbsp;</s.ProfileName>has been added to your Accepted Members list.
    </s.ProfileNameWrap>
  );

  return (
    <s.premiumBannerWrapper
      bannerType={props.premiumBannner.bannerType}
      type={props.type}
      onClick={() => paymentPageRedirect(props, '/payment?source=listing_banner')}
      source={props.source}
    >
      <s.premiumBannerContainer source={props.source}>
        <s.premiumHankyWrapper source={props.source}>
          <s.premiumPhotoWrapper>
            <s.premiumBannerPhoto>
              <img src={props.premiumBannner.profilePhotoPath} alt={props.premiumBannner.profileDisplayName} />
            </s.premiumBannerPhoto>
            <s.premiumBannerName>{props.premiumBannner.profileDisplayName}</s.premiumBannerName>
          </s.premiumPhotoWrapper>
        </s.premiumHankyWrapper>
        <s.premiumBannerInner source={props.source}>
          <s.premiumBannerContent>
            {props.premiumBannner.bannerType === 'interest_sent' &&
              `You have sent ${props.premiumBannner.himHer.toLowerCase()} an Invitation on ${props.premiumBannner.actionDate}`}
            {props.premiumBannner.bannerType === 'accepted' &&
              `${props.premiumBannner.heShe} has accepted your Invitation on ${props.premiumBannner.actionDate}`}
            {props.premiumBannner.bannerType === 'shortlisted' &&
              `You have shortlisted ${props.premiumBannner.himHer.toLowerCase()} on ${props.premiumBannner.actionDate}`}
            {props.premiumBannner.bannerType !== 'accept' && <br />}
            {props.premiumBannner.bannerType === 'accept' && profileName(props.premiumBannner.profileDisplayName)}
            {props.premiumBannner.bannerType === 'accept' ? `Take the next step.` : `Why wait?`} Contact{' '}
            {`${props.premiumBannner.himHer.toLowerCase()} `} directly{props.premiumBannner.contactPartial ? ` on ` : `.`}
            <s.premiumBannerTel>
              {`${props.premiumBannner.contactPartial.substr(
                0,
                props.premiumBannner.contactPartial.length - 5,
              )} ${props.premiumBannner.contactPartial.substr(
                props.premiumBannner.contactPartial.length - 5,
                props.premiumBannner.contactPartial.length,
              )}`}
            </s.premiumBannerTel>
          </s.premiumBannerContent>
          {lapsedMember ? (
            <s.premiumBannerGoldenBtn source={props.source}>
              <s.ButtonCrown />Renew Premium
            </s.premiumBannerGoldenBtn>
          ) : (
            <s.premiumBannerBtn source={props.source}>View Plans</s.premiumBannerBtn>
          )}
          {props.settings.offer_details !== undefined &&
            props.settings.offer_details.length > 0 && <DiscountMsg offer_details={props.settings.offer_details} bannerType="listbanner" />}
        </s.premiumBannerInner>
      </s.premiumBannerContainer>
    </s.premiumBannerWrapper>
  );
};

const paymentPageRedirect = (props, to) => {
  window.open(`${props.wwwBaseUrl}${to}`, '_blank');
};

InterestListBanner.defaultProps = {
  premiumBannner: {},
  source: '',
};

InterestListBanner.propTypes = {
  premiumBannner: PropTypes.shape({
    profilePhotoPath: PropTypes.string,
    profileDisplayName: PropTypes.string,
    contactPartial: PropTypes.string,
    himHer: PropTypes.string,
    heShe: PropTypes.string,
    actionDate: PropTypes.string,
    bannerType: PropTypes.string,
  }),
  settings: PropTypes.shape(PropTypes.searchSettings).isRequired,
  type: PropTypes.oneOf(['list', 'grid']).isRequired,
  source: PropTypes.string,
};

export default InterestListBanner;
