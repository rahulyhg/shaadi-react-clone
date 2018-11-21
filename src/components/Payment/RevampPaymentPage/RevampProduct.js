import PropTypes from 'prop-types';
import React from 'react';
import PremiumProduct from './PremiumProduct';
import PersonalisedProduct from './PersonalisedProduct';
import './payment-style.css';

const RevampProduct = props => (
  <React.Fragment> {(props.isPremiumProduct && <PremiumProduct {...props} />) || <PersonalisedProduct {...props} />}</React.Fragment>
);

RevampProduct.propTypes = {
  ...PropTypes.productProps,
};
export default RevampProduct;
