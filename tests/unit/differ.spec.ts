import { diffAny, ERROR_KEYS_OF_TARGETS_DIFFERENT } from '@/utils/differ';

describe('differ', () => {
  it('diffAny: same array', () => {
    const beforeChange = ['a', true, 100];
    const afterChange = ['a', true, 100];
    const results = diffAny(beforeChange, afterChange, 'array');
    expect(results).toMatchObject([]);
  });
  it('diffAny: different length array', () => {
    const beforeChange = ['a', true, 100];
    const afterChange = ['a', true, 100, 'b'];
    const results = diffAny(beforeChange, afterChange, 'array');
    expect(results).toMatchObject([{ key: 'array', before: beforeChange, after: afterChange }]);
  });
  it('diffAny: same length array but different value', () => {
    const beforeChange = ['b', false, 101];
    const afterChange = ['a', true, 100];
    const results = diffAny(beforeChange, afterChange, 'array');
    expect(results).toMatchObject([{ key: 'array', before: beforeChange, after: afterChange }]);
  });
  it('diffAny: same object', () => {
    const beforeChange = { a: 'string', b: 100, c: true };
    const afterChange = { a: 'string', b: 100, c: true };
    const results = diffAny(beforeChange, afterChange, 'object');
    expect(results).toMatchObject([]);
  });
  it('diffAny: different values object', () => {
    const beforeChange = { a: 'string', b: 100, c: true };
    const afterChange = { a: 'stringstring', b: 100100, c: false };
    const results = diffAny(beforeChange, afterChange, 'object');
    expect(results).toMatchObject([
      { key: 'object.a', before: 'string', after: 'stringstring' },
      { key: 'object.b', before: 100, after: 100100 },
      { key: 'object.c', before: true, after: false },
    ]);
  });
  it('diffAny: both are undefined', () => {
    const beforeChange = undefined;
    const afterChange = undefined;
    const results = diffAny(beforeChange, afterChange, 'object');
    expect(results).toMatchObject([]);
  });
  it('diffAny: one of both is undefined', () => {
    const beforeChange = 'string';
    const afterChange = undefined;
    const results = diffAny(beforeChange, afterChange, 'undefined');
    expect(results).toMatchObject([{ key: 'undefined', before: beforeChange, after: afterChange }]);
  });
  it('diffAny: throw error, keys of targets are different', () => {
    const beforeChange: { id: string; ip?: string[]; env?: string } = {
      id: '1',
      ip: [],
    };
    const afterChange: { id: string; ip?: string[]; env?: string } = {
      id: '1',
      env: '',
    };
    expect(diffAny.bind(undefined, beforeChange, afterChange)).toThrowError(
      ERROR_KEYS_OF_TARGETS_DIFFERENT,
    );
  });
});
