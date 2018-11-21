import phoneSettings from './phoneSettings';

const baseValue = {
  phoneSettings: [],
  privacyPreference: {},
};

export default (baseline = baseValue, payload = {}, extra = {}) => ({
  ...baseline,
  phoneSettings: payload.list.map(prof => phoneSettings(undefined, prof)),
  privacyPreference: payload.preferences && payload.preferences.data,
});
