import privacySettings from '../privacySettings';

const baseValue = {
  phoneSettings: {
    list: [],
    preference: '',
  },
};

export default (baseline = baseValue, payload = {}, queryParams) => {
  const { uid } = queryParams;
  return {
    ...baseline,
    phoneSettings: {
      list: privacySettings(undefined, payload, queryParams).phoneSettings,
      preference: privacySettings(undefined, payload, queryParams).privacyPreference[uid].privacy.phone,
    },
  };
};
