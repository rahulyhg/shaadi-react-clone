const baseValue = {
  experiments: {},
};

export default function(base = baseValue, payload = {}) {
  const { experiment } = payload;
  return {
    ...base,
    experiments: experiment,
  };
}
