import { strnorm } from '../utils';

describe('strnorm util', () => {
  it('should be a function', () => {
    expect(typeof strnorm).toBe('function');
  });
  it("inpout str = 'undefined',output should be null", () => {
    expect(strnorm('undefined')).toBe(null);
  });
  it("inpout str = 'null',output should be null", () => {
    expect(strnorm('null')).toBe(null);
  });
  it("inpout str = '',output should be null", () => {
    expect(strnorm('null')).toBe(null);
  });
  it("inpout str = 'test',output should be actual string", () => {
    expect(strnorm('test')).toBe('test');
  });
});
