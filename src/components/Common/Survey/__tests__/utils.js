import { unique } from '../utils';

const props = [
  {
    id: '1',
    answer: ['20', '21'],
  },
  {
    id: '3',
    answer: 3,
  },
  {
    id: '2',
    answer: 'test',
  },
  {
    id: '2',
    answer: 'test',
  },
  {
    id: '2',
    answer: 'test',
  },
];

describe('Test unique Function', () => {
  const returnArray = unique(props);
  it('should return unique values', () => {
    expect(returnArray).toEqual([{ answer: ['20', '21'], id: '1' }, { answer: 3, id: '3' }, { answer: 'test', id: '2' }]);
  });
});
