import { z, ZodSchema, ZodTypeDef } from 'zod';
import { InvalidAttributesError } from './error';
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
