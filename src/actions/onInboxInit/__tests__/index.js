import { searchParam } from '../utils';

describe('searchParam works correctly in case of webp', () => {
  const filterParam = {
    queryParam: { type: 'connect', action: 'pending', listType: 'connect_pending' },
    queryStr: { page: '1', pg_searchresults_id: 'inbox:c3eb1f88e5f2a91a4ea8c4e07ba72b0f' },
    postParam: {},
  };
  it(`should return true webp flag`, () => {
    const query = searchParam({ ...filterParam, isWebp: true });
    expect(query.params.configs.isWebp).toBe(true);
  });
  it(`should return false webp flag`, () => {
    const query = searchParam({ ...filterParam, isWebp: false });
    expect(query.params.configs.isWebp).toBe(false);
  });
});
