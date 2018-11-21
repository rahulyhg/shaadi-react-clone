import meta from './meta';
import pagination from './pagination';
import results from './results';
import facetBar from './facetBar';

const factory = {
  meta,
  pagination,
  results,
  facetBar,
};

it('should export theDefaultState, payloadProps', () => {
  expect(Object.keys(factory).length).toEqual(4);
});

export default factory;
