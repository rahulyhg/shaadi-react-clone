import React, { Fragment } from 'react';
import PropTypes from '../../../../PropTypes';
import s from '../styles';
import SvgCheckmark from '../../../Common/SvgCheckmark';
import CustomButton from '../../../Common/CustomButton';
import CustomContactMessage from '../../../Common/CustomContactMessage';

const isPremiumFeature = ({ isPaidUser, canCommunicate }) => isPaidUser || canCommunicate;
const isPremiumFeatureForWriteMsg = ({ isPaidUser, canCommunicate, isLoggerBothPartyPayUser }) =>
  isPaidUser || (canCommunicate && !isLoggerBothPartyPayUser);
const showUpgradeLink = ({ isPaidUser, canCommunicate }) => !isPaidUser && !canCommunicate;

const upgradeLink = profileId => (
  <Fragment>
    <s.UpgradeTextLink isExternal to={`/payment?loc=profile&profileid=${profileId}&source=profile_dr`} target="_blank">
      Upgrade
    </s.UpgradeTextLink>{' '}
    to <br />
  </Fragment>
);

const DailyRecommendations = props => {
  // const { isPaidUser = false } = props.settings;
  const { onChatNow, onViewPhoneNoClick, membershipTags, himHer, status, profileId, isHovered } = props;
  const isVip = membershipTags === 'vip';
  switch (status) {
    case 'contacted':
    case 'filteredContacted':
      return (
        <s.InvitationBtnContainer isVisible>
          <s.SvgCheckmarkWrapper>
            <SvgCheckmark isListingSvg />
          </s.SvgCheckmarkWrapper>
          <s.ProfileInvitationHeading isVisible>
            Invitation sent.<br />
            {showUpgradeLink(props) && <span>{upgradeLink(profileId)}</span>}
            {showUpgradeLink(props) && `to contact ${himHer.toLowerCase()} directly`}
          </s.ProfileInvitationHeading>
          <s.ProfileInvitationButtonWrapper>
            <CustomButton
              type="WriteMessage"
              onClick={onChatNow}
              title="Write Message"
              isVip={isVip}
              isPaidUser={isPremiumFeatureForWriteMsg(props)}
              isHovered={isHovered}
              data-writemessage={isPremiumFeature(props)}
            />
            <CustomContactMessage
              message="Write Message"
              type="WriteMessage"
              title="Write Message"
              isVip={isVip}
              isPaidUser={isPremiumFeatureForWriteMsg(props)}
              isHovered={isHovered}
              data-writemessage={isPremiumFeature(props)}
            />
          </s.ProfileInvitationButtonWrapper>
          <s.ProfileInvitationButtonMarginWrapper />
          <s.ProfileInvitationButtonWrapper>
            <CustomButton
              type="ViewContact"
              onClick={isPremiumFeature(props) ? onViewPhoneNoClick : onChatNow}
              title="View Contact"
              isVip={isVip}
              isPaidUser={isPremiumFeature(props)}
              isHovered={isHovered}
              data-viewcontact={isPremiumFeature(props)}
            />
            <CustomContactMessage
              message="View Contact"
              title="View Contact"
              type="ViewContact"
              isVip={isVip}
              isPaidUser={isPremiumFeature(props)}
              isHovered={isHovered}
              data-viewcontact={isPremiumFeature(props)}
            />
          </s.ProfileInvitationButtonWrapper>
        </s.InvitationBtnContainer>
      );
    default:
  }
  return null;
};

DailyRecommendations.defaultProps = {
  onViewPhoneNoClick: null,
  onChatNow: null,
  membershipTags: null,
  profileId: null,
  isHovered: false,
};

DailyRecommendations.propTypes = {
  status: PropTypes.connectionStatus.isRequired,
  onViewPhoneNoClick: PropTypes.func,
  onChatNow: PropTypes.func,
  // settings: PropTypes.shape({
  //   isPaidUser: PropTypes.bool,
  // }).isRequired,
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  membershipTags: PropTypes.string,
  profileId: PropTypes.string,
  isHovered: PropTypes.bool,
};

export default DailyRecommendations;
