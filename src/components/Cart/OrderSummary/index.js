import PropTypes from 'prop-types';
import React from 'react';
import ProfileBoosterBox from './ProfileBoosterBox';
import ShaadiCareBox from './ShaadiCareBox';
import DisplayAmount from '../../Common/DisplayAmount';
import s from './styles';

const OrderSummary = props => {
  const {
    settings: {
      offerDiscountPerc,
      offerDiscountAmount,
      discountedPrice,
      price,
      yourPrice,
      isProfileBooster,
      isShaadiCare,
      profileBoosterAmount,
      shaadiCareAmount,
    },
    cartInfo: { product_name: productName, duration, currency },
    doProfileBoosterToggle,
    doShaadiCareToggle,
    isProfileBoosterChecked,
    isShaadiCareChecked,
    finalAmount,
  } = props;
  const finalOfferDisplay = offerDiscountPerc ? `(${offerDiscountPerc}% off)` : '';
  const filterProductName = productName.replace('Membership', '');
  return (
    <s.OrderSummaryShadow>
      <s.OrderSummery>
        <s.TitleSummery>ORDER SUMMARY</s.TitleSummery>
        <s.ProductSummery>
          <s.PlanSummery id="product_name">
            {`${filterProductName}`}
            {(filterProductName === 'Select Shaadi Plus' || filterProductName === 'Platinum Plus') && <br />}
            {`${' ('}${duration}${duration === 1 ? ' Month)' : ' Months)'}`}
          </s.PlanSummery>
          <s.PriceSummery id="product_price">
            <DisplayAmount amount={price} currency={currency} />
          </s.PriceSummery>
        </s.ProductSummery>
        {(offerDiscountPerc !== 0 || offerDiscountAmount !== 0) &&
          discountedPrice !== 0 && (
            <s.ProductSummeryDis>
              <s.DiscountSummery id="savings_amount">Savings {finalOfferDisplay}</s.DiscountSummery>
              <s.DiscountPriceSummery id="savings_price">
                <DisplayAmount amount={discountedPrice} currency={currency} />
              </s.DiscountPriceSummery>
            </s.ProductSummeryDis>
          )}
      </s.OrderSummery>
      <s.TotalSummery>
        <s.ProductSummery>
          <s.PlanSummery id="your_price">Your Price</s.PlanSummery>
          <s.PriceSummeryDark id="your_price_amount">
            <DisplayAmount amount={yourPrice} currency={currency} />
          </s.PriceSummeryDark>
        </s.ProductSummery>
      </s.TotalSummery>
      {isProfileBooster && (
        <ProfileBoosterBox
          displayAmount={profileBoosterAmount}
          currency={currency}
          doProfileBoosterToggle={doProfileBoosterToggle}
          isProfileBoosterChecked={isProfileBoosterChecked}
        />
      )}
      {isShaadiCare && (
        <ShaadiCareBox
          displayAmount={shaadiCareAmount}
          currency={currency}
          doShaadiCareToggle={doShaadiCareToggle}
          isShaadiCareChecked={isShaadiCareChecked}
        />
      )}
      <s.TotalSummeryWrapper>
        <s.ProductSummery>
          <s.PlanSummaryTotal id="total_amount">Total Amount</s.PlanSummaryTotal>
          <s.PriceSummaryTotal id="total_price">
            <DisplayAmount amount={finalAmount} currency={currency} />
          </s.PriceSummaryTotal>
        </s.ProductSummery>
      </s.TotalSummeryWrapper>
    </s.OrderSummaryShadow>
  );
};
OrderSummary.propTypes = {
  cartInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  settings: PropTypes.shape(PropTypes.cartSettings).isRequired,
  finalAmount: PropTypes.number.isRequired,
  doProfileBoosterToggle: PropTypes.func.isRequired,
  doShaadiCareToggle: PropTypes.func.isRequired,
  isShaadiCareChecked: PropTypes.bool.isRequired,
  isProfileBoosterChecked: PropTypes.bool.isRequired,
};
export default OrderSummary;
