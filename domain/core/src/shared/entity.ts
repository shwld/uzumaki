import { v4 as uuid } from 'uuid';

export interface IdProperties {
  readonly id: string;
}
export interface TimeStampProperties {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface GenericEntityProperties
  extends IdProperties,
    TimeStampProperties {}

export const generateId = () => uuid();

export const generateTimeStampProperties = (): TimeStampProperties => ({
  createdAt: new Date(),
  updatedAt: new Date(),
});
