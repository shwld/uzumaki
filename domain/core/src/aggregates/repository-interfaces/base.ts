import { ID } from '../../shared';
import type { RecordNotFoundError, RuntimeError } from '../../shared/error';
import type { Result } from '../../shared';

export type NodesWrapper<T> = { nodes: T[]; totalCount: number };

export type PaginationArguments = { skip?: number; take?: number };

export interface Repository<T, U = null> {
  find(args: { id: ID }): Result<RecordNotFoundError | RuntimeError, T>;
  findBy(args: { id: ID }): Result<RuntimeError, T | null>;
  findMany(
    args: PaginationArguments & (U extends {} ? U : {})
  ): Result<RuntimeError, NodesWrapper<T>>;
}
