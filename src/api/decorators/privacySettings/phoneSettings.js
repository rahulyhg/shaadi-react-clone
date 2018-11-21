const baseValue = {
  id: '',
  text: '',
  tooltip: '',
};

export default (base = baseValue, list = {}) => {
  // console.log(1118888,list);
  const { id, text, tooltip } = list;
  return {
    ...base,
    id,
    text,
    tooltip: tooltip || base.tooltip,
  };
};
