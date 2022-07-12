import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import type { ConnectionArguments, Connection } from 'graphql-relay';
import { Repository } from 'core-domain';

interface CustomConnection<T> extends Omit<Connection<T>, 'pageInfo'> {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null;
    endCursor?: string | null;
    totalNodesCount: number;
  };
}

const DEFAULT_TAKE = 20;
type SupportedConnectionArguments = Pick<
  ConnectionArguments,
  'after' | 'first'
>;

export async function toConnection<
  T extends Pick<Repository<U, V>, 'findMany'>,
  U,
  V
>(
  repository: T,
  args: SupportedConnectionArguments & { page?: number | null },
  options: V
): Promise<CustomConnection<U>> {
  const take = args.first ?? DEFAULT_TAKE;
  const skip =
    args.page != null
      ? args.page * take
      : args.after
      ? cursorToOffset(args.after)
      : 0;

  // @ts-ignore
  const response = await repository.findMany({ skip, take, ...options });

  const relayConnection = connectionFromArraySlice(response.nodes, args, {
    sliceStart: skip,
    arrayLength: response.totalCount,
  });

  return {
    ...relayConnection,
    pageInfo: {
      ...relayConnection.pageInfo,
      totalNodesCount: response.totalCount,
    },
  };
}
