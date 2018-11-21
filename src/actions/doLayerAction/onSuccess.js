import types from '../../action_types';

export default ({ type, requestedLayer, layer, dispatch, source }) => {
  if (Object.keys(layer.layer).length > 0) {
    switch (requestedLayer) {
      case 'exitIntent': {
        console.log('%c Layer exitIntent', 'font-size: 16px; color: green', layer);
        const modals = {
          daily10: 'dailyRecommendations',
          pending_interest: 'pendingExitIntent',
        };
        if (layer.layer.length >= 1) {
          dispatch({
            type: types.LAYER_SUCCESS,
            payload: { profiles: layer.layer, layerId: 'exitIntent', modal: modals[layer.layerType] },
          });
        } else {
          console.log(
            `%c ERROR, BAD Layer ${type}: ${requestedLayer} <${layer.type}, ${layer.campaign_type}>`,
            'font-size: 16px; color: red',
            layer,
          );
        }
        break;
      }
      case 'campaignLayer': {
        console.log('%c Layer campaignLayer', 'font-size: 16px; color: green', layer);
        if (layer.layer.layer_template && layer.layer.layer_template.template) {
          const { template, image, altText, link } = layer.layer.layer_template;
          const data = {
            loading: false,
            category: template,
            src: image,
            alt: altText,
            url: link,
            name: layer.layer.name,
          };
          dispatch({
            type: types.MODAL_SHOW,
            payload: { ...data, layerId: 'campaignLayer', modal: 'campaignLayer' },
          });
        } else {
          console.log(
            `%c ERROR, BAD Layer ${type}: ${requestedLayer} <${layer.type}, ${layer.campaign_type}>`,
            'font-size: 16px; color: red',
            layer,
          );
        }
        break;
      }
      case 'headerBadge': {
        console.log('%c Layer headerBadge', 'font-size: 16px; color: green', layer);
        dispatch({ type: types.LAYER_SUCCESS, payload: { badge: layer.layer, layerId: 'headerBadge' } });
        break;
      }
      case 'profilePageLeftBanner': {
        console.log('%c Layer profilePageLeftBanner', 'font-size: 16px; color: green', layer);
        dispatch({ type: types.LAYER_SUCCESS, payload: { badge: layer.layer, layerId: 'profilePageLeftBanner' } });
        break;
      }
      case 'profilePageOverlayBanner': {
        console.log('%c Layer profilePageOverlayBanner', 'font-size: 16px; color: green', layer);
        dispatch({ type: types.LAYER_SUCCESS, payload: { badge: layer.layer, layerId: 'profilePageOverlayBanner' } });
        break;
      }
      default:
        console.log(
          `%c TO DO Layer ${type}: ${requestedLayer} <${layer.page || '-'}, ${layer.type || '-'}, ${layer.campaign_type || '-'}>`,
          'font-size: 16px; color: green',
          layer,
        );
    }
  } else {
    console.log(
      `%c Layer ${type}: ${requestedLayer} <${layer.type}, ${layer.campaign_type}> (none received)`,
      'font-size: 16px; color: brown',
      layer.layer,
    );
  }
};
