import { z } from 'zod';
import { GenericEntityProperties } from '../shared/entity';
import { genericValidator } from '../shared/validator';
import { todoValidator } from './validator';

/** Field  */
export interface TodoEntityFields {
  title: string;
  done: boolean;
}

interface TodoEntityRelationFields {
  userId: string;
}

export class TodoEntity implements GenericEntityProperties, TodoEntityFields {
  readonly id;
  readonly createdAt;
  readonly updatedAt;

  readonly title;
  readonly done;
  readonly userId;

  constructor(
    args: GenericEntityProperties & TodoEntityFields & TodoEntityRelationFields
  ) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);

    this.title = todoValidator.title.parse(args.title);
    this.done = todoValidator.done.parse(args.done);
    this.userId = todoValidator.userId.parse(args.userId);
  }
}
