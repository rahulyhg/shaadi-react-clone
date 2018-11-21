import PropTypes from 'prop-types';
import React from 'react';
import ContinueButton from './ContinueButton';
import { personalisedFeatures } from '../utils';
import './payment-style.css';

const PersonalisedFeatures = () => (
  <div className="select_features" data-test-selector="personalised_features">
    {personalisedFeatures.map(feature => (
      <div className="select_features_inner" key={feature.selector}>
        <span className={feature.class} data-test-selector={feature.selector} />
        <div>{feature.text}</div>
      </div>
    ))}
  </div>
);
const Feature = ({ isSelected, productCode, btnloading, placeCart }) => (
  <React.Fragment>
    {isSelected && (
      <React.Fragment>
        <PersonalisedFeatures />
        <ContinueButton productCode={productCode} btnloading={btnloading} placeCart={placeCart} />
      </React.Fragment>
    )}
  </React.Fragment>
);
Feature.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  productCode: PropTypes.string.isRequired,
  placeCart: PropTypes.func.isRequired,
  btnloading: PropTypes.bool.isRequired,
};
export default Feature;
