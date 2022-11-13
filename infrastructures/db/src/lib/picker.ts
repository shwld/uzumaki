import { BaseAttributes } from 'core-domain/src/shared/interfaces';

export const picker = <T extends BaseAttributes & { __state?: string }>(
  attributes: T
): BaseAttributes & {
  attributes: Omit<T, keyof BaseAttributes | '__state'>;
} => {
  const { id, __state, createdAt, updatedAt, ...newAttributes } = attributes;

  return {
    id,
    createdAt,
    updatedAt,
    attributes: newAttributes,
  };
};
