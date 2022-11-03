import { ID } from '../../shared';
import type {
  RecordNotFoundError,
  RepositoryRuntimeError,
} from '../../shared/error';
import type { Result } from '../../shared/result';

export type NodesWrapper<T> = { nodes: T[]; totalCount: number };

export type PaginationArguments = { skip?: number; take?: number };

export interface Repository<T, U = null> {
  find(args: {
    id: ID;
  }): Result<RecordNotFoundError | RepositoryRuntimeError, T>;
  findBy(args: { id: ID }): Result<RepositoryRuntimeError, T | null>;
  findMany(
    args: PaginationArguments & (U extends {} ? U : {})
  ): Result<RepositoryRuntimeError, NodesWrapper<T>>;
}
