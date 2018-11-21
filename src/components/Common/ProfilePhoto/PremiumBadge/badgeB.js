import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './stylesB';

const BadgeB = props => <s.PremiumBadge isVisible={props.isVisible} plan={props.membershipLevel} tag={props.membershipTags} />;

BadgeB.defaultProps = {
  membershipTags: 'free',
  membershipLevel: 'none',
  isVisible: false,
};
BadgeB.propTypes = {
  membershipTags: PropTypes.string.isRequired,
  membershipLevel: PropTypes.oneOf(['Free', 'Premium', 'PremiumPlus', 'Select', 'none']).isRequired,
  isVisible: PropTypes.bool.isRequired,
};
export default BadgeB;
