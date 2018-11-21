import PropTypes from 'prop-types';
import React from 'react';
import Products from '../Products';
import './payment-style.css';

const PersonalisedProducts = ({ paymentTabsProps, viewplan, viewPlansHandle }) => (
  <div className="main_wrapper">
    <div className="select_wrapper" data-test-selector="personalised">
      <div className="golden_bg" />
      <div className="personalised_plan_header">
        <div className="personalised_heading" data-test-selector="personalised_heading">
          Handpicked Matches with Personalised Plans
        </div>
        <span className="selectshaadi_logo" />
        <br />
        <div
          className={`${viewplan ? 'view_plans display_off' : 'view_plans'}`}
          data-test-selector="view_plans"
          onClick={e => viewPlansHandle()}
          role="presentation"
          id="view_plans_accordion"
        >
          View Plans <span className="down_arrow" />
        </div>
      </div>
      <div className={`${viewplan ? 'personalised_hide display_on' : 'personalised_hide'}`} id="panel">
        <Products {...paymentTabsProps} isRevampPage isPersonalisedFeatures />
      </div>
    </div>
  </div>
);
PersonalisedProducts.propTypes = {
  paymentTabsProps: PropTypes.shape({
    productDetails: PropTypes.shape(PropTypes.productDetails).isRequired,
    location: PropTypes.shape(PropTypes.location).isRequired,
    addToCart: PropTypes.func.isRequired,
    wwwBaseUrl: PropTypes.string.isRequired,
    cartResult: PropTypes.shape({
      cartErrorMsg: PropTypes.string.isRequired,
      btnloading: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  viewplan: PropTypes.bool.isRequired,
  viewPlansHandle: PropTypes.func.isRequired,
};
export default PersonalisedProducts;
