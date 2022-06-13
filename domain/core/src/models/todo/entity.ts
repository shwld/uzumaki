import { GenericEntityProperties } from '../shared/entity';
import { genericValidator } from '../shared/validator';
import { todoValidator } from './validator';

/** Field  */
export interface UpdatableTodoEntityFields {
  title: string;
  done: boolean;
}

interface TodoEntityRelationFields {
  userId: string;
}

export type TodoEntityFields = GenericEntityProperties &
  UpdatableTodoEntityFields &
  TodoEntityRelationFields;

export class TodoEntity implements TodoEntityFields {
  readonly id;
  readonly createdAt;
  readonly updatedAt;

  readonly title;
  readonly done;
  readonly userId;

  constructor(
    args: GenericEntityProperties &
      UpdatableTodoEntityFields &
      TodoEntityRelationFields
  ) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);

    this.title = todoValidator.title.parse(args.title);
    this.done = todoValidator.done.parse(args.done);
    this.userId = todoValidator.userId.parse(args.userId);
  }
}
