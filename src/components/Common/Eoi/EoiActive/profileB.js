import React from 'react';
import PropTypes from '../../../../PropTypes';
import ss from '../styles';
import CustomButton from '../../../Common/CustomButton';
import CustomContactMessage from '../../../Common/CustomContactMessage';

const isPremiumFeature = ({ isPaidUser, canCommunicate }) => isPaidUser || canCommunicate;
const isPremiumFeatureForWriteMsg = ({ isPaidUser, canCommunicate, isLoggerBothPartyPayUser }) =>
  isPaidUser || (canCommunicate && !isLoggerBothPartyPayUser);
class Profile extends React.PureComponent {
  renderTheyDeclined = () => (
    <ss.InvitationBtnContainer isVisible>
      <ss.ProfileDeclineHeading isVisible>{this.props.heShe} Declined your Invitation</ss.ProfileDeclineHeading>
    </ss.InvitationBtnContainer>
  );

  renderDeclined = () => {
    const { membershipTags, isHovered } = this.props;
    const isVip = membershipTags === 'vip';
    return (
      <ss.InvitationBtnContainer isVisible>
        <ss.ProfileInvitationHeading isVisible>Declined Member. Changed your mind?</ss.ProfileInvitationHeading>
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton isAccept onClick={this.props.onAccept} isVisible title="Accept" type="Accept" isVip={isVip} isHovered={isHovered} />
          <CustomContactMessage
            message="Accept"
            title="Accept"
            onClick={this.props.onAccept}
            type="Accept"
            isVip={isVip}
            isPaidUser
            isHovered={isHovered}
          />
        </ss.ProfileInvitationButtonWrapper>
      </ss.InvitationBtnContainer>
    );
  };

  renderAccepted() {
    const { isPaidUser, membershipTags, isHovered } = this.props;
    const { onChatNow, onViewPhoneNoClick } = this.props;
    const isVip = membershipTags === 'vip';
    return (
      <ss.InvitationBtnContainer isVisible>
        <ss.ProfileInvitationHeading isVisible>Accepted Member. Take the next step</ss.ProfileInvitationHeading>
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton
            type="WriteMessage"
            title="Write Message"
            isVisible
            onClick={onChatNow}
            isPaidUser={isPremiumFeatureForWriteMsg(this.props)}
            isVip={isVip}
            isHovered={isHovered}
          />
          <CustomContactMessage
            message="Write Message"
            type="WriteMessage"
            title="Write Message"
            isHovered={isHovered}
            isPaidUser={isPremiumFeatureForWriteMsg(this.props)}
            isVip={isVip}
          />
        </ss.ProfileInvitationButtonWrapper>
        <ss.ProfileInvitationButtonMarginWrapper />
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton
            type="ViewContact"
            title="View Contact"
            isVisible
            onClick={isPremiumFeature(this.props) ? onViewPhoneNoClick : onChatNow}
            isPaidUser={isPremiumFeature(this.props)}
            isVip={isVip}
          />
          <CustomContactMessage
            message="View Contact"
            type="ViewContact"
            title="View Contact"
            isHovered={isHovered}
            isPaidUser={isPremiumFeature(this.props)}
            isVip={isVip}
          />
        </ss.ProfileInvitationButtonWrapper>
        <ss.ProfileInvitationButtonMarginWrapper />
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton
            type="Decline"
            title="Decline"
            isVisible
            onClick={this.props.onDecline}
            isPaidUser={isPaidUser}
            isVip={isVip}
            isDark
          />
          <CustomContactMessage
            message="Decline"
            type="Decline"
            title="Decline"
            isHovered={isHovered}
            isPaidUser={isPaidUser}
            isVip={isVip}
          />
        </ss.ProfileInvitationButtonWrapper>
      </ss.InvitationBtnContainer>
    );
  }

  renderTheyAccepted() {
    const { isPaidUser, membershipTags, isHovered } = this.props;
    const { onChatNow, onViewPhoneNoClick } = this.props;
    const isVip = membershipTags === 'vip';
    return (
      <ss.InvitationBtnContainer isVisible>
        <ss.ProfileInvitationHeading isVisible>
          Invitation Accepted<br />
          Contact directly
        </ss.ProfileInvitationHeading>
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton
            type="WriteMessage"
            title="Write Message"
            isVisible
            onClick={onChatNow}
            isPaidUser={isPremiumFeatureForWriteMsg(this.props)}
            isVip={isVip}
          />
          <CustomContactMessage
            message="Write Message"
            type="WriteMessage"
            title="Write Message"
            isHovered={isHovered}
            isPaidUser={isPremiumFeatureForWriteMsg(this.props)}
            isVip={isVip}
          />
        </ss.ProfileInvitationButtonWrapper>
        <ss.ProfileInvitationButtonMarginWrapper />
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton
            type="ViewContact"
            title="View Contact"
            isVisible
            onClick={isPremiumFeature(this.props) ? onViewPhoneNoClick : onChatNow}
            isPaidUser={isPremiumFeature(this.props)}
            isVip={isVip}
          />
          <CustomContactMessage
            message="View Contact"
            type="ViewContact"
            title="View Contact"
            isHovered={isHovered}
            isPaidUser={isPremiumFeature(this.props)}
            isVip={isVip}
          />
        </ss.ProfileInvitationButtonWrapper>
        <ss.ProfileInvitationButtonMarginWrapper />
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton type="Cancel" title="Cancel" isVisible onClick={this.props.onCancel} isPaidUser={isPaidUser} isVip={isVip} isDark />
          <CustomContactMessage message="Cancel" type="Cancel" title="Cancel" />
        </ss.ProfileInvitationButtonWrapper>
      </ss.InvitationBtnContainer>
    );
  }

  renderCancelled = () => {
    const { isPaidUser, membershipTags, isHovered } = this.props;
    const { onConnect } = this.props;
    const isVip = membershipTags === 'vip';

    return (
      <ss.InvitationBtnContainer isVisible>
        <ss.ProfileInvitationHeading isVisible>Cancelled Member. Changed your mind?</ss.ProfileInvitationHeading>
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton
            onClick={onConnect}
            isVisible
            title="Connect Now"
            type="Connect"
            isVip={isVip}
            isPaidUser={isPaidUser}
            isHovered={isHovered}
          />
          <CustomContactMessage
            message="Connect Now"
            title="Connect Now"
            onClick={onConnect}
            type="Connect"
            isVip={isVip}
            isPaidUser={isPaidUser}
            isHovered={isHovered}
          />
        </ss.ProfileInvitationButtonWrapper>
      </ss.InvitationBtnContainer>
    );
  };

  renderTheyCancelled() {
    const headingText = `${this.props.heShe} Cancelled ${this.props.hisHer.toLowerCase()} invitation sent to you.`;
    return (
      <ss.InvitationBtnContainer isVisible>
        <ss.ProfileDeclineHeading>{headingText}</ss.ProfileDeclineHeading>
      </ss.InvitationBtnContainer>
    );
  }

  render() {
    switch (this.props.status) {
      case 'accepted':
        return this.renderAccepted(this.props);
      case 'theyAccepted':
        return this.renderTheyAccepted(this.props);
      case 'declined':
        return this.renderDeclined(this.props);
      case 'theyDeclined':
        return this.renderTheyDeclined(this.props);
      case 'cancelled':
        return this.renderCancelled(this.props);
      case 'theyCancelled':
        return this.renderTheyCancelled(this.props);
      default:
        return null;
    }
  }
}

Profile.defaultProps = {
  note: null,
  isHovered: false,
  contact: {},
  isProfileFree: false,
};

Profile.propTypes = {
  status: PropTypes.connectionStatus.isRequired,
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
  onConnect: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onChatNow: PropTypes.func.isRequired,
  onViewPhoneNoClick: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool.isRequired,
  membershipTags: PropTypes.string.isRequired,
};

export default Profile;
