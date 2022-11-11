import { Either, Result, toResult } from 'core-domain';
import { ZodSchema, z, ZodTypeDef } from 'zod';
import { InvalidArgumentsResult } from '../../generated/resolvers-types';
import { invalidArgumentsResult } from './result-helpers';

export const validateArguments =
  <TOutput, TDef extends ZodTypeDef, TInput = TOutput>(
    schema: ZodSchema<TOutput, TDef, TInput>
  ) =>
  <
    TArgs,
    TOptions extends {
      args: TArgs;
    }
  >(
    options: TOptions
  ): Result<
    InvalidArgumentsResult,
    { args: TOutput } & Omit<TOptions, 'args'>
  > => {
    const result = schema.safeParse(options.args);
    return toResult(
      !result.success
        ? Either.left(invalidArgumentsResult(result.error))
        : Either.right({
            ...options,
            args: result.data,
          })
    );
  };
