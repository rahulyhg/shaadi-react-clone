import question from './question';

const baseValue = {
  questions: [],
};

export default (baseline = baseValue, payload = {}) => ({
  ...baseline,
  questions: payload.data.map(q => question(undefined, q)),
});
