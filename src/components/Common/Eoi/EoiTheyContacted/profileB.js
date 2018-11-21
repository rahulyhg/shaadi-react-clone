import React from 'react';
import PropTypes from '../../../../PropTypes';
import ss from '../styles';
import CustomButton from '../../../Common/CustomButton';
import CustomContactMessage from '../../../Common/CustomContactMessage';

class Profile extends React.PureComponent {
  render() {
    const { membershipTags, isHovered, isPaidUser } = this.props;
    const { onAccept, onDecline } = this.props;
    const isVip = membershipTags === 'vip';

    return (
      <ss.InvitationBtnContainer isVisible>
        <ss.ProfileInvitationHeading isVisible>{this.props.heShe} invited you to Connect</ss.ProfileInvitationHeading>
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton isAccept onClick={onAccept} isVisible title="Accept" type="Accept" isVip={isVip} isHovered={isHovered} />
          <CustomContactMessage
            message="Accept"
            title="Accept"
            onClick={onAccept}
            type="Accept"
            isVip={isVip}
            isPaidUser={isPaidUser}
            isHovered={isHovered}
          />
        </ss.ProfileInvitationButtonWrapper>
        <ss.ProfileInvitationButtonMarginWrapper />
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton isDecline onClick={onDecline} isVisible title="Decline" type="Decline" isHovered={isHovered} />
          <CustomContactMessage
            message="Decline"
            title="Decline"
            onClick={onDecline}
            type="Decline"
            isVip={isVip}
            isPaidUser={isPaidUser}
            isHovered={isHovered}
          />
        </ss.ProfileInvitationButtonWrapper>
      </ss.InvitationBtnContainer>
    );
  }
}

Profile.defaultProps = {
  contact: {},
  isHovered: false,
};

Profile.propTypes = {
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool,
  membershipTags: PropTypes.string.isRequired,
};

export default Profile;
