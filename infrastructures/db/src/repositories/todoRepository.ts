import { Todo, User } from '@prisma/client';
import { TodoEntity } from 'core-domain';
import type { TodoEntityFields, TodoRepository } from 'core-domain';
import { db } from '../lib/db';

/**
 * Mappers
 */
const mapToTodoEntity = (item: Todo) =>
  new TodoEntity({
    id: item.id,
    title: item.title,
    done: item.done,
    userId: item.userId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  });
const mapTEntityOrUndefined = (item: Todo | null | undefined) =>
  item != null ? mapToTodoEntity(item) : undefined;

const mapFromEntity = (item: TodoEntity): TodoEntityFields => ({
  title: item.title,
  done: item.done,
});

/**
 * Repositories
 */
export const todoRepository: TodoRepository = {
  create(data) {
    return db.todo
      .create({
        data: {
          id: data.id,
          ...mapFromEntity(data),
          user: {
            connect: {
              id: data.userId,
            },
          },
        },
      })
      .then(mapToTodoEntity);
  },
  update(item) {
    return db.todo
      .update({
        data: mapFromEntity(item),
        where: { id: item.id },
      })
      .then(mapToTodoEntity);
  },
  destroy(item) {
    return db.todo.delete({ where: { id: item.id } }).then(mapToTodoEntity);
  },
  async findMany({ user, ...args }) {
    const options = {
      where: { userId: user.id },
    };
    const totalCount = await db.todo.aggregate({
      ...options,
      _count: true,
    });
    return db.todo.findMany({ ...options, ...args }).then((todos) => ({
      nodes: todos.map(mapToTodoEntity),
      totalCount: totalCount._count,
    }));
  },
  findBy(args) {
    return db.todo
      .findFirst({
        where: { id: args.id, userId: args.user.id },
      })
      .then(mapTEntityOrUndefined);
  },
};
