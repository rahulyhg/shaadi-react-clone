import PropTypes from 'prop-types';
import React from 'react';
import Products from '../Products';
import MatchGurantee from './MatchGurantee';
import { premiumFeatures } from '../utils';
import './payment-style.css';

const PremiumProducts = ({ paymentTabsProps }) => (
  <React.Fragment>
    <div className="payment_card" data-test-selector="payment_card">
      <div className="plan_feature_text">
        <MatchGurantee />
        {premiumFeatures.map(feature => (
          <div className={feature.class} key={feature.iconclass}>
            <span className={feature.iconclass} />
            <span>{feature.text}</span>
          </div>
        ))}
        <div id="personalised_plans" />
      </div>
      <Products {...paymentTabsProps} isPremiumProduct isRevampPage />
    </div>
    <div className="main_wrapper">
      <div className="view_contact_text">* View upto 10 Contact Numbers in a day</div>
    </div>
  </React.Fragment>
);
PremiumProducts.propTypes = {
  ...PropTypes.paymentTabsProps,
};
export default PremiumProducts;
