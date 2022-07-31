import { GenericEntityProperties, StateProperties } from '../../shared/entity';
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
  StateProperties &
  UpdatableUserEntityFields &
  UserEntityRelationFields;

type AttributesForInitialize = GenericEntityProperties &
  Partial<StateProperties> &
  UpdatableUserEntityFields &
  UserEntityRelationFields;

export class UserEntity implements UserEntityFields {
  readonly id;
  readonly createdAt;
  readonly updatedAt;
  readonly isDeleted;
  readonly isUpdated;

  readonly uid;

  readonly email;
  readonly name;
  readonly avatarImageUrl;

  attributes(): AttributesForInitialize & StateProperties {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isUpdated: this.isUpdated,
      isDeleted: this.isDeleted,
      uid: this.uid,
      email: this.email,
      name: this.name,
      avatarImageUrl: this.avatarImageUrl,
    };
  }

  constructor(args: AttributesForInitialize) {
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.isDeleted = args.isDeleted ?? false;
    this.isUpdated = args.isUpdated ?? false;

    this.id = userValidator.id.parse(args.id);
    this.uid = userValidator.uid.parse(args.uid);
    this.email = userValidator.email.parse(args.email);
    this.name = userValidator.name.parse(args.name);
    this.avatarImageUrl = userValidator.avatarImageUrl.parse(
      args.avatarImageUrl
    );
  }
}
