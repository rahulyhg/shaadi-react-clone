const isPage = pageName => {
  const regexStr = `^/${pageName}/`;
  const regexp = new RegExp(regexStr, 'i');
  return regexp.test(window.location.pathname);
};

const isStoppage = () => isPage('stop-page');

const isProfileCreationPage = () => isPage('profile-creation');

const isRegPhotoPage = () => isPage('registration');

const isCartPage = () => isPage('cart');

const isPaymentPage = () => isPage('payment');

const isPaymentThankYouPage = () => window.location.pathname === '/payment/thankyou';

const isMyShaadiPage = () => isPage('my-shaadi');

const isPaymentCartPages = () => ['/cart', '/payment', '/payment/thankyou', '/compare-plans'].includes(window.location.pathname);

const isCarouselProfilePage = () => window.location.pathname === '/profile' && window.location.search.indexOf('&referrerUrl') !== -1;

export default function() {
  return {
    isPaymentCartPages: isPaymentCartPages(),
    isRegPhotoPage: isRegPhotoPage(),
    isStoppage: isStoppage(),
    isCartPage: isCartPage(),
    isMyShaadiPage: isMyShaadiPage(),
    isProfileCreationPage: isProfileCreationPage(),
    isPaymentThankYouPage: isPaymentThankYouPage(),
    isPaymentPage: isPaymentPage(),
    canShowChat: !isStoppage() && !isProfileCreationPage() && !isRegPhotoPage() && !isPaymentCartPages(),
    canCallAppInit: !isStoppage() && !isProfileCreationPage() && !isRegPhotoPage(),
    canShowLayerPartial: !isPaymentCartPages() && !isProfileCreationPage(),
    ignoreContentWrap: isStoppage() || isProfileCreationPage() || isRegPhotoPage(),
    ignoreContainer: isStoppage() || isProfileCreationPage() || isRegPhotoPage(),
    needMainPadding: !isStoppage() && !isProfileCreationPage() && !isRegPhotoPage() && !isCarouselProfilePage(),
  };
}
