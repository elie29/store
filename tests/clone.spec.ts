import { clone } from '../src';

describe('Test clone function', () => {
  it('should return same falsy data', () => {
    for (const item of [null, undefined, false, 0, -0, void 0]) {
      expect(clone(item)).toBe(item);
    }
  });

  it('should return NaN and Infinity', () => {
    for (const item of [NaN, Infinity]) {
      expect(clone(item)).toBe(item);
    }
  });

  it('should shallow clone an object', () => {
    const item = {
      id: 1,
      foo: '0',
      name: 'John',
      date: new Date()
    };

    expect(clone(item)).toEqual(item);
    expect(clone(item)).not.toBe(item);
  });

  it('should shallow clone an object with falsy values', () => {
    const item = {
      id: 0,
      name: undefined,
      date: null
    };

    expect(clone(item)).toEqual(item);
    expect(clone(item)).not.toBe(item);
  });

  it('should shallow clone an object with NaN and Infinity values', () => {
    const item = {
      id: NaN,
      name: Infinity
    };

    expect(clone(item)).toEqual(item);
    expect(clone(item)).not.toBe(item);
  });

  it('should return same function', () => {
    const sum = (a: number, b: number) => a + b;

    expect(clone(sum)).toBe(sum);
    expect(clone(sum)).toEqual(sum);
  });

  it('should return shallow cloned object with function', () => {
    const sum = (a: number, b: number) => a + b;
    const item = {
      sum
    };

    expect(clone(item)).toEqual(item);
    expect(clone(item)).not.toBe(item);
  });

  it('should return empty object instead of regex', () => {
    const rx = /[a-z]/i;
    expect(clone(rx)).toEqual({});
  });

  it('should return shallow cloned object with regex', () => {
    const rx = /[a-z]/i;
    const item = { rx };

    expect(clone(item)).toEqual(item);
    expect(clone(item)).not.toBe(item);
  });

  it('should clone an empty array', () => {
    expect(clone([])).toEqual([]);
    expect(clone([])).not.toBe([]);
  });

  it('should shallow clone an array', () => {
    const item = [
      0,
      -0,
      '0',
      false,
      null,
      NaN,
      undefined,
      Infinity,
      5,
      'me',
      new Date()
    ];
    expect(clone(item)).toEqual(item);
    expect(clone([])).not.toBe(item);
  });
});
