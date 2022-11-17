import dayjs from 'dayjs';
import { z, ZodSchema, ZodTypeDef } from 'zod';
import { InvalidAttributesError } from './error';
import { patternMatch } from './pattern';
import { Either, Result, toResult } from './result';

export type StrictProperties<T, TError = 'has excess property'> = T &
  (Exclude<keyof T, keyof T> extends never ? {} : TError);

export type ValidationError = {
  field: string;
  errorMessage: string;
};

export type ValidationErrors = ValidationError[];

export const genericValidator = {
  __state: z.string().optional(),
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const validateWith =
  <TOutput, TDef extends ZodTypeDef, TInput = TOutput>(
    schema: ZodSchema<TOutput, TDef, TInput>
  ) =>
  (input: TInput): Result<InvalidAttributesError, TOutput> => {
    const parsedInput = schema.safeParse(input);

    return toResult(
      !parsedInput.success
        ? Either.left(InvalidAttributesError.from(parsedInput.error))
        : Either.right(parsedInput.data)
    );
  };

export const dateStringValidator = z
  .string()
  // Assume also null,undefined
  .refine(val => (val == null || val === '' ? true : dayjs(val).isValid()), {
    message: 'Invalid Date string',
  })
  .transform(val => (val == null ? null : new Date(val)));
