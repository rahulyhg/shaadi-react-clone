import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const TextLink = ({ name, options, profileContactCard }) => {
  switch (name) {
    case 'lock':
      return (
        profileContactCard === 'B' &&
        options.isFreeMember && (
          <s.UpgradeLink target="_blank" isExternal to="/payment?source=visual_profile_edu_link" id="data_test_payment_link">
            <s.LockSmall id="data_test_lock_icon" />
          </s.UpgradeLink>
        )
      );
    default:
      return null;
  }
};

TextLink.defaultProps = {
  profileContactCard: 'A',
};

TextLink.propTYpes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.func.isRequired,
  profileContactCard: PropTypes.string,
};

export default TextLink;
