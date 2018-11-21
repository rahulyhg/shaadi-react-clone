import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './stylesA';

const BadgeA = props => <s.PremiumBadge isVisible={props.isVisible} plan={props.membershipLevel} tag={props.membershipTags} />;

BadgeA.defaultProps = {
  membershipTags: 'free',
  membershipLevel: 'none',
  isVisible: false,
};
BadgeA.propTypes = {
  membershipTags: PropTypes.string.isRequired,
  membershipLevel: PropTypes.oneOf(['Free', 'Premium', 'PremiumPlus', 'Select', 'none']).isRequired,
  isVisible: PropTypes.bool.isRequired,
};
export default BadgeA;
