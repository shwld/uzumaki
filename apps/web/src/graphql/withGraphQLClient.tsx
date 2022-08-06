import { withUrqlClient, WithUrqlClientOptions } from 'next-urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { relayPagination } from '@urql/exchange-graphcache/extras';
import { dedupExchange, fetchExchange, subscriptionExchange } from '@urql/core';
import { NextPage } from 'next';
import App from 'next/app';
import {
  AccountCreateButton_CreateAccountMutation,
  AccountListQuery,
  AccountListQueryVariables,
  ProjectBoard_MoveStoriesMutation,
  ProjectBoard_MoveStoriesMutationVariables,
  ProjectBoardQuery,
  ProjectBoardQueryVariables,
  ProjectCreateButton_CreateProjectMutation,
  StoryCreateForm_CreateStoryMutation,
} from './generated/graphql';
import { AccountListDocument } from '~/features/account/AccountList/AccountList.generated';
import { ProjectBoardDocument } from '~/features/project/ProjectBoard/ProjectBoard.generated';
import { createClient as createWSClient } from 'graphql-sse';

const API_HOST = `${
  typeof window === 'undefined' ? '' : 'http://localhost:5000'
}`;
const sseClient = createWSClient({
  url: `${API_HOST}/api/graphql/stream`,
});

const cache = cacheExchange({
  resolvers: {
    Viewer: {
      accounts: relayPagination(),
    },
    Project: {
      stories: relayPagination(),
    },
  },
  updates: {
    Mutation: {
      createAccount(
        result: AccountCreateButton_CreateAccountMutation,
        _args,
        cache,
        _info
      ) {
        if (result.createAccount.__typename !== 'CreateAccountSuccessResult')
          return;
        const node = result.createAccount.result;
        cache.updateQuery<AccountListQuery, AccountListQueryVariables>(
          { query: AccountListDocument, variables: { cursor: '' } },
          data => {
            data?.viewer?.accounts.edges?.unshift({
              node,
              cursor: '',
              __typename: 'AccountEdge',
            });
            return data;
          }
        );
      },
      createProject(
        result: ProjectCreateButton_CreateProjectMutation,
        _args,
        cache,
        _info
      ) {
        if (result.createProject.__typename !== 'CreateProjectSuccessResult')
          return;
        const node = result.createProject.result;
        cache.updateQuery<AccountListQuery, AccountListQueryVariables>(
          { query: AccountListDocument, variables: { cursor: '' } },
          data => {
            data?.viewer?.accounts.edges?.forEach(edge => {
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
        result: StoryCreateForm_CreateStoryMutation,
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
          data => {
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
      variables: ProjectBoard_MoveStoriesMutationVariables,
      _cache,
      _info
    ): ProjectBoard_MoveStoriesMutation['moveStories'] {
      return {
        __typename: 'MoveStoriesSuccessResult',
        result: variables.input.stories.map(story => ({
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
      url: `${API_HOST}/api/graphql`,
      suspense: true,
      fetchOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': '*',
        },
      },
      exchanges: [
        subscriptionExchange({
          forwardSubscription: operation => ({
            subscribe: sink => {
              const { query, variables, ...request } = operation;
              const eventSource = new EventSource(
                `${API_HOST}/api/graphql/stream?query=${query}`
                // {
                //   headers: {
                //     'Accept-Encoding': '*',
                //   },
                // }
              );
              const handler = (data: any) => {
                console.log(data);
              };
              eventSource.addEventListener('message', handler);
              console.log({ operation, sseClient });
              // const dispose = sseClient.subscribe(
              //   { ...request, query, variables },
              //   sink
              // );
              const dispose = () =>
                eventSource.removeEventListener('message', handler);
              return {
                unsubscribe: dispose,
              };
            },
          }),
        }),
        dedupExchange,
        cache,
        fetchExchange,
      ],
    };
  }, options)(c);
