const bigListExample = {
  type: 'profile',
  status: 'shortlisted',
  shortlists: {
    ready: true,
    count: 0,
    selected: [],
  },
  items: [
    { key: 'a', id: 'a', label: 'one' },
    { key: 'b', id: 'b', label: 'two' },
    { key: 'c', id: 'c', label: 'three' },
    { key: 'd', id: 'd', label: 'four' },
    { key: 'e', id: 'e', label: 'five' },
    { key: 'f', id: 'f', label: 'six' },
    { key: 'g', id: 'g', label: 'seven' },
    { key: 'h', id: 'h', label: 'eight' },
    { key: 'i', id: 'i', label: 'nine' },
    { key: 'j', id: 'j', label: 'ten' },
  ],
  isUpdateDropdown: false,
  isDropdownVisible: true,
};

const factory = { bigListExample };

it('should export factory', () => {
  expect(factory.bigListExample).not.toBeFalsy();
});
export default factory;
