import type { ID, ValidState } from '../../shared/interfaces';

export interface UserProfile_Attributes {
  id: ID;
  name: string;
  avatarImageUrl: string;
}

export interface UserProfile_ValidAttributes
  extends UserProfile_Attributes,
    ValidState {}
