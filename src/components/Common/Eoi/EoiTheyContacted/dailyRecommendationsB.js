import React from 'react';
import PropTypes from '../../../../PropTypes';
import ss from '../styles';
import s from './styles';
import CustomButton from '../../../Common/CustomButton';
import CustomContactMessage from '../../../Common/CustomContactMessage';
import FreeAccessBadge from '../../../FreeAccessBadge';

class DailyRecommendations extends React.PureComponent {
  render() {
    const { isPaidUser, isHovered, membershipTags, canCommunicate, himHer } = this.props;
    const { onAccept, onDecline } = this.props;
    const isVip = membershipTags === 'vip';
    return (
      <ss.InvitationBtnContainer isVisible>
        <FreeAccessBadge isPaidUser={isPaidUser} canCommunicate={canCommunicate} himHer={himHer} toolTipPlacement="top" />
        <s.PaddingFreeAccess />
        <ss.ProfileInvitationHeading isVisible>{this.props.heShe} invited you to Connect</ss.ProfileInvitationHeading>
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton
            isVisible
            title="Tell this Member that you wish to Connect!"
            type="Connect"
            onClick={onAccept}
            isHovered={isHovered}
            isVip={isVip}
            isPaidUser={isPaidUser}
          />
          <CustomContactMessage
            message="Accept"
            title="Tell this Member that you wish to Connect!"
            type="Connect"
            isVip={isVip}
            isPaidUser={isPaidUser}
            isHovered={isHovered}
          />
        </ss.ProfileInvitationButtonWrapper>
        <ss.ProfileInvitationButtonMarginWrapper />
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton
            isVisible
            title="This Profile will not be shown again in your 'Daily Recommendations'"
            type="Cancel"
            onClick={onDecline}
            isVip={isVip}
            isPaidUser={isPaidUser}
            isHovered={isHovered}
          />
          <CustomContactMessage
            message="Decline"
            title="This Profile will not be shown again in your 'Daily Recommendations'."
            type="Cancel"
            isVip={isVip}
            isPaidUser={isPaidUser}
            isHovered={isHovered}
          />
        </ss.ProfileInvitationButtonWrapper>
      </ss.InvitationBtnContainer>
    );
  }
}

DailyRecommendations.defaultProps = {
  membershipTags: null,
  canCommunicate: false,
};

DailyRecommendations.propTypes = {
  heShe: PropTypes.heShe.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  membershipTags: PropTypes.string,
  isPaidUser: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool.isRequired,
  canCommunicate: PropTypes.bool,
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
};

export default DailyRecommendations;
