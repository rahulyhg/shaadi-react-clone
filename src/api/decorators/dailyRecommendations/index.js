import profile from '../profile';

const baseValue = {
  profiles: [],
  defaultProfileId: '',
  timeLeftToConnect: '',
};

const getFirstNonActionedIndex = data => {
  const nonActionedRecommendations = data
    .map((prof, i) => {
      if (!prof.recommendation || prof.recommendation.action === '') {
        return i;
      }
      return null;
    })
    .filter(i => i !== undefined && i !== null);
  return nonActionedRecommendations[0] || 0;
};

export default (base = baseValue, payload = {}, profileId = '') => {
  let index = 0;
  let lastActionIndex = -1;
  const actionedRecommendations = payload.data
    .map((prof, i) => {
      if (prof.recommendation && prof.recommendation.action !== '') {
        lastActionIndex = i;
        return i;
      }
      return null;
    })
    .filter(i => i !== undefined && i !== null);

  const landingProfileIndex = actionedRecommendations.length > 0 ? actionedRecommendations.pop() + 1 : 0;

  if (profileId) {
    index = payload.data.findIndex(item => item.memberlogin === profileId);
  } else {
    index = landingProfileIndex;
  }
  if (index >= 20) {
    // Find first non actioned Profile
    index = getFirstNonActionedIndex(payload.data);
  }
  const disablePros = payload.data.slice(lastActionIndex + 2).map(item => item.account && item.account.memberlogin);
  const defaultProfile = payload.data[index] || {};
  const landingProfile = payload.data[landingProfileIndex] || {};
  const nextDefaultProfile = payload.data[index + 1] || {};
  const prevDefaultProfile = (index > 0 && payload.data[index - 1]) || {};
  return {
    ...base,
    profiles: payload.data.map(prof => profile(undefined, prof)) || [],
    defaultProfileId: (defaultProfile.account && defaultProfile.account.memberlogin) || '',
    nextDefaultProfileId: (nextDefaultProfile.account && nextDefaultProfile.account.memberlogin) || '',
    prevDefaultProfileId: (prevDefaultProfile.account && prevDefaultProfile.account.memberlogin) || '',
    landingProfileId: (landingProfile.account && landingProfile.account.memberlogin) || '',
    timeLeftToConnect: payload.remainingTime,
    disablePros,
    actionNotTaken: payload.actionNotTaken,
  };
};
