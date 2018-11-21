import PropTypes from 'prop-types';
import React from 'react';
import { parse } from 'qs';
import ErrorMessage from './ErrorMessage';
import TopBandAndSkipLink from './TopBandAndSkipLink';
import PremiumProducts from './PremiumProducts';
import PersonalisedProducts from './PersonalisedProducts';
import SuccessStory from './SuccessStory';
import BackToTop from './BackToTop';
import { responseError } from '../utils';
import './payment-style.css';

class RevampPaymentPage extends React.Component {
  state = {
    viewplan: false,
    showBubbleTop: false,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = event => {
    if (window.pageYOffset > 350) {
      this.setState({ showBubbleTop: true });
    } else {
      this.setState({ showBubbleTop: false });
    }
  };
  viewPlansHandle = () => {
    this.setState({ viewplan: true });
  };
  render() {
    const { topBandProps, paymentTabsProps, successStoriesProps } = this.props;
    const { cartResult, wwwBaseUrl, productDetails, location } = paymentTabsProps;
    const { viewplan, showBubbleTop } = this.state;
    const topBandAndSkipLinkProps = {
      topBandProps,
      location,
      wwwBaseUrl,
      skipProfileId: productDetails.skipProfileId,
      showSkipLink: productDetails.showSkipLink,
    };
    const error = cartResult.cartErrorMsg || responseError(parse(location.search.slice(1)));
    return (
      <div className="main_container" id="error_message">
        <ErrorMessage message={error} />
        <TopBandAndSkipLink {...topBandAndSkipLinkProps} />
        <PremiumProducts paymentTabsProps={paymentTabsProps} />
        <PersonalisedProducts paymentTabsProps={paymentTabsProps} viewplan={viewplan} viewPlansHandle={this.viewPlansHandle} />
        <SuccessStory successStoriesProps={successStoriesProps} />
        <BackToTop show={showBubbleTop} />
      </div>
    );
  }
}

RevampPaymentPage.propTypes = {
  ...PropTypes.topBandProps,
  ...PropTypes.paymentTabsProps,
  ...PropTypes.successStoriesProps,
  ...PropTypes.skipLinkProps,
};
export default RevampPaymentPage;
