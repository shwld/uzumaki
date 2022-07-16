import { withUrqlClient, WithUrqlClientOptions } from 'next-urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { relayPagination } from '@urql/exchange-graphcache/extras';
import { dedupExchange, fetchExchange } from '@urql/core';
import { NextPage } from 'next';
import App from 'next/app';
import {
  AccountCreateButtonMutation,
  AccountListQuery,
  AccountListQueryVariables,
  ProjectBoardMoveStoriesMutation,
  ProjectBoardMoveStoriesMutationVariables,
  ProjectBoardQuery,
  ProjectBoardQueryVariables,
  ProjectCreateButtonMutation,
  StoryCreateFormCreateStoryMutation,
} from './generated/graphql';
import { AccountListDocument } from '~/features/account/AccountList/AccountList.generated';
import { ProjectBoardDocument } from '~/features/project/ProjectBoard/ProjectBoard.generated';

const cache = cacheExchange({
  resolvers: {
    Viewer: {
      accounts: relayPagination(),
    },
  },
  updates: {
    Mutation: {
      createAccount(result: AccountCreateButtonMutation, _args, cache, _info) {
        if (result.createAccount.__typename !== 'CreateAccountSuccessResult')
          return;
        const node = result.createAccount.result;
        cache.updateQuery<AccountListQuery, AccountListQueryVariables>(
          { query: AccountListDocument, variables: { cursor: '' } },
          (data) => {
            data?.viewer?.accounts.edges?.unshift({
              node,
              cursor: '',
              __typename: 'AccountEdge',
            });
            return data;
          }
        );
      },
      createProject(result: ProjectCreateButtonMutation, _args, cache, _info) {
        if (result.createProject.__typename !== 'CreateProjectSuccessResult')
          return;
        const node = result.createProject.result;
        cache.updateQuery<AccountListQuery, AccountListQueryVariables>(
          { query: AccountListDocument, variables: { cursor: '' } },
          (data) => {
            data?.viewer?.accounts.edges?.forEach((edge) => {
              if (edge?.node != null && edge.node.id === node.accountId) {
                edge.node.projects.edges?.unshift({
                  node,
                  cursor: '',
                  __typename: 'ProjectEdge',
                });
              }
            });
            return data;
          }
        );
      },
      createStory(
        result: StoryCreateFormCreateStoryMutation,
        _args,
        cache,
        _info
      ) {
        if (result.createStory.__typename !== 'CreateStorySuccessResult')
          return;
        const node = result.createStory.result;
        cache.updateQuery<ProjectBoardQuery, ProjectBoardQueryVariables>(
          {
            query: ProjectBoardDocument,
            variables: { projectId: node.projectId },
          },
          (data) => {
            data?.viewer?.project?.stories.edges?.unshift({
              node,
              cursor: '',
              __typename: 'StoryEdge',
            });
            return data;
          }
        );
      },
    },
  },
  optimistic: {
    moveStories(
      variables: ProjectBoardMoveStoriesMutationVariables,
      _cache,
      _info
    ): ProjectBoardMoveStoriesMutation['moveStories'] {
      return {
        __typename: 'MoveStoriesSuccessResult',
        result: variables.input.stories.map((story) => ({
          __typename: 'Story',
          id: story.id,
          position: story.position,
          priority: story.priority,
        })),
      };
    },
  },
});

export const withGraphQLClient = <C extends NextPage<any, any> | typeof App>(
  c: C,
  options: WithUrqlClientOptions = { ssr: false }
) =>
  withUrqlClient((_ssrExchange, _ctx) => {
    return {
      url: `${
        typeof window === 'undefined' ? '' : 'http://localhost:3000'
      }/api/graphql`,
      suspense: true,
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
      exchanges: [dedupExchange, cache, fetchExchange],
    };
  }, options)(c);
