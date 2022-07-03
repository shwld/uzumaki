export type NodesWrapper<T> = { nodes: T[]; totalCount: number };

export interface Repository<T, U> {
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  destroy(item: T): Promise<T>;
  findBy(
    args: { id: string } & (U extends {} ? U : {})
  ): Promise<T | undefined>;
  findMany(
    args: { skip?: number; take?: number } & (U extends {} ? U : {})
  ): Promise<NodesWrapper<T>>;
}
