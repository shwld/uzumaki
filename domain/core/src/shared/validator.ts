import { z } from 'zod';
import { STATE_IS_UNVALIDATED, STATE_IS_VALIDATED } from './interfaces';

export type StrictProperties<T, TError = 'has excess property'> = T &
  (Exclude<keyof T, keyof T> extends never ? {} : TError);

export type ValidationError = {
  field: string;
  errorMessage: string;
};

export type ValidationErrors = ValidationError[];

export const genericValidator = {
  __state: z.optional(z.enum([STATE_IS_UNVALIDATED, STATE_IS_VALIDATED])),
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};
