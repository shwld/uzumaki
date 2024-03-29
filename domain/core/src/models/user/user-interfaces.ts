import type { BaseAttributes, ValidState } from '../../shared/interfaces';

export interface User_Attributes extends BaseAttributes {
  uid: string;
  email: string;
  name: string;
  avatarImageUrl: string;
}

export interface User_ValidAttributes extends User_Attributes, ValidState {}
