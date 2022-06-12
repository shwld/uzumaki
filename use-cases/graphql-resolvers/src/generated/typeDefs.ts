
  import gql from 'graphql-tag';
  export const typeDefs = gql`schema{query:Query mutation:Mutation}interface Connection{edges:[Edge]pageInfo:PageInfo}input CreateTodoInput{id:ID!title:String!}scalar DateTime interface Edge{cursor:String node:Node}type InvalidArgumentsResult{issues:[ValidationIssue!]!}type Mutation{createTodo(input:CreateTodoInput!):TodoMutationResult!}interface Node{id:ID!}type PageInfo{endCursor:String hasNextPage:Boolean!hasPreviousPage:Boolean startCursor:String}interface PagedConnection{nodes:[Node]pageInfo:PagedPageInfo}type PagedPageInfo{hasNextPage:Boolean!hasPreviousPage:Boolean totalPagesCount:Int}type Query{node(id:ID!):Node viewer:Viewer}type Todo implements Node{createdAt:DateTime!id:ID!title:String!updatedAt:DateTime!}type TodoConnection implements Connection{edges:[TodoEdge]pageInfo:PageInfo}type TodoEdge implements Edge{cursor:String node:Todo}union TodoMutationResult=InvalidArgumentsResult|TodoSuccessResult|UnauthenticatedResult type TodoSuccessResult{result:Todo!}type UnauthenticatedResult{errorMessage:String!}type User{id:ID!name:String!}type ValidationIssue{field:String message:String}type Viewer{createdAt:DateTime!email:String!id:ID!picture:String!todos(after:String first:Int page:Int):TodoConnection!updatedAt:DateTime!}`;
