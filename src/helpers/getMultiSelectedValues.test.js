import getMultiSelectedValues from './getMultiSelectedValues';

describe('get multi selected values', () => {
  it('should return string with single value as test when value selected is test and existing values is empty', () => {
    expect(getMultiSelectedValues('', 'test')).toEqual('test');
  });
  it('should return empty string when value selected is test and existing values was one single value as test', () => {
    expect(getMultiSelectedValues('test', 'test')).toEqual('');
  });
  it('should return string with single value as test when value selected is test and existing values is empty', () => {
    expect(getMultiSelectedValues('', 'test')).toEqual('test');
  });
  it('should return string with single value as test when value selected is test and existing values is empty', () => {
    expect(getMultiSelectedValues('test', 'test2')).toEqual('test,test2');
  });
});
