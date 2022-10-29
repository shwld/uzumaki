import { RepositoryRuntimeError } from '../../lib/error';
import { Result } from '../../lib/result';

export type NodesWrapper<T> = { nodes: T[]; totalCount: number };

export type PaginationArguments = { skip?: number; take?: number };

export interface Repository<T, U = null> {
  findBy(
    args: { id: string } & (U extends {} ? U : {})
  ): Result<RepositoryRuntimeError, T | null>;
  findMany(
    args: PaginationArguments & (U extends {} ? U : {})
  ): Result<RepositoryRuntimeError, NodesWrapper<T>>;
}
