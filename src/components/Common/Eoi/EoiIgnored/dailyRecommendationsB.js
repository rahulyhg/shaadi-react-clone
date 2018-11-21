import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from '../styles';
import CustomButton from '../../../Common/CustomButton';
import CustomContactMessage from '../../../Common/CustomContactMessage';

class DailyRecommendations extends React.PureComponent {
  render() {
    const justNow = this.props.justNow || !this.props.drAction || this.props.drAction === '';
    const { membershipTags, isHovered, onConnect } = this.props;
    const isVip = membershipTags === 'vip';

    if (justNow) {
      return (
        <div>
          <s.ProfileDeclineHeading>{this.props.justNowText || 'Removed from your recommendations'}&nbsp;</s.ProfileDeclineHeading>
        </div>
      );
    }

    return (
      <s.InvitationBtnContainer isVisible>
        <s.ProfileInvitationHeading isVisible>Ignored Member. Changed your mind?</s.ProfileInvitationHeading>
        <s.ProfileInvitationButtonWrapper>
          <CustomButton isVisible title="Connect Now" onClick={onConnect} type="Connect" isVip={isVip} isHovered={isHovered} />
          <CustomContactMessage
            isVisible
            title="Connect Now"
            message="Connect Now"
            onClick={onConnect}
            type="Connect"
            isVip={isVip}
            isHovered={isHovered}
          />
        </s.ProfileInvitationButtonWrapper>
      </s.InvitationBtnContainer>
    );
  }
}

DailyRecommendations.defaultProps = {
  justNowText: null,
  justNow: false,
  drAction: '',
  membershipTags: '',
  isHovered: false,
};

DailyRecommendations.propTypes = {
  justNow: PropTypes.bool,
  justNowText: PropTypes.string,
  drAction: PropTypes.string,
  membershipTags: PropTypes.string,
  isHovered: PropTypes.bool,
  onConnect: PropTypes.func.isRequired,
};

export default DailyRecommendations;
