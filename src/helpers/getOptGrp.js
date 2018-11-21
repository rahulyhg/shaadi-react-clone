export default options => {
  const { frequent = [], other = [], frequentLabel = 'Frequently Used', otherLabel = 'Other' } = options;
  const frequentOpts = frequent.list || frequent;
  const otherOpts = other.list || other;
  if (frequentOpts.length && otherOpts.length) {
    return [
      {
        label: frequentLabel,
        options: frequentOpts,
      },
      {
        label: otherLabel,
        options: otherOpts,
      },
    ];
  } else if (frequentOpts.length) {
    return frequentOpts;
  } else if (otherOpts.length) {
    return otherOpts;
  }
  return [];
};
