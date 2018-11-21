import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';

const CrownBadge = props =>
  props.isVisible && (
    <s.CrownBadge
      styles={props.styles}
      crownType={props.crownType}
      isVisible={props.isVisible}
      plan={props.membershipLevel}
      tag={props.membershipTags}
    />
  );

CrownBadge.defaultProps = {
  membershipTags: 'free',
  membershipLevel: 'none',
  isVisible: false,
  crownType: 'default',
  styles: {},
};
CrownBadge.propTypes = {
  membershipTags: PropTypes.string.isRequired,
  membershipLevel: PropTypes.oneOf(['PremiumPlus', 'Select', 'none']).isRequired,
  isVisible: PropTypes.bool.isRequired,
  crownType: PropTypes.string,
  styles: PropTypes.shape({}),
};
export default CrownBadge;
