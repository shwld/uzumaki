export type NodesWrapper<T> = { nodes: T[]; totalCount: number };

export interface Repository<T, U> {
  save(item: T): Promise<T>;
  findBy(
    args: { id: string } & (U extends {} ? U : {})
  ): Promise<T | undefined>;
  findMany(
    args: { skip?: number; take?: number } & (U extends {} ? U : {})
  ): Promise<NodesWrapper<T>>;
}
