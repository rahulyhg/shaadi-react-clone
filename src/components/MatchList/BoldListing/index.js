import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const BoldListing = props => <s.PremiumBorder plan={props.membershipLevel} tag={props.membershipTags} source={props.source} />;

BoldListing.defaultProps = {
  membershipTags: 'free',
  membershipLevel: 'none',
  source: '',
};
BoldListing.propTypes = {
  membershipTags: PropTypes.string.isRequired,
  membershipLevel: PropTypes.oneOf(['Free', 'Premium', 'PremiumPlus', 'Select', 'none']).isRequired,
  source: PropTypes.string,
};
export default BoldListing;
