export default account => {
  const { hidden } = account || {};
  return hidden === 'Y' || account.is_hidden === 'Y';
};
