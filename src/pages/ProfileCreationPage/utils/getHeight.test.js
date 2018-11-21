import getHeight from './getHeight';

describe('height in inches to feet inches with cms', () => {
  it('should return 56 inches as 4ft 8in - 142cm', () => {
    expect(getHeight(56)).toEqual('4ft 8in - 142cm');
  });
});

describe('height in inches to feet inches with cms', () => {
  it('should return 84 inches as 7ft - 213cm', () => {
    expect(getHeight(84)).toEqual('7ft - 213cm');
  });
});
