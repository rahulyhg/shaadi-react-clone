import getMultiSelectedValuArr from './getMultiSelectedValuArr';

export default (values, value, separator = ',') => {
  const valueArr = values && values.split(separator);
  const valuesStr = getMultiSelectedValuArr(valueArr, value).join(separator);
  return valuesStr;
};
