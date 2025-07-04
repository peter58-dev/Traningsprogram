export function naturalSortBy<T>(a: T, b: T, selector: (item: T) => string): number {
  return selector(a).localeCompare(selector(b), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}
