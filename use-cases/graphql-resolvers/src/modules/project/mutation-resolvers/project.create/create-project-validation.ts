import { ProjectValidator, ProjectBoardConfigValidator } from 'core-domain';
import { z } from 'zod';

export const createProjectArgsValidationSchema = z.object({
  input: ProjectValidator.schema
    .pick({
      id: true,
      name: true,
      description: true,
      privacy: true,
      accountId: true,
    })
    .merge(
      ProjectBoardConfigValidator.schema.pick({
        initialVelocity: true,
      })
    ),
});
