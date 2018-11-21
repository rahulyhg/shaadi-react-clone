import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';
import ss from '../styles';
import CustomButton from '../../../Common/CustomButton';
import CustomContactMessage from '../../../Common/CustomContactMessage';
import FreeAccessBadge from '../../../FreeAccessBadge';

class Profile extends React.PureComponent {
  renderSameGender = () => {
    //eslint-disable-line
    const { isHovered } = this.props;
    return (
      <ss.InvitationBtnContainer isVisible>
        <ss.ProfileInvitationHeading isVisible>Like this profile?</ss.ProfileInvitationHeading>
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton isVisible title="Connect Now" type="Connect" mode="disabled" isHovered={isHovered} />
          <CustomContactMessage message="Connect Now" title="Connect Now" mode="disabled" type="Connect" isHovered={isHovered} />
        </ss.ProfileInvitationButtonWrapper>
      </ss.InvitationBtnContainer>
    );
  };

  renderCancelled = () => { //eslint-disable-line
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
        <FreeAccessBadge
          isPaidUser={this.props.isPaidUser}
          canCommunicate={this.props.canCommunicate}
          himHer={this.props.himHer}
          toolTipPlacement="bottomRight"
        />
      </ss.InvitationBtnContainer>
    );
  };

  renderHidden = () => { //eslint-disable-line
    return (
      <s.ListHiddenText vALign>
        Please{' '}
        <s.UnhideLink isExternal to="/my-shaadi/profile/unhide/thank-you/y">
          unhide
        </s.UnhideLink>{' '}
        your profile to Connect with this Member.
      </s.ListHiddenText>
    );
  };

  renderDefault = () => {
    const { isPaidUser, membershipTags, isHovered } = this.props;
    const { onConnect, onChatNow, onViewPhoneNoClick, onCallConsultant } = this.props;
    const isVip = membershipTags === 'vip';

    return (
      <ss.InvitationBtnContainer isVisible>
        {<ss.ProfileInvitationHeading isVisible>{isVip ? `Take the next step` : `Like this profile?`}</ss.ProfileInvitationHeading>}
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
          <FreeAccessBadge
            isPaidUser={this.props.isPaidUser}
            canCommunicate={this.props.canCommunicate}
            himHer={this.props.himHer}
            toolTipPlacement="bottomRight"
          />
        </ss.ProfileInvitationButtonWrapper>
        {(isVip || isPaidUser) && <ss.ProfileInvitationButtonMarginWrapper />}
        {isVip && (
          <ss.ProfileInvitationButtonWrapper>
            <CustomButton isVisible onClick={onCallConsultant} title="Call Consultant" type="CallConsultant" isHovered={isHovered} />
            <CustomContactMessage
              message="Call Consultant"
              title="Call Consultant"
              onClick={onCallConsultant}
              type="Connect"
              isVip={isVip}
              isHovered={isHovered}
            />
          </ss.ProfileInvitationButtonWrapper>
        )}

        {isPaidUser &&
          !isVip && [
            <ss.ProfileInvitationButtonWrapper key="premium-0">
              <CustomButton
                isVisible
                onClick={onChatNow}
                title="Write Message"
                type="WriteMessage"
                isPaidUser={isPaidUser}
                isHovered={isHovered}
              />
              <CustomContactMessage
                message="Write Message"
                title="Write Message"
                onClick={onChatNow}
                type="Connect"
                isVip={isVip}
                isPaidUser={isPaidUser}
                isHovered={isHovered}
              />
            </ss.ProfileInvitationButtonWrapper>,
            <ss.ProfileInvitationButtonMarginWrapper key="premium-1" />,
            <ss.ProfileInvitationButtonWrapper key="premium-2">
              <CustomButton
                isVisible
                onClick={onViewPhoneNoClick}
                title="View Contact"
                type="ViewContact"
                isPaidUser={isPaidUser}
                isHovered={isHovered}
              />
              <CustomContactMessage
                message="View Contact"
                title="View Contact"
                type="Connect"
                isVip={isVip}
                isPaidUser={isPaidUser}
                isHovered={isHovered}
              />
            </ss.ProfileInvitationButtonWrapper>,
          ]}
      </ss.InvitationBtnContainer>
    );
  };

  render() {
    const { isSameGender } = this.props;

    if (isSameGender) {
      return this.renderSameGender();
    }
    if (this.props.status === 'cancelled') {
      return this.renderCancelled();
    }
    if (this.props.status === 'hidden') {
      return this.renderHidden();
    }
    return this.renderDefault();
  }
}

Profile.defaultProps = {
  isPaidUser: false,
  isHovered: false,
  onChatNow: null,
  onViewPhoneNoClick: null,
  canCommunicate: false,
};

Profile.propTypes = {
  status: PropTypes.connectionStatus.isRequired,
  // justNow: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool,
  isPaidUser: PropTypes.bool,
  membershipTags: PropTypes.string.isRequired,
  onChatNow: PropTypes.func,
  onViewPhoneNoClick: PropTypes.func,
  onCallConsultant: PropTypes.func.isRequired,
  isSameGender: PropTypes.bool.isRequired,
  onConnect: PropTypes.func.isRequired,
  himHer: PropTypes.string.isRequired,
  canCommunicate: PropTypes.bool,
};

export default Profile;
