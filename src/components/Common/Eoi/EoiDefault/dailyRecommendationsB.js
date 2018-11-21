import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';
import ss from '../styles';
import CustomButton from '../../../Common/CustomButton';
import FreeAccessBadge from '../../../FreeAccessBadge';
import CustomContactMessage from '../../../Common/CustomContactMessage';

class DailyRecommendations extends React.PureComponent {
  renderHidden = () => (
    <s.ListHiddenText>
      Please{' '}
      <s.UnhideLink isExternal to="/my-shaadi/profile/unhide/thank-you/y">
        unhide
      </s.UnhideLink>{' '}
      your profile to Connect with this Member.
    </s.ListHiddenText>
  );

  renderSameGender() { //eslint-disable-line
    return (
      <ss.InvitationBtnContainer isVisible>
        <ss.ProfileInvitationHeading isVisible>Like this profile?</ss.ProfileInvitationHeading>
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton isVisible type="Connect" mode="disabled" />
          <CustomContactMessage message="Connect Now" type="Connect" />
        </ss.ProfileInvitationButtonWrapper>
      </ss.InvitationBtnContainer>
    );
  }

  renderDefault() {
    const { isPaidUser, isHovered, membershipTags, status, himHer, canCommunicate } = this.props;
    const isVip = membershipTags === 'vip';

    return (
      <ss.InvitationBtnContainer isVisible>
        <FreeAccessBadge isPaidUser={isPaidUser} canCommunicate={canCommunicate} himHer={himHer} toolTipPlacement="top" />
        <s.PaddingFreeAccess />
        <ss.ProfileInvitationHeading isVisible>
          {status === 'cancelled' ? 'Cancelled Member. Changed your mind?' : `Connect with ${himHer.toLowerCase()}?`}
        </ss.ProfileInvitationHeading>
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton
            isVisible
            title="Tell this Member that you wish to Connect!"
            type="Connect"
            onClick={this.props.onConnect}
            isHovered={isHovered}
            isVip={isVip}
            isPaidUser={isPaidUser}
          />
          <CustomContactMessage
            message="Yes"
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
            onClick={this.props.onIgnore}
            isVip={isVip}
            isPaidUser={isPaidUser}
            isHovered={isHovered}
          />
          <CustomContactMessage
            message="No"
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

  renderNo() {
    const { isPaidUser, isHovered, membershipTags, status, canCommunicate, himHer } = this.props;
    const { justNow, justNowText } = this.props;
    const isVip = membershipTags === 'vip';
    if (justNow) {
      return (
        <div>
          <ss.ProfileDeclineHeading>{justNowText || 'Removed from your recommendations'}&nbsp;</ss.ProfileDeclineHeading>
        </div>
      );
    }
    const statusMsgMap = {
      cancelled: 'Cancelled Member. Changed your mind?',
      default: ' Changed your mind?',
    };
    return (
      <ss.InvitationBtnContainer isVisible>
        <FreeAccessBadge isPaidUser={isPaidUser} canCommunicate={canCommunicate} himHer={himHer} toolTipPlacement="top" />
        <s.PaddingFreeAccess />
        {statusMsgMap[status] && <ss.ProfileInvitationHeading isVisible>{statusMsgMap[status]}</ss.ProfileInvitationHeading>}
        <ss.ProfileInvitationButtonWrapper>
          <CustomButton
            isVisible
            title="Tell this Member that you wish to Connect!"
            type="Connect"
            onClick={this.props.onConnect}
            isHovered={isHovered}
            isVip={isVip}
            isPaidUser={isPaidUser}
          />
          <CustomContactMessage
            message="Yes"
            title="Tell this Member that you wish to Connect!"
            type="Connect"
            isVip={isVip}
            isPaidUser={isPaidUser}
            isHovered={isHovered}
          />
        </ss.ProfileInvitationButtonWrapper>
        <ss.ProfileInvitationButtonMarginWrapper />
      </ss.InvitationBtnContainer>
    );
  }

  render() {
    if (this.props.isSameGender) {
      return this.renderSameGender();
    }

    if (this.props.status === 'shortlisted') {
      return this.renderDefault();
    }

    if (this.props.status === 'hidden') {
      return this.renderHidden();
    }

    if (this.props.status === 'cancelled') {
      return this.renderDefault();
    }

    if (this.props.drAction === 'no') {
      return this.renderNo();
    }

    return this.renderDefault();
  }
}

DailyRecommendations.defaultProps = {
  justNowText: null,
  justNow: false,
  isSameGender: false,
  drAction: null,
  canCommunicate: false,
};

DailyRecommendations.propTypes = {
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  status: PropTypes.connectionStatus.isRequired,
  onConnect: PropTypes.func.isRequired,
  onIgnore: PropTypes.func.isRequired,
  isSameGender: PropTypes.bool,
  justNowText: PropTypes.string,
  justNow: PropTypes.bool,
  drAction: PropTypes.string,
  isPaidUser: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool.isRequired,
  membershipTags: PropTypes.string.isRequired,
  canCommunicate: PropTypes.bool,
};

export default DailyRecommendations;
