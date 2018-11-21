export default (payload = []) => (payload instanceof Array ? payload.map(item => item.city_label) : payload);
