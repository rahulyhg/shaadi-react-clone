export default payload => {
  const { other } = payload;
  if (other === undefined) return null;
  return other.match_tag === '2-Way';
};
