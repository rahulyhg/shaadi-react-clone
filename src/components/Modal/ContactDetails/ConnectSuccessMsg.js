import PropTypes from '../../../PropTypes';
import { connectMessagesForStatus } from './utils';

const ConnectSuccessMsg = ({ connectionStatus, contactStatus, data }) => connectMessagesForStatus(connectionStatus, contactStatus, data);

ConnectSuccessMsg.propTypes = {
  data: PropTypes.shape({
    flashType: PropTypes.oneOf(['default', 'fatal', 'success', 'error', 'loading']).isRequired,
    status: PropTypes.oneOf([
      'free',
      'available',
      'availableOnVerification',
      'availableOnVerificationRequested',
      'availableOnMemberVerification',
      'availableOnRequest',
      'lockedMemberAccepted',
      'locked',
      'showFlash',
      'filtered',
      'profileCancelled',
      'member_declined',
      'profile_declined',
      'filteredMemberContacted',
      'member_blocked',
      'member_hidden',
      'showToFreeAndPremium',
      'sku_contact_exceeded',
    ]).isRequired,
  }).isRequired,
  connectionStatus: PropTypes.string.isRequired,
  contactStatus: PropTypes.string.isRequired,
};

export default ConnectSuccessMsg;
