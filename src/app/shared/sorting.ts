// src/app/utils/sorting.ts

export function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

export function naturalSortBy<T>(a: T, b: T, selector: (item: T) => string): number {
  return selector(a).localeCompare(selector(b), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

export function smartSort<T>(
  array: string[] | T[],
  selector?: (item: T) => string
): string[] | T[] {
  const copy = [...array];
  if (typeof copy[0] === 'string') {
    return (copy as string[]).sort(naturalSort);
  } else if (selector) {
    return (copy as T[]).sort((a, b) => naturalSortBy(a, b, selector));
  } else {
    throw new Error('Missing selector function for object array');
  }
}
