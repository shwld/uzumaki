import { GenericEntityProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { userValidator } from './userValidator';

export type UpdatableUserEntityFields = {
  email: string;
  name: string;
  avatarImageUrl: string;
};

interface UserEntityRelationFields {
  uid: string;
}

export type UserEntityFields = GenericEntityProperties &
  UpdatableUserEntityFields &
  UserEntityRelationFields;

export class UserEntity implements UserEntityFields {
  readonly id;
  readonly createdAt;
  readonly updatedAt;
  readonly isDeleted;

  readonly uid;

  readonly email;
  readonly name;
  readonly avatarImageUrl;

  constructor(
    args: Omit<GenericEntityProperties, 'isDeleted'> &
      UpdatableUserEntityFields &
      UserEntityRelationFields
  ) {
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.isDeleted = false;

    this.id = userValidator.id.parse(args.id);
    this.uid = userValidator.uid.parse(args.uid);
    this.email = userValidator.email.parse(args.email);
    this.name = userValidator.name.parse(args.name);
    this.avatarImageUrl = userValidator.avatarImageUrl.parse(
      args.avatarImageUrl
    );
  }
}
