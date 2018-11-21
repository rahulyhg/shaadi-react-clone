const isCarouselProfilePage = window.location.pathname === '/profile' && window.location.search.indexOf('&referrerUrl') !== -1;

const referrerExists = window.location.search.match(/(\?|&)referrerUrl=([^&]*)/);
const getReferrerUrl =
  (isCarouselProfilePage && referrerExists !== null && decodeURIComponent(window.location.search.match(/(\?|&)referrerUrl=([^&]*)/)[2])) ||
  '';
const isNotPaymentPage =
  !['/cart', '/payment', '/payment/thankyou', 'compare-plans'].includes(window.location.pathname) && !isCarouselProfilePage;
const isPaymentPage =
  ['/cart', '/payment', '/payment/thankyou', '/compare-plans'].includes(window.location.pathname) || isCarouselProfilePage;

export { isCarouselProfilePage, getReferrerUrl, isNotPaymentPage, isPaymentPage };
