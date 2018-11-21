import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import PaymentLoader from '../PaymentTabs/paymentLoader';
import Product from './product';
import VipSection from './vipSection';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      premiumSelected: props.productDetails.defaultProduct || '',
      lastPremiumSelected: props.productDetails.defaultProduct || '',
      personalisedSelected: 'PP_SP6',
      lastPersonalisedSelected: 'PP_SP6',
      loader: false,
    };
  }
  componentDidMount() {
    if (!this.props.isRevampPage) {
      this.setLoaderTime();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isPremiumProduct !== this.props.isPremiumProduct) {
      this.setLoaderTime();
      this.setState(prevState => ({
        premiumSelected: prevState.lastPremiumSelected,
      }));
      this.setState(prevState => ({
        personalisedSelected: prevState.lastPersonalisedSelected,
      }));
    }
  }
  componentWillUnmount() {
    if (!this.props.isRevampPage) {
      clearInterval(this.timer);
    }
  }
  setLoaderTime = () => {
    if (!this.isFirstLoad) {
      this.setState({ loader: true });
      this.timer = setTimeout(() => this.setState({ loader: false }), 1000);
    }
    this.isFirstLoad = false;
  };
  isFirstLoad = true;
  timer = 0;
  handleClick = (name, isPremiumProduct) => {
    if (isPremiumProduct) {
      this.setState({
        premiumSelected: this.state.premiumSelected === name ? '' : name,
        lastPremiumSelected: name,
      });
    } else {
      this.setState({
        personalisedSelected: this.state.personalisedSelected === name ? '' : name,
        lastPersonalisedSelected: name,
      });
    }
  };
  render() {
    const {
      isPremiumProduct,
      productDetails: { currency, offerType, products: { premiumProducts = [], personalisedProducts = [] } = {} } = {},
      addToCart,
      cartResult,
      isRevampPage,
      isPersonalisedFeatures,
    } = this.props;
    const { premiumSelected, personalisedSelected, loader } = this.state;
    const productArray = isPremiumProduct === true ? premiumProducts : personalisedProducts;
    const productProps = {
      addToCart,
      currency,
      isPremiumProduct,
      cartResult,
      handleClick: this.handleClick,
      offerType,
      selected: isPremiumProduct === true ? premiumSelected : personalisedSelected,
      isRevampPage,
    };
    const productsList =
      productArray && productArray.map(product => <Product key={product.product_code} product={product} {...productProps} />);
    const vipSection = isPremiumProduct === false ? <VipSection /> : '';
    const personalisedFeatures =
      isPremiumProduct === false &&
      isRevampPage &&
      isPersonalisedFeatures &&
      productArray.map(product => <Product key={product.product_code} product={product} isPersonalisedFeatures {...productProps} />);
    return (
      <React.Fragment>
        {(loader && <PaymentLoader height={isPremiumProduct ? 'large' : 'small'} />) ||
          ((!isRevampPage && (
            <s.ProductWrapper>
              {productsList}
              {vipSection}
            </s.ProductWrapper>
          )) || (
            <React.Fragment>
              {personalisedFeatures ? (
                <s.PersonalisedPlan>
                  <s.SelectPlanWrapper>{productsList}</s.SelectPlanWrapper>
                </s.PersonalisedPlan>
              ) : (
                productsList
              )}
              {isPersonalisedFeatures && personalisedFeatures}
            </React.Fragment>
          ))}
      </React.Fragment>
    );
  }
}

Products.defaultProps = {
  isPremiumProduct: false,
  isRevampPage: false,
  isPersonalisedFeatures: false,
};

Products.propTypes = {
  isPremiumProduct: PropTypes.bool.isRequired,
  productDetails: PropTypes.shape(PropTypes.paymentDetails).isRequired,
  addToCart: PropTypes.func.isRequired,
  cartResult: PropTypes.shape({
    cartErrorMsg: PropTypes.string.isRequired,
    btnloading: PropTypes.bool.isRequired,
  }).isRequired,
  isRevampPage: PropTypes.bool,
  isPersonalisedFeatures: PropTypes.bool,
};

export default Products;
