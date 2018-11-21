export default (values, value) => {
  const valueArr = values || [];
  if (!valueArr.includes(value)) {
    valueArr.push(value);
  } else {
    valueArr.splice(valueArr.indexOf(value), 1);
  }
  return valueArr;
};
