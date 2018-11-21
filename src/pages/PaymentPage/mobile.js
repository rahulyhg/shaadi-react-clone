import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { parse } from 'qs';
import PropTypes from '../../PropTypes';
import Payment from '../../components/Payment';
import onPaymentInit from '../../actions/onPaymentInit';
import doPayment from '../../actions/doPayment';

class PaymentPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.paymentDetails = this.paymentDetails.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.paymentDetails();
  }
  paymentDetails() {
    this.props.onPaymentInit(parse(this.props.location.search.slice(1)));
  }

  addToCart(changes = {}) {
    this.props.doPayment(changes);
  }
  render() {
    const {
      payment,
      config: { app: { accessToken: { accessToken = '' } } },
      successStories,
      wwwBaseUrl,
      location,
      settings: { isPaidUser, experiments = {} },
    } = this.props;
    const { payment_page = {} } = experiments;
    const paymentPageAB = payment_page.bucket || '';
    const paymentProps = {
      payment,
      accessToken,
      successStories,
      wwwBaseUrl,
      location,
      isPaidUser,
      addToCart: this.addToCart,
      paymentPageAB,
    };
    return <Payment {...paymentProps} />;
  }
}
PaymentPage.defaultProps = {
  payment: {
    products: {
      paymentData: {
        topBand: {},
        productDetails: {},
      },
    },
  },
};
PaymentPage.propTypes = {
  ...PropTypes.paymentData,
  onPaymentInit: PropTypes.func.isRequired,
  doPayment: PropTypes.func.isRequired,
  successStories: PropTypes.shape(PropTypes.successStories).isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
  settings: PropTypes.shape({
    isPaidUser: PropTypes.bool.isRequired,
  }).isRequired,
  config: PropTypes.shape({
    app: PropTypes.shape({ accessToken: PropTypes.string }),
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
};
const selector = (state, { location }) => {
  const { payment, successStories, config, session } = state;
  const { wwwBaseUrl } = state.config.app;
  return {
    payment,
    successStories,
    config,
    wwwBaseUrl,
    location,
    settings: session.settings,
  };
};
export default withRouter(
  connect(selector, {
    onPaymentInit,
    doPayment,
  })(PaymentPage),
);
