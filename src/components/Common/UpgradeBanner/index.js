import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

export const UpgradeBanner = props => (
  <s.bannerWrapper>
    <s.bannerHead>Start a conversation with them.</s.bannerHead>

    <s.searchContact>
      <s.searchmail>
        <s.searchimage>
          <s.srchmailicon />
        </s.searchimage>
        <s.searchtxt>Send Email</s.searchtxt>
      </s.searchmail>
      <s.searchmid>
        <s.searchimage>
          <s.srchchaticon />
        </s.searchimage>
        <s.searchtxt>Chat</s.searchtxt>
      </s.searchmid>
      <s.searchcal>
        <s.searchimage>
          <s.srchphnicon />
        </s.searchimage>
        <s.searchtxt>Call / Send SMS</s.searchtxt>
      </s.searchcal>
    </s.searchContact>

    <s.srch_upgradebtn to={`${props.wwwBaseUrl}/payment?pg=pym&amp;source=${props.source}`} target="_blank">
      Upgrade Now
    </s.srch_upgradebtn>
    <s.srch_benefithead>Other Benefits</s.srch_benefithead>
    <s.srch_benefitlist>
      - View college and professional details.<br />
      - Make your profile stand out in search results.
    </s.srch_benefitlist>
  </s.bannerWrapper>
);

UpgradeBanner.defaultProps = {
  source: '',
};

UpgradeBanner.propTypes = {
  source: PropTypes.string,
  wwwBaseUrl: PropTypes.string.isRequired,
};

export const UpgradeBannerBox = props => (
  <s.UpgradeBannerWapper isVisible={props.isVisible}>
    <s.IconLockOnOverlay isVisible={props.isVisible} />
    <s.NewMatchesUpgradeText type={props.type} isVisible={props.isVisible}>
      To connect with newly joined members, Upgrade now
    </s.NewMatchesUpgradeText>
    <s.ButtonWrapper isVisible={props.isVisible}>
      <s.UpgradeNowBtn type={props.type} isVisible={props.isVisible} isExternal to={`/payment?source=${props.source}`} target="_blank">
        View Plans
      </s.UpgradeNowBtn>
    </s.ButtonWrapper>
  </s.UpgradeBannerWapper>
);

UpgradeBannerBox.defaultProps = {
  type: '',
};

UpgradeBannerBox.propTypes = {
  source: PropTypes.string.isRequired,
  type: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
};
