import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';

const HiddenValues = ({
  isShaadiCareChecked,
  isProfileBoosterChecked,
  cartId,
  mopId,
  mopName,
  accessToken,
  bankName,
  otpPage,
  formFields,
  isVerifiedMobile,
  juspay,
  orderId,
}) => (
  <span>
    {isVerifiedMobile && <s.InputHidden name="cust_phone" value={formFields.personPhoneNo} />}
    {otpPage === 'PayAtDoorStep' && (
      <span>
        <s.InputHidden name="cust_city" value={formFields.city} />
        <s.InputHidden name="cust_name" value={formFields.contactPersonName} />
        <s.InputHidden name="cust_phone" value={formFields.personPhoneNo} />
        <s.InputHidden name="cust_address1" value={formFields.address} />
      </span>
    )}
    {otpPage === 'PaymentAtBank' && (
      <span>
        <s.InputHidden name="cust_name" value={formFields.contactPersonName} />
        <s.InputHidden name="cust_phone" value={formFields.personPhoneNo} />
      </span>
    )}
    {otpPage === 'ShaadiCenter' && (
      <span>
        <s.InputHidden name="shaadiCenterCity" value={formFields.city} />
        <s.InputHidden name="centreadd" value={formFields.shaadiCentre} />
      </span>
    )}
    {bankName && <s.InputHidden name="bank_name" value={bankName} />}
    {isShaadiCareChecked && <s.InputHidden name="shaadi_care" value="true" />}
    {isProfileBoosterChecked && <s.InputHidden name="profile_booster" value="true" />}
    {juspay === true && (
      <span>
        <s.InputHidden type="hidden" className="merchant_id" value="com_shaadi" />
        <s.InputHidden type="hidden" className="order_id" value={orderId} />
        <s.InputHidden type="hidden" className="redirect" value="true" />
      </span>
    )}
    <s.InputHidden name="cart_id" value={cartId} />
    <s.InputHidden name="mopid" value={mopId} />
    <s.InputHidden name="mode" value={mopName} />
    <s.InputHidden name="access_token" value={accessToken} />
    <s.InputHidden name="error_url" value={window.location.href.split('?')[0]} />
  </span>
);
HiddenValues.defaultProps = {
  bankName: '',
  isVerifiedMobile: false,
  otpPage: '',
  juspay: false,
  orderId: '',
};
HiddenValues.propTypes = {
  ...PropTypes.cartSubmitProps,
  ...PropTypes.otpHiddenProps,
  isShaadiCareChecked: PropTypes.bool.isRequired,
  isProfileBoosterChecked: PropTypes.bool.isRequired,
  bankName: PropTypes.string,
  otpPage: PropTypes.string,
  isVerifiedMobile: PropTypes.bool.isRequired,
  juspay: PropTypes.bool,
  orderId: PropTypes.string,
};

export default HiddenValues;
