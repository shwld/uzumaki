import { GenericEntityProperties } from './shared/entity';
import { UserEntity } from './user';

export interface TodoEntityProperties {
  title: string;
  done: boolean;
}

interface TodoEntityRelationProperties {
  userId: string;
}

export class TodoEntity
  implements GenericEntityProperties, TodoEntityProperties
{
  readonly id;
  readonly createdAt;
  readonly updatedAt;

  readonly title;
  readonly done;
  readonly userId;

  constructor(
    args: GenericEntityProperties &
      TodoEntityProperties &
      TodoEntityRelationProperties
  ) {
    this.id = args.id;
    this.title = args.title;
    this.done = args.done;
    this.userId = args.userId;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
}
