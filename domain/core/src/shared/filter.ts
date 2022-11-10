export { filter } from 'fp-ts/lib/Array';

// filterでnullとundefinedを排除した際に型にもそれを反映する
type Unwrap<T> = T extends { [K in keyof T]: infer U } ? U : never;
type NullOrUndefined = null | undefined;

export function filterOfPresence<T extends any[]>(
  array: T
): ReadonlyArray<Exclude<Unwrap<T>, NullOrUndefined>> {
  return array.filter(item => !!item);
}

export function compact<T extends { [k: string]: unknown }>(obj: T): T {
  const result = Object.keys(obj).reduce((prev, key) => {
    if (prev[key] === undefined) {
      delete prev[key];
    }
    return prev;
  }, obj);

  return result;
}
