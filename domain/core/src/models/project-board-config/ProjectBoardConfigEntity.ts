import { GenericEntityProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { projectBoardConfigValidator } from './projectBoardConfigValidator';

type DayOfWeek =
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY';
/** Field  */
export interface UpdatableProjectBoardConfigEntityFields {
  initialVelocity: number;
  startOn?: Date;
  startIterationOn: DayOfWeek;
  iterationLength: number;
}

interface ProjectBoardConfigEntityRelationFields {}

export type ProjectBoardConfigEntityFields = GenericEntityProperties &
  UpdatableProjectBoardConfigEntityFields &
  ProjectBoardConfigEntityRelationFields;

type AttributesForInitialize = GenericEntityProperties &
  UpdatableProjectBoardConfigEntityFields &
  ProjectBoardConfigEntityRelationFields;

export class ProjectBoardConfigEntity
  implements ProjectBoardConfigEntityFields
{
  readonly id;
  readonly createdAt;
  readonly updatedAt;

  readonly initialVelocity;
  readonly startOn;
  readonly startIterationOn;
  readonly iterationLength;

  attributes(): AttributesForInitialize {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      initialVelocity: this.initialVelocity,
      startOn: this.startOn,
      startIterationOn: this.startIterationOn,
      iterationLength: this.iterationLength,
    };
  }

  constructor(args: AttributesForInitialize) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);

    this.initialVelocity = projectBoardConfigValidator.initialVelocity.parse(
      args.initialVelocity
    );
    this.startOn = projectBoardConfigValidator.startOn.parse(args.startOn);
    this.startIterationOn = projectBoardConfigValidator.startIterationOn.parse(
      args.startIterationOn
    ) as DayOfWeek;
    this.iterationLength = projectBoardConfigValidator.iterationLength.parse(
      args.iterationLength
    );
  }
}
