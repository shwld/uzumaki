import type { Project } from '@prisma/client';
import type { Project_ValidAttributes } from 'core-domain';

export const convertToValidAttributes = (
  record: Project
): Project_ValidAttributes => {
  return {
    ...record,
    __state: 'Validated',
  };
};
