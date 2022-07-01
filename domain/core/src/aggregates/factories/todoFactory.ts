import {
  TodoEntity,
  UpdatableTodoEntityFields,
  UserEntity,
} from '../../models';
import { generateTimeStampProperties, IdProperties } from '../../shared/entity';

export const buildTodoByUser = (
  user: UserEntity,
  todoParams: Pick<UpdatableTodoEntityFields, 'title'> & IdProperties
): TodoEntity => {
  return new TodoEntity({
    ...generateTimeStampProperties(),
    ...todoParams,
    done: false,
    userId: user.id,
  });
};
