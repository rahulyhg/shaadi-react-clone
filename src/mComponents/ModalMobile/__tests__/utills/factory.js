import { getFilter } from './config';

const factory = {
  props: {
    type: 'connect_pending',
    facetBar: [
      {
        id: 'custom',
        isMulti: true,
        options: getFilter('connect_pending'),
      },
    ],
  },

  filters: getFilter('connect_pending'),
};

it('should export filters props', () => {
  expect(Object.keys(factory).length).toEqual(2);
});
export default factory;
