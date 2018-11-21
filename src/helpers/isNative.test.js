import isNative from './isNative';

describe('is native check', () => {
  it(`when no query string`, () => {
    expect(isNative()).toBeFalsy();
  });
  it(`when query string present without nexturl or os param`, () => {
    expect(isNative('?some url')).toBeFalsy();
  });
  it(`when query string present with nexturl as fake_url`, () => {
    expect(isNative('?nexturl=fake_url')).toBeTruthy();
  });
  it(`when query string present with os param having android in it`, () => {
    expect(isNative('?os=native-android')).toBeTruthy();
  });
  it(`when query string present with os param without native string in it`, () => {
    expect(isNative('?os=somethingelse-android')).toBeFalsy();
  });
});
