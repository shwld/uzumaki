import { Result, toResult } from 'core-domain';
import { ZodSchema, z, ZodTypeDef } from 'zod';
import { InvalidArgumentsResult } from '../../generated/resolversTypes';
import { invalidArgumentsResult } from './mutationHelpers';

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
    // { args: TOutput } & Omit<Options, 'args'>
    TOptions
  > => {
    const result = schema.safeParse(options.args);
    return toResult(
      !result.success
        ? Result.left(invalidArgumentsResult(result.error))
        : Result.right({
            ...options,
            args: result.data,
          })
    );
  };
