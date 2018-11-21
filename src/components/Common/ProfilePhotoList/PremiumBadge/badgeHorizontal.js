import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './stylesHorizontal';

const BadgeHorizontal = props => (
  <s.PremiumBadge isVisible={props.isVisible} plan={props.membershipLevel} tag={props.membershipTags} source={props.source} />
);

BadgeHorizontal.defaultProps = {
  membershipTags: 'free',
  membershipLevel: 'none',
  isVisible: false,
  source: '',
};
BadgeHorizontal.propTypes = {
  membershipTags: PropTypes.string.isRequired,
  membershipLevel: PropTypes.oneOf(['Free', 'Premium', 'PremiumPlus', 'Select', 'none']).isRequired,
  isVisible: PropTypes.bool.isRequired,
  source: PropTypes.string,
};
export default BadgeHorizontal;
