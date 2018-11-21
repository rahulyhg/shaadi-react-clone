import { stringify } from 'qs';
import types from '../../../action_types';

export default ({ dispatch, getState }, uid, q) => {
  const urlFor = (params, id) => {
    if (!id) return null;
    return `/profile/daily-recommendations?${stringify({ ...params, profileid: id })}`;
  };

  const recommendations = getState().dailyRecommendationPage.recommendations;
  const defaultProfileId = recommendations.defaultProfileId;
  const prevDefaultProfileId = recommendations.prevDefaultProfileId;
  const nextDefaultProfileId = recommendations.nextDefaultProfileId;
  const landingProfileId = recommendations.landingProfileId;
  const payload = {
    uid,
    prevText: 'Prev',
    nextText: 'Next',
    backText: null,
    prevUrl: urlFor({ ...q }, prevDefaultProfileId),
    nextUrl: urlFor({ ...q }, nextDefaultProfileId),
    backUrl: null,
    nextUid: nextDefaultProfileId,
    landingProfileId,
    defaultProfileId,
  };

  dispatch({
    type: types.DR_QUEUE_SUCCESS,
    payload,
  });
};
