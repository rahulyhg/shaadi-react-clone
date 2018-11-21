import getSecondsDiffCalendar from './getSecondsDiffCalendar';

describe('get current full date stamp', () => {
  const formats = {
    sameDay: 'h:mmA',
    lastDay: '[Yesterday]',
    lastWeek: '[a week ago]',
    sameElse: 'DD/MM/YYYY',
    nextDay: '[Tomorrow]',
    nextWeek: '[after a week]',
  };
  const formatValueMappings = [
    {
      // sameDay
      epoch: 1538382000,
      mockDate: '2018-10-01 13:50:00',
      value: '8:20AM',
    },
    {
      epoch: 1538245800,
      mockDate: '2018-30-09 15:22:24',
      value: 'Yesterday',
    },
    {
      epoch: 1538438400,
      mockDate: '2018-10-02 00:00:00',
      value: 'Tomorrow',
    },
    {
      epoch: 1538956800,
      mockDate: '2018-10-08 00:00:00',
      value: 'after a week',
    },
    {
      epoch: 1537660800,
      mockDate: '2018-09-23 00:00:00',
      value: 'a week ago',
    },
    {
      epoch: 1536710400,
      mockDate: '2018-09-12 00:00:00',
      value: '12/09/2018',
    },
  ];
  let dateNowSpy;

  beforeAll(() => {
    // Lock Time
    // referenceDate: '2018-10-01 00:00:00',
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1538332200000);
  });

  afterAll(() => {
    // Unlock Time
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  formatValueMappings.map((formatValueMapping, index) =>
    it(`should return seconds diff as per calendar for ${formatValueMapping.mockDate} vs 2018-10-01 00:00:00`, () => {
      expect(getSecondsDiffCalendar(formatValueMapping.epoch, formats)).toEqual(formatValueMapping.value);
    }),
  );
});
