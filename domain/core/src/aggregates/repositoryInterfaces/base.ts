export type NodesWrapper<T> = { nodes: T[]; totalCount: number };

export type PaginationArguments = { skip?: number; take?: number };

export type RepositoryErrorMessage = string;

export interface Repository<T, U = null> {
  findBy(args: { id: string } & (U extends {} ? U : {})): Promise<T | null>;
  findMany(
    args: PaginationArguments & (U extends {} ? U : {})
  ): Promise<NodesWrapper<T>>;
}
