export function not<T>(func: (arg: T) => boolean): (item: T) => boolean {
  return item => !func(item);
}
