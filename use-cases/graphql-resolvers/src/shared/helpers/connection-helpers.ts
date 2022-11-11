import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import type { ConnectionArguments, Connection } from 'graphql-relay';
import type { Repository } from 'core-domain';
import { getOrThrow } from 'core-domain/lib';

interface CustomConnection<T> extends Omit<Connection<T>, 'pageInfo'> {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
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
  const result = repository.findMany({ skip, take, ...options });
  const response = await getOrThrow(result);

  const relayConnection = connectionFromArraySlice(response.nodes, args, {
    sliceStart: skip,
    arrayLength: response.totalCount,
  });

  return {
    ...relayConnection,
    pageInfo: {
      ...relayConnection.pageInfo,

      // convert null to undefined
      hasNextPage: relayConnection.pageInfo.hasNextPage ?? undefined,
      hasPreviousPage: relayConnection.pageInfo.hasPreviousPage ?? undefined,
      startCursor: relayConnection.pageInfo.startCursor ?? undefined,
      endCursor: relayConnection.pageInfo.endCursor ?? undefined,
      totalNodesCount: response.totalCount,
    },
  };
}
