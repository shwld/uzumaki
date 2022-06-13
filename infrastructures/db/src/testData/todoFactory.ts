import {
  buildTodoByUser,
  TodoEntity,
  TodoEntityFields,
  UserEntity,
} from 'core-domain';
import { faker } from '@faker-js/faker';
import { todoRepository } from '../repositories/todoRepository';
import { buildTestUser, createTestUser } from './userFactory';

export const buildTestTodoAttributes = (
  fields?: Partial<TodoEntityFields>
): TodoEntityFields => {
  return {
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    title: faker.random.words(),
    done: false,
    userId: faker.random.alpha(10),
    ...fields,
  };
};

export const buildTestTodo = (
  user?: UserEntity,
  fields?: Partial<TodoEntityFields>
): TodoEntity => {
  const targetUser = user ?? buildTestUser();
  return buildTodoByUser(targetUser, {
    ...buildTestTodoAttributes(fields),
  });
};

export const createTestTodo = async (
  user?: UserEntity,
  fields?: Partial<TodoEntityFields>
): Promise<TodoEntity> => {
  const targetUser = user ?? (await createTestUser());
  const item = buildTodoByUser(targetUser, {
    ...buildTestTodoAttributes(fields),
  });

  return todoRepository.create(item);
};
