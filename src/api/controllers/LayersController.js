import batchRequestService from '../services/batchRequestService';
import requestService from '../services/requestService';
import ww4 from '../ww4';

const maps = {
  headerBadge: {
    type: 'headerbadge_inner',
    campaign_type: 'layer',
  },
  exitIntent: {
    page: 'exit_intents',
  },
  profilePageLeftBanner: {
    type: 'banner',
    campaign_type: 'banner_profile',
  },
  profilePageOverlayLayer: {
    type: 'layer_react',
    campaign_type: 'layer',
  },
  profilePageOverlayBanner: {
    type: 'banner',
    campaign_type: 'banner_photo',
  },
  campaignLayer: {
    type: 'layer',
    campaign_type: 'layer',
  },
  regExitIntent: {
    page: 'reg-layer',
    type: 'exit_intent',
  },
};

const index = (logger, query, auth) => {
  const { uid } = auth;

  const requests = query.types.reduce((acc, type) => ({ ...acc, [type]: ww4.layer(uid, maps[type]) }), {});

  return batchRequestService(logger, query, auth, requests, data =>
    query.types.reduce(
      (acc, type) => ({ ...acc, [type]: { layer: data[type].data || {}, layerType: data[type].type || type, ...maps[type] } }),
      {},
    ),
  );
};

const getBanner = (logger, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'get',
    url: `/pages/banners/${uid}`,
    params: {
      type: 'accepted_interest',
      decorator: {
        name: 'accepted_banner',
        profile_photo: true,
        img_size: ['small', 'medium'],
        img_border: '_nb',
      },
    },
  };
  return requestService(logger, query, auth, request, d => d);
};

export default {
  index,
  getBanner,
};
