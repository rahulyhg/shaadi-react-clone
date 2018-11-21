import React from 'react';
import s from './styles';
import PropTypes from '../../../PropTypes';

const UpgradeText = ({ connectionStatus, heShe, himHer, isFreeMember, isPremiumMember, onViewPhoneNoClick, canCommunicate }) => {
  switch (connectionStatus) {
    case 'theyDeclined':
      return <s.ContactUpgrade>{heShe} Declined your Invitation</s.ContactUpgrade>;
    case 'declined':
      return <s.ContactUpgrade>Declined Member</s.ContactUpgrade>;
    case 'theyCancelled':
      return (
        <s.ContactUpgrade>
          {heShe} cancelled {himHer.toLowerCase()} invitation to you.
        </s.ContactUpgrade>
      );
    case 'cancelled':
      return <s.ContactUpgrade>Cancelled Member</s.ContactUpgrade>;
    default:
      return (
        <s.ContactUpgrade>
          {isFreeMember &&
            canCommunicate === false && (
              <React.Fragment>
                <s.UpgradeLink target="_blank" isExternal to="/payment?source=profilepage_contactdetailscard">
                  Upgrade Now
                </s.UpgradeLink>{' '}
                to view details
              </React.Fragment>
            )}
          {(isPremiumMember || canCommunicate) && <s.ViewBtn onClick={onViewPhoneNoClick}>View details</s.ViewBtn>}
        </s.ContactUpgrade>
      );
  }
};

UpgradeText.propTypes = {
  connectionStatus: PropTypes.string.isRequired,
  heShe: PropTypes.string.isRequired,
  himHer: PropTypes.string.isRequired,
  isFreeMember: PropTypes.bool.isRequired,
  isPremiumMember: PropTypes.bool.isRequired,
  onViewPhoneNoClick: PropTypes.func.isRequired,
  canCommunicate: PropTypes.bool.isRequired,
};
export default UpgradeText;
