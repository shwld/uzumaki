import type { BaseAttributes, ValidState } from '../../shared/interfaces';

export interface ProjectBoardStatus_Attributes extends BaseAttributes {
  velocity: number;
}

export interface ProjectBoardStatus_ValidAttributes
  extends ProjectBoardStatus_Attributes,
    ValidState {}
