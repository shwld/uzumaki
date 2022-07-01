import { z } from 'zod';
import { genericValidator } from '../../shared/validator';
import { accountValidator } from '../account/validator';
import { userValidator } from '../user';

export const accountUserValidator = {
  userId: userValidator.id,
  accountId: accountValidator.id,
};

export const accountUserValidationSchema = z
  .object({
    updatedAt: genericValidator.updatedAt,
    createdAt: genericValidator.createdAt,
    ...accountUserValidator,
  })
  .strict();
