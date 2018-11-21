import getNativeAppFakeUrl from './getNativeAppFakeUrl';

describe('assertion on getNativeAppFakeUrl functions return', () => {
  it('should return http://native_app_fake_url', () => {
    expect(getNativeAppFakeUrl()).toEqual('http://native_app_fake_url');
  });
});
