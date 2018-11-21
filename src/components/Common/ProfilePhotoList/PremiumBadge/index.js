import React from 'react';
import PropTypes from '../../../../PropTypes';
import BadgeHorizontal from './badgeHorizontal';
import CrownBadge from './crownBadge';

const PremiumBadge = props => {
  if (props.badgeType === 'crown') {
    return <CrownBadge membershipTags={props.membershipTags} membershipLevel={props.membershipLevel} isVisible={props.isVisible} />;
  }
  return (
    <BadgeHorizontal
      membershipTags={props.membershipTags}
      membershipLevel={props.membershipLevel}
      isVisible={props.isVisible}
      source={props.source}
    />
  );
};

PremiumBadge.defaultProps = {
  membershipTags: 'free',
  bucket: 'A',
  membershipLevel: 'none',
  isVisible: false,
  source: '',
  badgeType: '',
};
PremiumBadge.propTypes = {
  membershipTags: PropTypes.string.isRequired,
  membershipLevel: PropTypes.oneOf(['Free', 'Premium', 'PremiumPlus', 'Select', 'none']).isRequired,
  isVisible: PropTypes.bool.isRequired,
  source: PropTypes.string,
  badgeType: PropTypes.string,
};
export default PremiumBadge;
