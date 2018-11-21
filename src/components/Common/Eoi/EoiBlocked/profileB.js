import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from '../styles';
import Tooltip from '../../../Common/Tooltip';
import CustomButton from '../../../Common/CustomButton';
import CustomContactMessage from '../../../Common/CustomContactMessage';

const Profile = props => {
  const { canUnblock, onUnblock, himHer, onReportMisuse, isHovered, membershipTags } = props;
  const isVip = membershipTags === 'vip';
  const onUnblockClick = canUnblock ? onUnblock : null;
  const UnblockMode = canUnblock ? 'enabled' : 'disabled';

  return (
    <s.InvitationBtnContainer isVisible>
      <s.ProfileInvitationHeading isVisible>Connect with {himHer.toLowerCase()}?</s.ProfileInvitationHeading>
      {!canUnblock ? (
        <Tooltip
          trigger="hover"
          placement="left"
          overlayClassName="rc-tooltip-dark-invite"
          offset={[30, -6]}
            overlay={<span>{props.unblockMessage || `You can Unblock this Member once 48 hours have passed since you Blocked ${props.himHer.toLowerCase()}.`}</span>} //eslint-disable-line
        >
          <s.ProfileInvitationButtonWrapper>
            <CustomButton type="Blocked" onClick={onUnblockClick} mode={UnblockMode} isHovered={isHovered} isVip={isVip} />
            <CustomContactMessage message="Unblock" type="Unblock" title="Unblock" mode={UnblockMode} isHovered={isHovered} isVip={isVip} />
          </s.ProfileInvitationButtonWrapper>
        </Tooltip>
      ) : (
        <s.ProfileInvitationButtonWrapper>
          <CustomButton type="Blocked" onClick={onUnblockClick} mode={UnblockMode} isHovered={isHovered} isVip={isVip} />
          <CustomContactMessage message="Unblock" type="Unblock" title="Unblock" mode={UnblockMode} isHovered={isHovered} isVip={isVip} />
        </s.ProfileInvitationButtonWrapper>
      )}
      <s.ProfileInvitationButtonMarginWrapper />
      <s.ProfileInvitationButtonWrapper>
        <CustomButton type="ReportMisuse" onClick={onReportMisuse} />
        <CustomContactMessage message="Report Profile/Photos" type="ReportMisuse" title="Unblock" />
      </s.ProfileInvitationButtonWrapper>
    </s.InvitationBtnContainer>
  );
};

Profile.defaultProps = {
  isHovered: false,
};

Profile.propTypes = {
  isHovered: PropTypes.bool,
  canUnblock: PropTypes.bool.isRequired,
  onUnblock: PropTypes.func.isRequired,
  onReportMisuse: PropTypes.func.isRequired,
  himHer: PropTypes.string.isRequired,
  membershipTags: PropTypes.string.isRequired,
};

export default Profile;
