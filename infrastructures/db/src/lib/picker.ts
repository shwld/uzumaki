import { BaseAttributes } from 'core-domain/src/shared/interfaces';

export const picker = <T extends BaseAttributes>(
  attributes: T
): BaseAttributes & { attributes: Omit<T, keyof BaseAttributes> } => {
  const { id, createdAt, updatedAt, ...newAttributes } = attributes;

  return {
    id,
    createdAt,
    updatedAt,
    attributes: newAttributes,
  };
};
