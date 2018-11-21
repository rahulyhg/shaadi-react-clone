import React from 'react';
import PropTypes from 'prop-types';
import TopBand from './TopBand';
import SuccessStories from '../../components/SuccessStories';
import SvgLoader from '../Common/SvgLoader';
import PaymentTabs from './PaymentTabs';
import RevampPaymentPage from './RevampPaymentPage';
import s from './styles';
import ErrorMessage from './ErrorMessage';

const setZopimParams = (name, email, isPaidUser) => {
  if (typeof window.setZopimParams === 'function' && email !== '') window.setZopimParams(name, email, isPaidUser);
};
const Payment = ({ payment, successStories, wwwBaseUrl = '', location = '', isPaidUser = false, addToCart, paymentPageAB }) => {
  const {
    products: { paymentData: { topBand = {}, urlParams = {}, productDetails = {}, userDetails = {} }, loading = true },
    cartResult = {},
  } = payment;
  const { name = '', email = '' } = userDetails;
  const successStoriesProps = { stories: successStories, isPayment: true, type: 'payment', wwwBaseUrl };
  setZopimParams(name, email, isPaidUser);
  const topBandProps = { ...topBand, urlParams, wwwBaseUrl, loading };
  const paymentTabsProps = { addToCart, productDetails, wwwBaseUrl, location, isPaidUser, cartResult };
  const isRevampPage = !!(paymentPageAB === 'B');
  const revampPaymentProps = { topBandProps, paymentTabsProps, successStoriesProps };
  if (paymentPageAB === '') {
    return (
      <s.PaymentWrapper>
        <TopBand {...topBandProps} loading />
        <s.LoaderWrapper>
          <SvgLoader isVisible isBigLoader />
        </s.LoaderWrapper>
      </s.PaymentWrapper>
    );
  }
  return (
    <s.PaymentWrapper>
      {isRevampPage === false && <TopBand {...topBandProps} />}
      {!loading &&
        isRevampPage === false && (
          <React.Fragment>
            <ErrorMessage location={location} />
            <PaymentTabs {...paymentTabsProps} />
            <s.ContentWrapper>{successStories.items && <SuccessStories {...successStoriesProps} />}</s.ContentWrapper>
          </React.Fragment>
        )}
      {!loading &&
        isRevampPage === true && (
          <React.Fragment>
            <RevampPaymentPage {...revampPaymentProps} />
          </React.Fragment>
        )}
      {loading && (
        <s.LoaderWrapper>
          <SvgLoader isVisible isBigLoader />
        </s.LoaderWrapper>
      )}
    </s.PaymentWrapper>
  );
};
Payment.propTypes = {
  ...PropTypes.paymentData,
  accessToken: PropTypes.string.isRequired,
  successStories: PropTypes.shape(PropTypes.successStories).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  addToCart: PropTypes.func.isRequired,
  paymentPageAB: PropTypes.string.isRequired,
};
export default Payment;
