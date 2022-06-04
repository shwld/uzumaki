import { v4 as uuid } from 'uuid';

interface TimeStampProperties {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface GenericEntityProperties extends TimeStampProperties {
  readonly id: string;
}

export const generateId = () => uuid();

export const generateTimeStampProperties = (): TimeStampProperties => ({
  createdAt: new Date(),
  updatedAt: new Date(),
});
