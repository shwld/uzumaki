
  import gql from 'graphql-tag';
  export const typeDefs = gql`schema{query:Query mutation:Mutation}scalar DateTime type Mutation{createTodo(input:TodoInput!):TodoMutationResult!}type Query{sample:String}type RecordInvalidResult{validationErrors:[ValidationError!]!}type Todo{createdAt:DateTime!id:String!title:String!updatedAt:DateTime!}input TodoInput{id:String!title:String!}union TodoMutationResult=RecordInvalidResult|TodoSucessResult|UserErrorResult type TodoSucessResult{result:Todo!}type UserErrorResult{errorMessage:String!}type ValidationError{field:String message:String}`;
