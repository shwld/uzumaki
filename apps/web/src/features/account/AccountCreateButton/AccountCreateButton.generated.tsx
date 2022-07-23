import * as Types from "../../../graphql/generated/graphql";

import gql from "graphql-tag";
import { AccountList_ResultFragmentDoc } from "../AccountList/AccountList.generated";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AccountCreateButton_CreateAccountMutationVariables = Types.Exact<{
  input: Types.CreateAccountInput;
}>;

export type AccountCreateButton_CreateAccountMutation = {
  __typename?: "Mutation";
  createAccount:
    | {
        __typename?: "CreateAccountSuccessResult";
        result: {
          __typename?: "Account";
          id: string;
          name: string;
          projects: {
            __typename?: "ProjectConnection";
            edges?:
              | Array<
                  | {
                      __typename?: "ProjectEdge";
                      cursor?: string | undefined;
                      node?:
                        | { __typename?: "Project"; id: string; name: string }
                        | undefined;
                    }
                  | undefined
                >
              | undefined;
            pageInfo?:
              | {
                  __typename?: "PageInfo";
                  hasNextPage: boolean;
                  endCursor?: string | undefined;
                }
              | undefined;
          };
        };
      }
    | { __typename?: "InvalidArgumentsResult" }
    | { __typename?: "UnauthorizedResult" };
};

export const AccountCreateButton_CreateAccountDocument = gql`
  mutation AccountCreateButton_CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ... on CreateAccountSuccessResult {
        result {
          ...AccountList_Result
        }
      }
    }
  }
  ${AccountList_ResultFragmentDoc}
`;

export function useAccountCreateButton_CreateAccountMutation() {
  return Urql.useMutation<
    AccountCreateButton_CreateAccountMutation,
    AccountCreateButton_CreateAccountMutationVariables
  >(AccountCreateButton_CreateAccountDocument);
}
