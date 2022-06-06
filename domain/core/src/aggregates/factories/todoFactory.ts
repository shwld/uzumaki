import { TodoEntity, TodoEntityFields, UserEntity } from '../../models';
import {
  generateTimeStampProperties,
  IdProperties,
} from '../../models/shared/entity';

export const buildTodoByUser = (
  user: UserEntity,
  todoParams: Pick<TodoEntityFields, 'title'> & IdProperties
): TodoEntity => {
  return new TodoEntity({
    ...generateTimeStampProperties(),
    ...todoParams,
    done: false,
    userId: user.id,
  });
};
