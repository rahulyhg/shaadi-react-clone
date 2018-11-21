const baseValue = {
  offer_code: '',
  offer_details: [],
};

export default function(base = baseValue, payload = {}) {
  const { offer_code, offer_details } = payload;
  return {
    ...base,
    offer_code,
    offer_details,
  };
}
