import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from '../styles';
import Tooltip from '../../../Common/Tooltip';

const Profile = props => (
  <div>
    <s.InvitationHeading isVisible>Blocked Member. Changed your Mind?</s.InvitationHeading>
    <div>
      {!props.canUnblock ? (
        <Tooltip
          trigger="hover"
          placement="bottom"
          overlayClassName="rc-tooltip-dark-invite"
          offset={[0, -5]}
            overlay={<span>{props.unblockMessage || `You can Unblock this Member once 48 hours have passed since you Blocked ${props.himHer.toLowerCase()}.`}</span>} //eslint-disable-line
        >
          <s.InvitationBtnWithTooltip isVisible isLargeBtn isCancelBtn isUnblock disabled={!props.canUnblock} onClick={props.onUnblock}>
            Unblock
          </s.InvitationBtnWithTooltip>
        </Tooltip>
      ) : (
        <s.InvitationBtn isVisible isLargeBtn isCancelBtn disabled={!props.canUnblock} onClick={props.onUnblock}>
          Unblock
        </s.InvitationBtn>
      )}
      <s.InvitationBtn isVisible isLargeBtn isCancelBtn isUnblock onClick={props.onReportMisuse}>
        Report Profile/Photos
      </s.InvitationBtn>
    </div>
    <s.Note>{props.note || 'This Member cannot view your Profile or contact you on Shaadi.com.'}</s.Note>
  </div>
);

Profile.defaultProps = {
  note: null,
  canUnblock: false,
  unblockMessage: '',
};

Profile.propTypes = {
  note: PropTypes.string,
  canUnblock: PropTypes.bool.isRequired,
  unblockMessage: PropTypes.string,
  onUnblock: PropTypes.func.isRequired,
  onReportMisuse: PropTypes.func.isRequired,
  himHer: PropTypes.string.isRequired,
};

export default Profile;
