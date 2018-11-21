export default account => {
  if (account && account.status !== 'Active') {
    return account.status;
  }
  return 'default';
};
