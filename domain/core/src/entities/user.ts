import { GenericEntityProperties } from './shared/entity';

export interface UserEntityProperties {
  email: string;
  name: string;
  picture: string;
}

export class UserEntity
  implements GenericEntityProperties, UserEntityProperties
{
  readonly id;
  readonly createdAt;
  readonly updatedAt;

  readonly email;
  readonly name;
  readonly picture;

  constructor(args: GenericEntityProperties & UserEntityProperties) {
    this.id = args.id;
    this.email = args.email;
    this.name = args.name;
    this.picture = args.picture;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
}
