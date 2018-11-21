import getUnixToFormat from './getUnixToFormat';

const epoch = 1537370544;

describe('get current full date stamp', () => {
  const formatValueMappings = [
    { format: 'YYYY', value: '2018' },
    { format: 'Y', value: '2018' },
    { format: 'YY', value: '18' },
    { format: 'MMMM', value: 'September' },
    { format: 'MMM', value: 'Sep' },
    { format: 'MM', value: '09' },
    { format: 'M', value: '9' },
    { format: 'DD', value: '19' },
    { format: 'DDo', value: '19th' },
    { format: 'D', value: '19' },
    { format: 'Do', value: '19th' },
    { format: 'H', value: '15' },
    { format: 'HH', value: '15' },
    { format: 'hh', value: '03' },
    { format: 'h', value: '3' },
    { format: 'm', value: '22' },
    { format: 'mm', value: '22' },
    { format: 'ss', value: '24' },
    { format: 'Do MMMM', value: '19th September' },
    { format: 'hh:mmA', value: '03:22PM' },
    { format: 'h:mmA', value: '3:22PM' },
  ];
  formatValueMappings.map((formatValueMapping, index) =>
    it(`should return current value as per ${formatValueMapping.format} format`, () => {
      expect(getUnixToFormat(epoch, formatValueMapping.format)).toEqual(formatValueMapping.value);
    }),
  );
  it(`should return current value as per DD-MMM-YYYY format`, () => {
    expect(getUnixToFormat(1538302193, 'DD-MMM-YYYY')).toEqual('30-Sep-2018');
  });
  it(`should return current value as per DD-MMM-YYYY format`, () => {
    expect(getUnixToFormat(1538382000, 'h:mmA')).toEqual('8:20AM');
  });
  it(`should return current value as per DD-MMMM-YYYY format`, () => {
    expect(getUnixToFormat(1520236397, 'DD-MMMM-YYYY')).toEqual('05-March-2018');
  });
});
