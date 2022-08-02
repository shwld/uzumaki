import { useState } from 'react';
import {
  Project,
  ProjectStoriesSearchPosition,
} from '~/graphql/generated/graphql';
import {
  ProjectBoard_StoryFragment,
  useProjectBoardQuery,
} from '../ProjectBoard.generated';
import { filterOfPresence } from '~/shared/functions/filterOfPresence';
import { CombinedError } from '@urql/core';

type Result = {
  project?: Pick<Project, 'id' | 'currentVelocity'>;
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
  const [items] = useProjectBoardQuery({
    variables: {
      projectId,
    },
  });
  const [backlogItems] = useProjectBoardQuery({
    variables: {
      projectId,
      position: ProjectStoriesSearchPosition.Backlog,
      cursor: backlogCursor,
    },
  });
  const [doneItems] = useProjectBoardQuery({
    variables: {
      projectId,
      position: ProjectStoriesSearchPosition.Done,
      cursor: doneCursor,
    },
  });
  const [iceboxItems] = useProjectBoardQuery({
    variables: {
      projectId,
      position: ProjectStoriesSearchPosition.Icebox,
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

  const project = backlogItems.data?.viewer?.project;
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
    project,
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
