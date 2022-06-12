import { useState, VFC } from 'react';
import { Button, ListItem, UnorderedList } from '@chakra-ui/react';
import { useTodoListQuery } from './TodoList.generated';

export const TodoList: VFC = () => {
  const [cursor, setCursor] = useState('');
  const [result] = useTodoListQuery({ variables: { cursor } });

  const todos = result.data?.viewer?.todos.edges?.map((it) => it?.node!) ?? [];
  const { hasNextPage, endCursor } = result.data?.viewer?.todos.pageInfo ?? {};
  return (
    <UnorderedList>
      {todos.map((todo) => (
        <ListItem key={todo.id}>{todo.title}</ListItem>
      ))}
      {hasNextPage && (
        <Button
          onClick={() => {
            endCursor != null && setCursor(endCursor);
          }}
        >
          More
        </Button>
      )}
    </UnorderedList>
  );
};
