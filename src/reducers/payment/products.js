import types from '../../action_types';

const initialState = {
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
    urlParams: {
      acceptCount: 0,
      profileId: '',
      source: '',
    },
    userDetails: {
      name: '',
      email: '',
    },
  },
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PRODUCTS_DETAIL_SUCCESS: {
      if (action.payload.data === null || !action.payload.data) {
        return state;
      }

      const productsData = action.payload.data.paymentData;
      const userDetails = productsData.user_details || {};
      const topHeader = productsData.top_header || {};
      const isOfferDetail = !!('offer_details' in topHeader && topHeader.offer_details.length > 0);
      const isScentTrail = !!('scent_trail' in topHeader && topHeader.scent_trail.length > 0 && topHeader.scent_trail[0].type !== '');
      const offerDetails = isOfferDetail && topHeader.offer_details[0];
      const scentTrail = isScentTrail && topHeader.scent_trail[0];
      const topBand = {
        type: (isOfferDetail && offerDetails.type) || (isScentTrail && scentTrail.type) || '',
        maxDiscount: (isOfferDetail && Number(offerDetails.max_discount)) || 0,
        discountType: (isOfferDetail && offerDetails.discount_type) || '',
        showTicker: (isOfferDetail && offerDetails.show_ticker) || false,
        validTill: (isOfferDetail && offerDetails.valid_till) || '',
        isOldPrice: (isOfferDetail && offerDetails.is_old_price) || false,
        html: (isOfferDetail && offerDetails.html) || '',
        profileId: (isScentTrail && scentTrail.profile_id) || '',
        profileName: (isScentTrail && scentTrail.profile_name) || '',
        photo: (isScentTrail && scentTrail.photo) || '',
        subText: (isScentTrail && scentTrail.sub_text) || '',
        gender: (isScentTrail && scentTrail.gender.toLowerCase()) || 'none',
        currency: productsData.currency,
      };
      const productDetails = {
        defaultProduct: productsData.premium_memberships.filter(f => f.default_selected === true)[0].product_code || '',
        currency: productsData.currency,
        showVip: productsData.show_vip || false,
        currentTime: productsData.current_time,
        offerType: productsData.offer_type || '',
        showSkipLink: productsData.show_skip_link || false,
        skipProfileId: productsData.skip_profile_id || '',
        products: {
          premiumProducts: productsData.premium_memberships,
          personalisedProducts: productsData.personalised_memberships,
        },
      };
      const { payload: { data: { query = {} } } } = action;
      const { profilecount: acceptCount = 0, profileid: profileId = '', source = '' } = query;
      const urlParams = { acceptCount: Number(acceptCount), profileId, source };
      return {
        ...state,
        loading: false,
        paymentData: {
          topBand: { ...topBand, isOfferDetail, isScentTrail },
          productDetails,
          urlParams: { ...urlParams },
          userDetails,
        },
      };
    }
    case types.PRODUCTS_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
}
