import React from 'react';

const PaymentTabsProps = {
  currentTab: 'PremiumTab',
  productDetails: { showSkipLink: false },
  location: { pathname: '/payment', search: '', hash: '', state: undefined },
  wwwBaseUrl: '',
  cartResult: {
    btnloading: false,
    cartErrorMsg: '',
  },
  isPaidUser: false,
};
const topBandProps = {
  isOfferDetail: false,
  isScentTrail: false,
  type: '',
  maxDiscount: 0,
  discountType: '',
  showTicker: false,
  validTill: '',
  isOldPrice: false,
  profileId: '',
  profileName: '',
  photo: '',
  subText: '',
  currency: 'INR',
  wwwBaseUrl: '',
  gender: 'male',
  html: '',
  urlParams: {
    acceptCount: 0,
    profileId: '',
    source: '',
  },
  loading: true,
};
const offerDiscountCasesProps = {
  type: '',
  maxDiscount: 50,
  discountType: 'perc',
  showTicker: false,
  validTill: '',
  isOldPrice: false,
  currency: 'INR',
  html: '',
};

const scentTrailCasesProps = {
  type: '',
  acceptCount: 0,
  profileId: '5SH26221080',
  profileName: 'Test ID',
  photo: 'https://img1.shaadi.com/2018/02/22/5SH26221080-81e62c-female.webp',
  subText: '28, 5\' 3", Hindu, Rajput, Delhi-NCR, India',
  wwwBaseUrl: 'http://www.shaadi.com',
  gender: 'male',
};

const productSelfProps = {
  currency: 'USD',
  currentTab: 'PremiumTab',
  offerType: '',
  product: {
    best_value: false,
    topseller: false,
    your_plan: false,
    benefits: [
      {
        description: 'Chat with your Matches',
        icon: 'chat',
        applicable: false,
        tooltip: '',
        new_badge: false,
      },
      {
        description: 'View 75 Contact Numbers',
        icon: 'call',
        applicable: false,
        tooltip: '',
        new_badge: false,
      },
      {
        description: 'Get highlighted to your Matches',
        icon: 'get-highlighted',
        applicable: true,
        tooltip: '',
        new_badge: false,
      },
      {
        description: 'Feature on top of Search Results',
        icon: 'top-search',
        applicable: true,
        tooltip: '',
        new_badge: false,
      },
    ],
    name: 'Gold',
    discount_text: '',
    price: 97,
    saleprice: 0,
    pricepermonth: 33,
    duration: 3,
    product_code: 'SSP_GPlus',
    error_msg: '',
  },
  cartResult: {
    btnloading: false,
    cartErrorMsg: '',
  },
  selected: '',
  isPremiumProduct: true,
};
const paymentProps = {
  accessToken: '',
  isPaidUser: false,
  paymentPageAB: 'A',
  location: {
    hash: '',
    pathname: '/payment',
    search: '',
  },
  payment: {
    cartResult: {
      btnloading: false,
      cartErrorMsg: '',
    },
    products: {
      loading: false,
      paymentData: {
        productDetails: {
          currency: 'INR',
          offerType: '',
          currentTime: '1525333098',
          defaultProduct: 'SSP_GPlus',
          products: {
            personalisedProducts: [
              {
                best_value: false,
                topseller: false,
                your_plan: false,
                benefits: [
                  {
                    description: 'Chat with your Matches',
                    icon: 'chat',
                    applicable: false,
                    tooltip: '',
                    new_badge: false,
                  },
                  {
                    description: 'View 75 Contact Numbers',
                    icon: 'call',
                    applicable: false,
                    tooltip: '',
                    new_badge: false,
                  },
                  {
                    description: 'Get highlighted to your Matches',
                    icon: 'get-highlighted',
                    applicable: true,
                    tooltip: '',
                    new_badge: false,
                  },
                  {
                    description: 'Feature on top of Search Results',
                    icon: 'top-search',
                    applicable: true,
                    tooltip: '',
                    new_badge: false,
                  },
                ],
                name: 'Gold',
                discount_text: '',
                price: 97,
                saleprice: 0,
                pricepermonth: 33,
                duration: 3,
                error_msg: '',
                product_code: 'SSP_GPlus',
              },
            ],
            premiumProducts: [],
          },
          showSkipLink: false,
          showVip: true,
          skipProfileId: '',
        },
        topBand: { ...topBandProps },
        urlParams: {
          acceptCount: 0,
          profileId: '',
          source: '',
        },
      },
    },
  },
  wwwBaseUrl: 'https://www.shaadi.com',
  successStories: {
    flash: null,
    items: [],
    loading: false,
  },
};
const revampProps = {
  topBandProps: { ...topBandProps },
  paymentTabsProps: { ...PaymentTabsProps },
  successStoriesProps: {
    stories: {
      loading: false,
      flash: '',
      items: [],
    },
    wwwBaseUrl: '',
    type: 'payment',
    isPayment: true,
    profilePageBucket: '',
  },
};
const revampPlansProps = {
  name: 'Gold Plus',
  productCode: 'SSP_GPlus',
  tagName: 'top_seller',
  offerType: '',
  discountText: '',
  discountDetails: '',
  currency: 'INR',
  price: 4000,
  saleprice: 4000,
  duration: (
    <React.Fragment>
      <span>3 months</span>
    </React.Fragment>
  ),
  topAmountProps: {
    amount: 2340,
    currency: 'INR',
  },
  perMonthAmtProps: {
    amount: 2340,
    currency: 'INR',
  },
  isPremiumProduct: true,
  isSelected: true,
  errorMsg: '',
  btnloading: false,
};
const factory = {
  topBandProps,
  offerDiscountCasesProps,
  scentTrailCasesProps,
  PaymentTabsProps,
  productSelfProps,
  paymentProps,
  revampProps,
  revampPlansProps,
};
it('should export payment', () => {
  expect(factory.topBandProps).not.toBeFalsy();
  expect(factory.offerDiscountCasesProps).not.toBeFalsy();
  expect(factory.scentTrailCasesProps).not.toBeFalsy();
  expect(factory.PaymentTabsProps).not.toBeFalsy();
  expect(factory.productSelfProps).not.toBeFalsy();
  expect(factory.paymentProps).not.toBeFalsy();
  expect(factory.revampProps).not.toBeFalsy();
  expect(factory.revampPlansProps).not.toBeFalsy();
});
export default factory;
