import getAnyFormatToDateTime from './getAnyFormatToDateTime';

describe('get current full date stamp', () => {
  it(`should return correct date time object as per given format`, () => {
    const sampleDate = '4/2/2012 13:10:16';
    const sampleDateCustomFormat = 'D/M/YYYY HH:mm:ss';
    expect(getAnyFormatToDateTime(sampleDate, sampleDateCustomFormat).toString()).toContain('Sat Feb 04 2012 13:10:16');
  });
  it(`should return correct date time object as per given format`, () => {
    const sampleDate = '03/01/12 13:10:16';
    const sampleDateCustomFormat = 'DD/MM/YY HH:mm:ss';
    expect(getAnyFormatToDateTime(sampleDate, sampleDateCustomFormat).toString()).toContain('Tue Jan 03 2012 13:10:16');
  });
  it(`should return correct date time object as per given format`, () => {
    const sampleDate = '4/3/2012 13:10:16';
    const sampleDateCustomFormat = 'D/M/YYYY HH:mm:ss';
    expect(getAnyFormatToDateTime(sampleDate, sampleDateCustomFormat).toString()).toContain('Sun Mar 04 2012 13:10:16');
  });
  it(`should return correct date time object as per given format`, () => {
    const sampleDate = '4/March/2012 13:10:16';
    const sampleDateCustomFormat = 'D/M/YYYY HH:mm:ss';
    expect(getAnyFormatToDateTime(sampleDate, sampleDateCustomFormat).toString()).toContain('Sun Mar 04 2012 13:10:16');
  });
  it(`should return correct date time object as per given format 20180930153953 (YYYYMMDDHHmmss)`, () => {
    const sampleDate = '20180930153953';
    const sampleDateCustomFormat = 'YYYYMMDDHHmmss';
    expect(getAnyFormatToDateTime(sampleDate, sampleDateCustomFormat).toString()).toContain('Sun Sep 30 2018 15:39:53');
  });
  it(`should return correct date time object as per given format 20190203010101 (YYYYMMDDHHmmss)`, () => {
    const sampleDate = '20190203010101';
    const sampleDateCustomFormat = 'YYYYMMDDHHmmss';
    expect(getAnyFormatToDateTime(sampleDate, sampleDateCustomFormat).toString()).toContain('Sun Feb 03 2019 01:01:01');
  });

  it(`should return correct epoch 1549155661  as per given format 20190203010101 (YYYYMMDDHHmmss)`, () => {
    const sampleDate = '20190203010101';
    const sampleDateCustomFormat = 'YYYYMMDDHHmmss';
    expect(getAnyFormatToDateTime(sampleDate, sampleDateCustomFormat).getEpoch()).toEqual(1549155661);
  });
});
