// filterでnullとundefinedを排除した際に型にもそれを反映する
type Unwrap<T> = T extends { [K in keyof T]: infer U } ? U : never;
type NullOrUndefined = null | undefined;

export function filterOfPresence<T extends any[]>(
  array: T
): Array<Exclude<Unwrap<T>, NullOrUndefined>> {
  return array.filter((item) => !!item);
}
