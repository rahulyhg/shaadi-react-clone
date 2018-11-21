const isNotPaymentPage = !['/cart', '/payment', '/payment/thankyou', 'compare-plans'].includes(window.location.pathname);
const isPaymentPage = ['/cart', '/payment', '/payment/thankyou', '/compare-plans'].includes(window.location.pathname);

export { isNotPaymentPage, isPaymentPage };
