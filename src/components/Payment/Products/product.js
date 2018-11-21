import React from 'react';
import s from './styles';
import Features from './features';
import PropTypes from '../../../PropTypes';
import RevampProduct from '../RevampPaymentPage/RevampProduct';
import Feature from '../RevampPaymentPage/Feature';
import DisplayAmount from '../../Common/DisplayAmount';

class Product extends React.Component {
  placeCart = (e, product_code, discount_code = '') => {
    e.preventDefault();
    e.stopPropagation();
    this.props.addToCart({ product_code, discount_code });
  };
  render() {
    const {
      product: {
        best_value: bestValue,
        topseller,
        your_plan: yourPlan,
        name,
        error_msg: errorMsg,
        duration,
        discount_text: discountText,
        price,
        saleprice,
        pricepermonth,
        benefits,
        product_code,
        discount_code,
      },
      currency,
      offerType,
      isPremiumProduct,
      cartResult: { cartErrorMsg = '', btnloading = false },
      handleClick,
      selected,
      isRevampPage,
      isPersonalisedFeatures,
    } = this.props;
    const tagName = bestValue ? 'best_value' : topseller ? 'top_seller' : yourPlan ? 'your_plan' : '';
    const productDuration = (
      <React.Fragment>
        <span id={`data_test_${product_code}_month`}>{`${duration}${duration > 1 ? ' months' : ' month'}`}</span>
      </React.Fragment>
    );
    const topAmountProps = { amount: isPremiumProduct === false ? pricepermonth : saleprice, currency };
    const perMonthAmtProps = { amount: isPremiumProduct !== false ? pricepermonth : price, currency };
    const finalError = cartErrorMsg || errorMsg;

    const visible = selected === product_code;
    const discountDetails = offerType === 'amount' ? discountText.replace(/\D/g, '') : '';
    return (
      <React.Fragment>
        {(!isRevampPage && (
          <s.PlanContainer isVisible={visible} id={`data_test_${product_code}`} onClick={() => handleClick(product_code, isPremiumProduct)}>
            {tagName && (
              <s.YourPlanWrapper>
                <s.Tag tagName={tagName} id={`data_test_${tagName}`} />
              </s.YourPlanWrapper>
            )}
            <s.PlanDetails>
              <s.Membership>
                {isPremiumProduct === false && (
                  <React.Fragment>
                    {productDuration}
                    <br />
                    <s.SelectLogo />
                  </React.Fragment>
                )}
                {isPremiumProduct === true && (
                  <React.Fragment>
                    <span id={`data_test_${product_code}_plans`}>{`${name} `}</span>
                    <br />
                    <s.Month>{productDuration}</s.Month>
                  </React.Fragment>
                )}
              </s.Membership>
              <s.PriceContainer>
                <s.Discount id={`data_test_${product_code}_discount`}>
                  {(offerType === 'amount' &&
                    discountText !== '' && (
                      <React.Fragment>
                        <DisplayAmount amount={Number(discountDetails)} currency={currency} />
                        {` off`}
                      </React.Fragment>
                    )) ||
                    discountText}
                </s.Discount>&nbsp;
                {price &&
                  saleprice !== '0' &&
                  price !== saleprice && (
                    <s.StrikeThrough>
                      <DisplayAmount amount={price} currency={currency} product_code={product_code} postFix={'original'} />
                    </s.StrikeThrough>
                  )}{' '}
                {isPremiumProduct === false && (
                  <React.Fragment>
                    <DisplayAmount {...topAmountProps} product_code={product_code} postFix={'actual'} />
                    <s.PersonalisedMonth> per month</s.PersonalisedMonth>
                    <br />
                    <s.PermonthContainer>
                      <s.PersonalisedTotal>
                        Total <DisplayAmount {...perMonthAmtProps} product_code={product_code} postFix={'total'} />
                      </s.PersonalisedTotal>
                    </s.PermonthContainer>
                  </React.Fragment>
                )}
                {isPremiumProduct === true && (
                  <React.Fragment>
                    <DisplayAmount {...topAmountProps} product_code={product_code} postFix={'actual'} />
                    <br />
                    <s.PermonthContainer>
                      <s.PerMonth>Per month </s.PerMonth>
                      <DisplayAmount {...perMonthAmtProps} product_code={product_code} postFix={'permonth'} />
                    </s.PermonthContainer>
                  </React.Fragment>
                )}
              </s.PriceContainer>
              <s.FoldingArrow id={`data_test_close_${product_code}`}>
                <s.DownArrow visible={visible} />
              </s.FoldingArrow>
            </s.PlanDetails>
            <Features
              isVisible={visible}
              placeCart={e => this.placeCart(e, product_code, discount_code)}
              benefits={benefits}
              errorMsg={finalError}
              btnloading={btnloading}
              membershipId={product_code}
            />
          </s.PlanContainer>
        )) ||
          (!isPersonalisedFeatures ? (
            <RevampProduct
              name={name}
              productCode={product_code}
              tagName={tagName}
              duration={productDuration}
              offerType={offerType}
              discountText={discountText}
              discountDetails={discountDetails}
              currency={currency}
              price={price}
              saleprice={saleprice}
              topAmountProps={topAmountProps}
              perMonthAmtProps={perMonthAmtProps}
              handleClick={handleClick}
              isPremiumProduct={isPremiumProduct}
              isSelected={!!(selected === product_code)}
              placeCart={e => this.placeCart(e, product_code, discount_code)}
              errorMsg={finalError}
              btnloading={btnloading}
            />
          ) : (
            <Feature
              productCode={product_code}
              isSelected={!!(selected === product_code)}
              placeCart={e => this.placeCart(e, product_code, discount_code)}
              errorMsg={finalError}
              btnloading={btnloading}
            />
          ))}
      </React.Fragment>
    );
  }
}
Product.defaultProps = {
  isRevampPage: false,
  isPersonalisedFeatures: false,
};
Product.propTypes = {
  product: PropTypes.shape({
    best_value: PropTypes.bool.isRequired,
    topseller: PropTypes.bool.isRequired,
    your_plan: PropTypes.bool.isRequired,
    benefits: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        applicable: PropTypes.bool.isRequired,
      }).isRequired,
    ).isRequired,
    name: PropTypes.string.isRequired,
    discount_text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    saleprice: PropTypes.number.isRequired,
    pricepermonth: PropTypes.number.isRequired,
    error_msg: PropTypes.string.isRequired,
  }).isRequired,
  currency: PropTypes.string.isRequired,
  offerType: PropTypes.string.isRequired,
  isPremiumProduct: PropTypes.bool.isRequired,
  addToCart: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  cartResult: PropTypes.shape({
    cartErrorMsg: PropTypes.string.isRequired,
    btnloading: PropTypes.bool.isRequired,
  }).isRequired,
  isRevampPage: PropTypes.bool,
  isPersonalisedFeatures: PropTypes.bool,
};

export default Product;
