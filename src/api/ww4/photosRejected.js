export default uid => {
  const method = 'get';
  const url = `/photo/${uid}/rejected`;
  const relative_url = `/photo/${uid}/rejected`;
  return {
    method,
    url,
    relative_url,
  };
};
