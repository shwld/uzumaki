import { z } from 'zod';
import { genericValidator, validateWith } from '../../lib/validator';

const validators = {
  id: genericValidator.id,
  initialVelocity: z.number().int().min(0),
  startOn: z.date().nullable(),
  startIterationOn: z.enum([
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ]),
  iterationLength: z.number().int().min(1).max(10),
  createdAt: genericValidator.createdAt,
  updatedAt: genericValidator.updatedAt,
};
const schema = z.object(validators).strict();
const validate = validateWith(schema);

export const ProjectBoardConfigValidator = {
  validators,
  schema,
  validate,
};
