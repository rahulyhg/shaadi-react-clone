import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './stylesC';

const BadgeC = props => <s.PremiumBadge isVisible={props.isVisible} plan={props.membershipLevel} tag={props.membershipTags} />;

BadgeC.defaultProps = {
  membershipTags: 'free',
  membershipLevel: 'none',
  isVisible: false,
};
BadgeC.propTypes = {
  membershipTags: PropTypes.string.isRequired,
  membershipLevel: PropTypes.oneOf(['Free', 'Premium', 'PremiumPlus', 'Select', 'none']).isRequired,
  isVisible: PropTypes.bool.isRequired,
};
export default BadgeC;
