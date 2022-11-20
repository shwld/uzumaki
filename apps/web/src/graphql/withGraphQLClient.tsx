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
  ProjectBoard_StoriesQuery,
  ProjectBoard_StoriesQueryVariables,
  ProjectCreateButton_CreateProjectMutation,
  StoryCreateForm_CreateStoryMutation,
} from './generated/graphql';
import { AccountListDocument } from '~/features/account/AccountList/AccountList.generated';
import { ProjectBoard_StoriesDocument } from '~/features/project/ProjectBoard/ProjectBoard.generated';
import { createSSEClient } from '~/shared/functions/createSSEClient';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { Exchange } from 'urql';

const API_HOST = `${
  typeof window === 'undefined' ? '' : process.env.NEXT_PUBLIC_ORIGIN!
}`;

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
        cache.updateQuery<
          ProjectBoard_StoriesQuery,
          ProjectBoard_StoriesQueryVariables
        >(
          {
            query: ProjectBoard_StoriesDocument,
            variables: { projectId: node.projectId, position: node.position },
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
        },
      },
      exchanges: [
        subscriptionExchange({
          forwardSubscription: operation => ({
            subscribe: sink => {
              const { query, variables } = operation;
              const url = `${API_HOST}/api/graphql/stream?query=${query}&variables=${JSON.stringify(
                variables
              )}`;
              const sseClient = createSSEClient(url, sink.next);
              return {
                unsubscribe: sseClient.dispose,
              };
            },
          }),
        }),
        dedupExchange,
        cache,
        // fetchExchange,
        // FIXME: type error
        multipartFetchExchange as Exchange,
      ],
    };
  }, options)(c);
