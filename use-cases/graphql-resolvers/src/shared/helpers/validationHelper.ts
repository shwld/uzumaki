import { Result } from 'core-domain';
import { ZodSchema, z, ZodTypeDef } from 'zod';
import { InvalidArgumentsResult } from '../../generated/resolversTypes';
import { invalidArgumentsResult } from './mutationHelpers';

export const validateArguments = <
  TArgs,
  TOutput,
  TDef extends ZodTypeDef,
  TInput = TOutput
>(
  args: TArgs,
  schema: ZodSchema<TOutput, TDef, TInput>
): Result<InvalidArgumentsResult, TOutput> => {
  const result = schema.safeParse(args);
  if (!result.success) {
    return Result.left(invalidArgumentsResult(result.error));
  }

  return Result.right(result.data);
};
