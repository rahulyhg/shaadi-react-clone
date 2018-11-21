import React from 'react';
import PropTypes from '../../../../PropTypes';
import ss from '../styles';
import CustomButton from '../../../Common/CustomButton';
import CustomContactMessage from '../../../Common/CustomContactMessage';

const isPremiumFeature = ({ isPaidUser, canCommunicate }) => isPaidUser || canCommunicate;
const isPremiumFeatureForWriteMsg = ({ isPaidUser, canCommunicate, isLoggerBothPartyPayUser }) =>
  isPaidUser || (canCommunicate && !isLoggerBothPartyPayUser);
class DailyRecommendations extends React.PureComponent {
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
          <CustomButton type="Decline" title="Decline" isVisible onClick={this.props.onDecline} isPaidUser={isPaidUser} isVip={isVip} />
          <CustomContactMessage
            message="Decline"
            type="Decline"
            title="View Contact"
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
          <CustomButton type="Cancel" title="Cancel" isVisible onClick={this.props.onCancel} isPaidUser={isPaidUser} isVip={isVip} />
          <CustomContactMessage message="Cancel" type="Cancel" title="Cancel" />
        </ss.ProfileInvitationButtonWrapper>
      </ss.InvitationBtnContainer>
    );
  }

  renderDeclined() {
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
  }

  renderTheyCancelled() {
    const headingText = `${this.props.heShe} Cancelled ${this.props.hisHer.toLowerCase()} invitation sent to you.`;
    return (
      <ss.InvitationBtnContainer isVisible>
        <ss.ProfileDeclineHeading>{headingText}</ss.ProfileDeclineHeading>
      </ss.InvitationBtnContainer>
    );
  }

  renderTheyDeclined() {
    return (
      <ss.InvitationBtnContainer isVisible>
        <ss.ProfileDeclineHeading isVisible>{this.props.heShe} Declined your Invitation</ss.ProfileDeclineHeading>
      </ss.InvitationBtnContainer>
    );
  }

  render() {
    switch (this.props.status) {
      case 'accepted':
        return this.renderAccepted();
      case 'theyAccepted':
        return this.renderTheyAccepted();
      case 'declined':
        return this.renderDeclined();
      case 'theyDeclined':
        return this.renderTheyDeclined();
      case 'theyCancelled':
        return this.renderTheyCancelled();
      default:
        return null;
    }
  }
}

DailyRecommendations.defaultProps = {
  onViewPhoneNoClick: null,
  onChatNow: null,
  membershipTags: null,
};

DailyRecommendations.propTypes = {
  status: PropTypes.connectionStatus.isRequired,
  hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  onAccept: PropTypes.func.isRequired,
  onViewPhoneNoClick: PropTypes.func,
  onChatNow: PropTypes.func,
  onDecline: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool.isRequired,
  membershipTags: PropTypes.string,
};
export default DailyRecommendations;
