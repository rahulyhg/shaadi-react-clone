import PropTypes from 'prop-types';
import React from 'react';
import DisplayAmount from '../../Common/DisplayAmount';
import ContinueButton from './ContinueButton';
import { tagText, contactNumber, hightightedMatches, contactVisible, radioButton } from '../utils';
import './payment-style.css';

const PremiumProduct = props => (
  <div
    className={`plan_wrapper${props.isSelected ? ' relative' : ''}`}
    onClick={() => !props.isSelected && props.handleClick(props.productCode, props.isPremiumProduct)}
    role="presentation"
    data-test-selector={`${props.productCode}_wrapper`}
  >
    <div className={`${props.isSelected ? 'plan_wrapper_selected' : ''}`}>
      <div className="relative">
        {props.tagName !== '' && (
          <div className="best_value" data-test-selector={props.tagName}>
            {tagText[props.tagName]}
          </div>
        )}
      </div>
      <div className="plan_container">
        <div className="radio_spacer"> {radioButton(props.isSelected, props.handleClick, props.productCode, props.isPremiumProduct)} </div>
        <div className="membership_name" data-test-selector={`${props.productCode}_plans`}>
          {props.name}
        </div>
        <div className="membership_prize">
          <DisplayAmount {...props.topAmountProps} product_code={props.productCode} postFix={'actual'} />
        </div>
        <span className="discount_text" data-test-selector="discount">
          {(props.offerType === 'amount' &&
            props.discountText !== '' && (
              <React.Fragment>
                <DisplayAmount amount={Number(props.discountDetails)} currency={props.currency} />
                {` off `}
              </React.Fragment>
            )) ||
            props.discountText}
        </span>&nbsp;
        <span className="strike_price">
          {props.price &&
            props.saleprice !== '0' &&
            props.price !== props.saleprice && (
              <DisplayAmount amount={props.price} currency={props.currency} product_code={props.productCode} postFix={'original'} />
            )}
        </span>
      </div>
      <div className="tick_bg">
        <div className="month_text">
          {props.duration}
          <br />
          <span className="month_text_small">
            <DisplayAmount {...props.perMonthAmtProps} product_code={props.productCode} postFix={'permonth'} />
            {` per month`}
          </span>
        </div>
      </div>
      <div className="view_count">
        <div className="tick_icon" data-test-selector="tick" />
      </div>
      <div className="tick_bg" data-test-selector="count">
        {contactNumber[props.productCode]}
      </div>
      <div className="view_count" data-test-selector="default">
        {hightightedMatches[props.productCode] ? <div className="tick_icon" data-test-selector="tick" /> : '-'}
      </div>
      <div className="tick_bg" data-test-selector="default">
        {contactVisible[props.productCode] ? <div className="tick_icon" data-test-selector="tick" /> : '-'}
      </div>
      {props.isSelected && (
        <div className="button_bg" id="personalised_plans">
          <ContinueButton productCode={props.productCode} btnloading={props.btnloading} placeCart={props.placeCart} />
        </div>
      )}
      {!props.isSelected && <div className="view_count" />}
    </div>
  </div>
);

PremiumProduct.propTypes = {
  ...PropTypes.productProps,
};
export default PremiumProduct;
