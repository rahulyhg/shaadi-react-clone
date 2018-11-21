import PropTypes from 'prop-types';
import React from 'react';
import DisplayAmount from '../../Common/DisplayAmount';
import { radioButton } from '../utils';
import './payment-style.css';

const PersonalisedProduct = props => (
  <div
    className={`${props.isSelected ? 'select_plan_bg' : 'select_plan'}`}
    onClick={() => !props.isSelected && props.handleClick(props.productCode)}
    role="presentation"
  >
    <div data-test-selector="personalised_price">
      <div className="radio_spacer">{radioButton(props.isSelected, props.handleClick, props.productCode, props.isPremiumProduct)}</div>
      <span className="select_price">
        <DisplayAmount {...props.perMonthAmtProps} product_code={props.productCode} postFix={'total'} />
      </span>
      <span className="select_month" data-test-selector="personalised_month">
        {` for `}
        {props.duration}
      </span>
      <div className="select_per_month" data-test-selector="personalised_total">
        <DisplayAmount {...props.topAmountProps} product_code={props.productCode} postFix={'actual'} />
        {` per month `}
      </div>
    </div>
  </div>
);

PersonalisedProduct.propTypes = {
  ...PropTypes.productProps,
};
export default PersonalisedProduct;
