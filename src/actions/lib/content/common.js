const extractError = data => {
  const message = data && data.error && data.error.message;
  if (
    !message ||
    `${message}`.toLowerCase().includes('unknown') ||
    `${message}`.toLowerCase().includes('service') ||
    `${message}`.toLowerCase().includes('sql')
  ) {
    return 'Something went wrong.  Try again later.';
  }
  return message;
};

export default {
  loudError: (data, title) => [title || `Error!`, [extractError(data)]],
  titleError: data => [extractError(data)],
  error: data => [null, [extractError(data)]],
};
