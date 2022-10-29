import type { BaseAttributes, ValidState } from '../../lib/interfaces';

export interface ProjectBoardStatus_Attributes extends BaseAttributes {
  velocity: number;
}

export interface ProjectBoardStatus_ValidAttributes
  extends ProjectBoardStatus_Attributes,
    ValidState {}
