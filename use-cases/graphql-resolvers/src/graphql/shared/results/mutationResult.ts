export type MutationResult<T> = { result: T };

export function mutationResult<T>(result: T): MutationResult<T> {
  return { result };
}
