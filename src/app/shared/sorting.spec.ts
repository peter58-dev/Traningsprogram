import { smartSort } from './sorting';

describe('smartSort', () => {
  it('should sort a string array naturally and case-insensitively', () => {
    const input = ['Test 12', 'test 1', 'test 4', 'Alpha 2', 'Alpha 10'];
    const expected = ['Alpha 2', 'Alpha 10', 'test 1', 'test 4', 'Test 12'];

    const result = smartSort(input);

    expect(result).toEqual(expected);
  });

  it('should sort an object array by string field using selector', () => {
    const input = [
      { id: 1, name: 'Test 12' },
      { id: 2, name: 'Test 1' },
      { id: 3, name: 'Test 4' },
      { id: 4, name: 'Alpha 10' },
      { id: 5, name: 'Alpha 2' },
    ];

    const expected = [
      { id: 5, name: 'Alpha 2' },
      { id: 4, name: 'Alpha 10' },
      { id: 2, name: 'Test 1' },
      { id: 3, name: 'Test 4' },
      { id: 1, name: 'Test 12' },
    ];

    const result = smartSort(input, (item) => item.name);

    expect(result).toEqual(expected);
  });

  it('should throw an error if used on object array without selector', () => {
    const input = [
      { id: 1, name: 'Test 12' },
      { id: 2, name: 'Test 1' },
    ];

    expect(() => smartSort(input as any)).toThrowError(
      'Missing selector function for object array'
    );
  });
});
