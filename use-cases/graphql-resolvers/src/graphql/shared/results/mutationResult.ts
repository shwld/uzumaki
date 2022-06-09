import {
  RecordInvalidResult,
  UserErrorResult,
} from '../../generated/resolversTypes';

export function mutationResult<T>(result: T): { result: T } {
  return { result };
}
