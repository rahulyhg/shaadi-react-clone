import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { parse } from 'qs';
import PropTypes from '../../PropTypes';
import Cart from '../../components/Cart';
import onCartInit from '../../actions/onCartInit';
import doCartAction from '../../actions/doCartAction';

class CartPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cartDetails = this.cartDetails.bind(this);
    this.paymentActionHandler = this.paymentActionHandler.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.cartDetails();
    this.paymentActionHandler('verifiedMobileApi');
  }

  paymentActionHandler(type, ...args) {
    this.props.doCartAction(type, ...args);
  }

  cartDetails(changes = {}) {
    this.props.onCartInit(parse(this.props.location.search.slice(1)));
  }

  render() {
    const {
      cartPage: { cart: { cartData: { cart_details: { currency } } } },
      config: { app: { accessToken = '' } },
      cartPage,
      settings,
    } = this.props;

    const { experiments = {} } = settings;
    const { juspay_express_card_payment: jusPayWeb = {}, juspay_netbanking_upi_payment: jusPayNetBankingWeb = {} } = experiments;
    const juspayAB = jusPayWeb.bucket || 'A';
    const juspayNetBankingAB = jusPayNetBankingWeb.bucket || 'A';

    const cartPageExperiment = currency === 'INR' ? 'C' : 'A';
    const cartProps = {
      cartPage,
      cartPageExperiment,
      accessToken,
      paymentActionHandler: this.paymentActionHandler,
      juspayAB,
      juspayNetBankingAB,
    };
    return <Cart {...cartProps} />;
  }
}

CartPage.propTypes = {
  cartPage: PropTypes.shape({
    cart: PropTypes.shape({
      cartData: PropTypes.shape({
        cart_details: PropTypes.object.isRequired,
        extra_products: PropTypes.array.isRequired,
        mode_of_payment: PropTypes.array.isRequired,
        settings: PropTypes.object.isRequired,
      }),
    }).isRequired,
  }).isRequired,
  onCartInit: PropTypes.func.isRequired,
  doCartAction: PropTypes.func.isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
  config: PropTypes.shape({
    app: PropTypes.shape({ accessToken: PropTypes.string }),
  }).isRequired,
  settings: PropTypes.shape({
    experiments: PropTypes.object,
  }).isRequired,
};

const selector = state => {
  const { session, cartPage, config } = state;
  return {
    settings: session.settings,
    cartPage,
    config,
  };
};
export default withRouter(
  connect(selector, {
    onCartInit,
    doCartAction,
  })(CartPage),
);
