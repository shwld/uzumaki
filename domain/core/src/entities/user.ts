import { GenericEntityProperties } from './shared/entity';

export interface UserEntityProperties {
  readonly email: string;
  readonly name: string;
}

export class UserEntity
  implements GenericEntityProperties, UserEntityProperties
{
  readonly id;
  readonly createdAt;
  readonly updatedAt;

  readonly email;
  readonly name;

  constructor(args: GenericEntityProperties & UserEntityProperties) {
    this.id = args.id;
    this.email = args.email;
    this.name = args.name;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
}
