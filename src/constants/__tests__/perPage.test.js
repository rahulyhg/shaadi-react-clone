import perPage from '../perPage';

describe('perPage', () => {
  it('returns the 20 items per page given context for non-mobile device', () => {
    const numPages = perPage('/search/partner');

    expect(numPages).toBe(20);
  });

  it('returns the 10 items per page given context for non-mobile device', () => {
    const numPages = perPage('/search/partner', {
      isMobile: () => true,
    });

    expect(numPages).toBe(20);
  });
});
