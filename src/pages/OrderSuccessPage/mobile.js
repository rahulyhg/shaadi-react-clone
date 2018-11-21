import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { parse } from 'qs';
import PropTypes from '../../PropTypes';
import Order from '../../components/Order';
import onOrderSuccess from '../../actions/onOrderSuccess';

class OrderSuccessPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.paymentDetails = this.paymentDetails.bind(this);
  }
  componentDidMount() {
    this.paymentDetails();
  }
  paymentDetails() {
    this.props.onOrderSuccess(parse(this.props.location.search.slice(1)));
  }
  render() {
    const { orderSuccess, wwwBaseUrl } = this.props;

    return <Order history={this.props.history} wwwBaseUrl={wwwBaseUrl} orderSuccess={orderSuccess} />;
  }
}

OrderSuccessPage.propTypes = {
  orderSuccess: PropTypes.shape(PropTypes.orderSuccess).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
  onOrderSuccess: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const selector = state => {
  const { orderSuccess, config } = state;
  const { wwwBaseUrl } = state.config.app;
  return {
    orderSuccess,
    config,
    wwwBaseUrl,
  };
};
export default withRouter(
  connect(selector, {
    onOrderSuccess,
  })(OrderSuccessPage),
);
