import React from 'react';
import s from './styles';
import PropTypes from '../../../PropTypes';
import UpgradeText from './upgradeText';

const text = (id, lable, value) => (
  <s.NumberText id={id}>
    {lable}
    <br />
    {value}
  </s.NumberText>
);

const viewBtn = (connectionStatus, onViewPhoneNoClick) => {
  if (!['theyDeclined', 'declined', 'theyCancelled', 'cancelled'].includes(connectionStatus)) {
    return (
      <s.ViewBtn onClick={onViewPhoneNoClick} id="data_test_view_button">
        <s.ProfileCardIcon icon="view" id="data_test_view_icon" />
      </s.ViewBtn>
    );
  }

  if (['theyDeclined', 'declined', 'theyCancelled', 'cancelled'].includes(connectionStatus)) {
    return <s.ProfileCardIcon icon="cancel" id="data_test_cancel_icon" />;
  }
  return null;
};

const ContactCard = props => {
  const upgradeTextProps = {
    connectionStatus: props.connectionStatus,
    heShe: props.heShe,
    himHer: props.himHer,
    isFreeMember: props.isFreeMember,
    isPremiumMember: props.isPremiumMember,
    onViewPhoneNoClick: props.onViewPhoneNoClick,
    canCommunicate: props.canCommunicate,
  };
  const addPlus = !props.contactPrefix.includes('+') ? '+' : '';
  return (
    <s.ContactWrapper id="data_test_contact_wrapper" data-test-selector="contact_wrapper_cta">
      <s.ContactDetails id="data_test_contact_details">
        {props.contactNumber && (
          <React.Fragment>
            <s.ProfileCardIcon icon="mobile" id="data_test_mobile_icon" />
            {text('data_test_contact_number', 'Contact Number', `${`${addPlus} ${props.contactPrefix} ${props.contactNumber}`}`)}
            <s.SpacerTen />
          </React.Fragment>
        )}
        <s.IconWrapper>
          {props.isFreeMember && props.canCommunicate === false && <s.ProfileCardIcon icon="lock" id="data_test_lock_icon" />}
          {(props.isPremiumMember || props.canCommunicate) && viewBtn(props.connectionStatus, props.onViewPhoneNoClick)}
        </s.IconWrapper>
        <s.ProfileCardIcon icon="inbox" />
        {text('data_test_contact_email', 'Email ID', props.contactEmail)}
      </s.ContactDetails>
      {<UpgradeText {...upgradeTextProps} />}
    </s.ContactWrapper>
  );
};

ContactCard.propTypes = {
  contactPrefix: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  contactEmail: PropTypes.string.isRequired,
  isFreeMember: PropTypes.bool.isRequired,
  isPremiumMember: PropTypes.bool.isRequired,
  onViewPhoneNoClick: PropTypes.func.isRequired,
  connectionStatus: PropTypes.string.isRequired,
  heShe: PropTypes.string.isRequired,
  himHer: PropTypes.string.isRequired,
  canCommunicate: PropTypes.bool.isRequired,
};
export default ContactCard;
