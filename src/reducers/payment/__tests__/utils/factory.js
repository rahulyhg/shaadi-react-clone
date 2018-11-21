const theDefaultState = {
  paymentData: {
    topBand: {
      isOfferDetail: false,
      isScentTrail: false,
      type: '',
      maxDiscount: 0,
      discountType: '',
      showTicker: false,
      validTill: '',
      isOldPrice: false,
      html: '',
      profileId: '',
      profileName: '',
      photo: '',
      subText: '',
      currency: '',
      gender: 'none',
    },
    productDetails: {
      currency: '',
      showVip: true,
      currentTime: '',
      offerType: '',
      showSkipLink: false,
      skipProfileId: '',
      defaultProduct: '',
      products: {
        premiumProducts: [],
        personalisedProducts: [],
      },
    },
    userDetails: {
      name: '',
      email: '',
    },
    urlParams: {
      acceptCount: 0,
      profileId: '',
      source: '',
    },
  },
  loading: true,
};
const payloadProps = {
  payload: {
    data: {
      paymentData: {
        show_vip: true,
        current_time: '1521187296',
        offer_type: '',
        top_header: [
          {
            offer_details: [],
            scent_trail: [
              {
                type: '',
                profile_id: '',
                profile_name: '',
                gender: '',
                photo: '',
                sub_text: '',
              },
            ],
          },
        ],
        currency: 'USD',
        premium_memberships: [
          {
            duration: 3,
            name: 'Gold',
            product_code: 'SSP_G3',
            plan: 'A',
            price: 97,
            saleprice: '',
            pricepermonth: '33',
            benefits: [
              {
                visible: 'C',
                description: 'Chat with your Matches',
                sequence: 1,
                country: 'All',
                icon: 'chat',
                applicable: 'N',
              },
              {
                visible: 'C',
                description: 'View 75 Contact Numbers',
                sequence: 2,
                country: 'All',
                icon: 'call',
                applicable: 'N',
              },
              {
                visible: 'C',
                description: 'Get highlighted to your Matches',
                sequence: 3,
                country: 'All',
                icon: 'get-highlighted',
                applicable: 'Y',
              },
              {
                visible: 'C',
                description: 'Feature on top of Search Results',
                sequence: 4,
                country: 'All',
                icon: 'top-search',
                applicable: 'Y',
              },
            ],
            best_value: false,
            topseller: false,
            your_plan: false,
            default_selected: true,
            allow_discount: false,
            discount_code: '',
            discount_text: '',
            error_msg: '',
          },
        ],
        personalised_memberships: [
          {
            duration: 3,
            name: 'Select Shaadi',
            product_code: 'PP_SP1',
            plan: 'C',
            price: 599,
            saleprice: '',
            pricepermonth: '200',
            benefits: [
              {
                visible: 'C',
                description: 'All Premium Benefits',
                sequence: 1,
                country: 'All',
                icon: 'all-premium-benefits',
                applicable: 'N',
              },
              {
                visible: 'C',
                description: 'Dedicated Relationship Advisor',
                sequence: 2,
                country: 'All',
                icon: 'dedicated',
                applicable: 'N',
              },
              {
                visible: 'C',
                description: 'Introductions &amp; Meetings',
                sequence: 3,
                country: 'All',
                icon: 'meeting',
                applicable: 'N',
              },
              {
                visible: 'C',
                description: 'Handpicked Matches',
                sequence: 4,
                country: 'All',
                icon: 'handpicked',
                applicable: 'N',
              },
            ],
            best_value: false,
            topseller: false,
            your_plan: false,
            default_selected: false,
            allow_discount: false,
            discount_code: '',
            discount_text: '',
            error_msg: '',
          },
        ],
      },
    },
  },
};
const factory = {
  theDefaultState,
  payloadProps,
};

it('should export theDefaultState, payloadProps', () => {
  expect(Object.keys(factory).length).toEqual(2);
});

export default factory;
