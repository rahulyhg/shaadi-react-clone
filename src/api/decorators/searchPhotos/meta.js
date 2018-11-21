const baseValue = {
  results_id: '',
  page: 1,
};

export default (base = baseValue, payload, query) => ({
  ...query,
  ...base,
  page: payload.page,
  results_id: payload.key,
});
