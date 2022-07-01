import { z } from 'zod';

export type ValidationError = {
  field: string;
  errorMessage: string;
};

export type ValidationErrors = ValidationError[];

export const genericValidator = {
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};
