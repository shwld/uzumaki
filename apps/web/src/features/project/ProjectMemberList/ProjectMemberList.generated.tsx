import * as Types from "../../../graphql/generated/graphql";

import gql from "graphql-tag";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProjectMemberList_ProjectMemberFragment = {
  __typename?: "ProjectMember";
  id: string;
  role: Types.ProjectMemberRole;
  name: string;
  avatarImageUrl: string;
};

export type ProjectMemberListQueryVariables = Types.Exact<{
  projectId: Types.Scalars["ID"];
}>;

export type ProjectMemberListQuery = {
  __typename?: "Query";
  viewer?:
    | {
        __typename?: "Viewer";
        project?:
          | {
              __typename?: "Project";
              members: {
                __typename?: "ProjectMemberConnection";
                edges?:
                  | Array<
                      | {
                          __typename?: "ProjectMemberEdge";
                          cursor?: string | undefined;
                          node?:
                            | {
                                __typename?: "ProjectMember";
                                id: string;
                                role: Types.ProjectMemberRole;
                                name: string;
                                avatarImageUrl: string;
                              }
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
            }
          | undefined;
      }
    | undefined;
};

export const ProjectMemberList_ProjectMemberFragmentDoc = gql`
  fragment ProjectMemberList_ProjectMember on ProjectMember {
    id
    role
    name
    avatarImageUrl
  }
`;
export const ProjectMemberListDocument = gql`
  query ProjectMemberList($projectId: ID!) {
    viewer {
      project(id: $projectId) {
        members {
          edges {
            node {
              ...ProjectMemberList_ProjectMember
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  }
  ${ProjectMemberList_ProjectMemberFragmentDoc}
`;

export function useProjectMemberListQuery(
  options: Omit<Urql.UseQueryArgs<ProjectMemberListQueryVariables>, "query">
) {
  return Urql.useQuery<ProjectMemberListQuery>({
    query: ProjectMemberListDocument,
    ...options,
  });
}
