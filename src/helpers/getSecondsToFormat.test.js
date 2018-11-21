import getSecondsToFormat from './getSecondsToFormat';
// refer https://www.tools4noobs.com/online_tools/seconds_to_hh_mm_ss/ to check seconds conversion
describe('get 36834098 seconds in year month day hour minute seconds', () => {
  const absoluteSeconds = 36834098;
  const secondsConverted = getSecondsToFormat(absoluteSeconds);
  it('should return correct year: 1', () => {
    expect(secondsConverted.years).toEqual(1);
  });
  it('should return correct months: 2', () => {
    expect(secondsConverted.months).toEqual(2);
  });
  it('should return correct days: 1', () => {
    expect(secondsConverted.days).toEqual(1);
  });
  it('should return correct hours: 7', () => {
    expect(secondsConverted.hours).toEqual(7);
  });
  it('should return correct minutes: 41', () => {
    expect(secondsConverted.minutes).toEqual(41);
  });
  it('should return correct seconds: 38', () => {
    expect(secondsConverted.seconds).toEqual(38);
  });
});

describe('get 145009 seconds in year month day hour minute seconds', () => {
  const absoluteSeconds = 145009;
  const secondsConverted = getSecondsToFormat(absoluteSeconds);
  it('should return correct year: 0', () => {
    expect(secondsConverted.years).toEqual(0);
  });
  it('should return correct months: 0', () => {
    expect(secondsConverted.months).toEqual(0);
  });
  it('should return correct days: 1', () => {
    expect(secondsConverted.days).toEqual(1);
  });
  it('should return correct hours: 16', () => {
    expect(secondsConverted.hours).toEqual(16);
  });
  it('should return correct minutes: 16', () => {
    expect(secondsConverted.minutes).toEqual(16);
  });
  it('should return correct seconds: 49', () => {
    expect(secondsConverted.seconds).toEqual(49);
  });
});

describe('get 384811 seconds in year month day hour minute seconds', () => {
  const absoluteSeconds = 384811;
  const secondsConverted = getSecondsToFormat(absoluteSeconds);
  it('should return correct year: 0', () => {
    expect(secondsConverted.years).toEqual(0);
  });
  it('should return correct months: 0', () => {
    expect(secondsConverted.months).toEqual(0);
  });
  it('should return correct days: 4', () => {
    expect(secondsConverted.days).toEqual(4);
  });
  it('should return correct hours: 10', () => {
    expect(secondsConverted.hours).toEqual(10);
  });
  it('should return correct minutes: 53', () => {
    expect(secondsConverted.minutes).toEqual(53);
  });
  it('should return correct seconds: 31', () => {
    expect(secondsConverted.seconds).toEqual(31);
  });
});
