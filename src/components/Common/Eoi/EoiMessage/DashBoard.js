import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../../Common/Loader';
import SvgLoader from '../../../Common/SvgLoader';
import '../styles.css';

const getMessageContent = ({ heShe, hisHer = '' }) => status => {
  const messageMap = {
    loading: () => <SvgLoader isVisible />,
    accepted: () => <Loader />,
    declined: 'Declined Member',
    theyDeclined: `${heShe} Declined`,
    theyCancelled: 'Cancelled Member',
    blocked: 'Blocked Member',
    theyBlocked: `${heShe} Blocked you`,
    misuseReported: 'Blocked Member',
    disabled: ({ hiddenReason = '' }) =>
      ({
        selfDeleted: `Member has deleted ${hisHer.toLowerCase()} Profile`,
        systemDeleted: 'The profile has been deleted.',
        defaultDeleted: `Member has decided to keep ${hisHer.toLowerCase()} profile hidden. Please check again after a few days`,
        selfHidden: `Member has decided to keep ${hisHer.toLowerCase()} profile hidden. Please check again after a few days`,
        systemHidden: `The profile has been temporarily hidden. Please check again after a few days.`,
      }[hiddenReason] || ''),
  };
  return messageMap[status];
};

const connectionActionMap = {
  profile_blocked: 'theyBlocked',
  member_blocked: 'blocked',
};
const DashBoard = props => {
  const connectionStatus = connectionActionMap[props.status] || props.status;
  const message = getMessageContent(props)(connectionStatus);
  return (message && <div className="eoiMessage msgWrapper">{typeof message === 'function' ? message(props) : message}</div>) || null;
};
DashBoard.defaultProps = {
  hiddenReason: '',
};
DashBoard.propTypes = {
  status: PropTypes.string.isRequired,
  hiddenReason: PropTypes.string,
};
export default DashBoard;
