import { useState } from 'react';
import { StoryPosition } from '~/graphql/generated/graphql';
import {
  ProjectBoard_StoryFragment,
  useProjectBoard_StoriesQuery,
} from '../ProjectBoard.generated';
import { filterOfPresence } from '~/shared/functions/filterOfPresence';
import { CombinedError } from '@urql/core';

type Result = {
  velocity?: number;
  stories: ProjectBoard_StoryFragment[];
  fetching: boolean;
  error: CombinedError | undefined;
  hasNextBacklog: boolean;
  hasNextIcebox: boolean;
  hasNextDone: boolean;
  fetchMoreBacklog(): void;
  fetchMoreIcebox(): void;
  fetchMoreDone(): void;
};

export function useExtendedProjectBoardQuery(projectId: string): Result {
  const [backlogCursor, setBacklogCursor] = useState<string | undefined>();
  const [doneCursor, setDoneCursor] = useState<string | undefined>();
  const [iceboxCursor, setIceboxCursor] = useState<string | undefined>();
  const [items] = useProjectBoard_StoriesQuery({
    variables: {
      projectId,
      position: StoryPosition.Current,
    },
  });
  const [backlogItems] = useProjectBoard_StoriesQuery({
    variables: {
      projectId,
      position: StoryPosition.Backlog,
      cursor: backlogCursor,
    },
  });
  const [doneItems] = useProjectBoard_StoriesQuery({
    variables: {
      projectId,
      position: StoryPosition.Done,
      cursor: doneCursor,
    },
  });
  const [iceboxItems] = useProjectBoard_StoriesQuery({
    variables: {
      projectId,
      position: StoryPosition.Icebox,
      cursor: iceboxCursor,
    },
  });

  const nodes =
    items.data?.viewer?.project?.stories.edges?.map(edge => edge?.node) ?? [];
  const backlogNodes =
    backlogItems.data?.viewer?.project?.stories.edges?.map(
      edge => edge?.node
    ) ?? [];
  const doneNodes =
    doneItems.data?.viewer?.project?.stories.edges?.map(edge => edge?.node) ??
    [];
  const iceboxNodes =
    iceboxItems.data?.viewer?.project?.stories.edges?.map(edge => edge?.node) ??
    [];
  const stories = filterOfPresence([
    ...nodes,
    ...backlogNodes,
    ...doneNodes,
    ...iceboxNodes,
  ]).filter(it => !it.isDeleted);
  // console.log({
  //   nodes,
  //   backlogNodes,
  //   doneNodes,
  //   iceboxNodes,
  //   stories,
  // });

  const fetching =
    items.fetching ??
    backlogItems.fetching ??
    iceboxItems.fetching ??
    doneItems.fetching;
  const error =
    items.error ?? backlogItems.error ?? iceboxItems.error ?? doneItems.error;

  return {
    fetching,
    error,
    stories,
    hasNextBacklog:
      backlogItems.data?.viewer?.project?.stories.pageInfo?.hasNextPage ??
      false,
    hasNextIcebox:
      iceboxItems.data?.viewer?.project?.stories.pageInfo?.hasNextPage ?? false,
    hasNextDone:
      doneItems.data?.viewer?.project?.stories.pageInfo?.hasNextPage ?? false,
    fetchMoreBacklog() {
      setBacklogCursor(
        backlogItems.data?.viewer?.project?.stories.pageInfo?.endCursor
      );
    },
    fetchMoreIcebox() {
      setIceboxCursor(
        iceboxItems.data?.viewer?.project?.stories.pageInfo?.endCursor
      );
    },
    fetchMoreDone() {
      setBacklogCursor(
        doneItems.data?.viewer?.project?.stories.pageInfo?.endCursor
      );
    },
  };
}

/**
 * PRIVATE
 */
