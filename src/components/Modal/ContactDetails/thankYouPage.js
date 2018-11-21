import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import FieldTick from '../../Common/FieldTick';

const ThankYouPage = props => (
  <s.ContactDetails>
    <s.ContactHeader />
    <s.ContactInner>
      <s.ContactProfileWrp>
        <s.ThankYouTickWrp>
          <FieldTick />
        </s.ThankYouTickWrp>
      </s.ContactProfileWrp>
      <s.ProfileContentHeader>
        Thank you!
        <s.ProfileContactText>{props.data.content}</s.ProfileContactText>
      </s.ProfileContentHeader>
      <s.ContactCloseModalBtn onClick={props.onModalClose} />
    </s.ContactInner>
  </s.ContactDetails>
);

ThankYouPage.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default ThankYouPage;
