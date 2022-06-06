import { GenericEntityProperties } from '../shared/entity';
import { genericValidator } from '../shared/validator';
import { userValidator } from './validator';

export type UserEntityProperties = {
  email: string;
  name: string;
  picture: string;
};

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
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);

    this.id = userValidator.id.parse(args.id);
    this.email = userValidator.email.parse(args.email);
    this.name = userValidator.name.parse(args.name);
    this.picture = userValidator.picture.parse(args.picture);
  }
}
