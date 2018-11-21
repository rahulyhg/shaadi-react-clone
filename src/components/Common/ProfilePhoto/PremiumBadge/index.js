import React from 'react';
import PropTypes from '../../../../PropTypes';
import BadgeA from './badgeA';
import BadgeB from './badgeB';
import BadgeC from './badgeC';

const PremiumBadge = props => {
  switch (props.bucket) {
    case 'A':
      return <BadgeA membershipTags={props.membershipTags} membershipLevel={props.membershipLevel} isVisible={props.isVisible} />;
    case 'B':
      if (props.membershipLevel !== 'Premium') {
        return <BadgeB membershipTags={props.membershipTags} membershipLevel={props.membershipLevel} isVisible={props.isVisible} />;
      }
      return null;
    case 'C':
      return <BadgeC membershipTags={props.membershipTags} membershipLevel={props.membershipLevel} isVisible={props.isVisible} />;
    default:
      return null;
  }
};
PremiumBadge.defaultProps = {
  membershipTags: 'free',
  bucket: 'A',
  membershipLevel: 'none',
  isVisible: false,
};
PremiumBadge.propTypes = {
  membershipTags: PropTypes.string.isRequired,
  bucket: PropTypes.oneOf(['A', 'B', 'C']).isRequired,
  membershipLevel: PropTypes.oneOf(['Free', 'Premium', 'PremiumPlus', 'Select', 'none']).isRequired,
  isVisible: PropTypes.bool.isRequired,
};
export default PremiumBadge;
