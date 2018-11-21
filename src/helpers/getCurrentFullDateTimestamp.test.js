import getCurrentFullDateTimestamp from './getCurrentFullDateTimestamp';

describe('get current full date stamp', () => {
  const RealDate = Date;

  function mockDate(isoDate) {
    global.Date = class extends RealDate {
      constructor() {
        super();
        return new RealDate(isoDate);
      }
    };
  }

  afterEach(() => {
    global.Date = RealDate;
  });

  it('should return current value', () => {
    mockDate('2018-12-12 20:33:15');
    expect(getCurrentFullDateTimestamp()).toEqual('20181212203315');
  });
});
