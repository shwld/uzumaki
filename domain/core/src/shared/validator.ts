import { z } from 'zod';

export type StrictProperties<T, TError = 'has excess property'> = T &
  (Exclude<keyof T, keyof T> extends never ? {} : TError);

export type ValidationError = {
  field: string;
  errorMessage: string;
};

export type ValidationErrors = ValidationError[];

const VALID = 'valid' as const;
const UNKNOWN = 'unknown' as const;
const ATTRIBUTES_TYPE = [VALID, UNKNOWN] as const;
export const genericValidator = {
  attributesType: z.optional(z.enum(ATTRIBUTES_TYPE)),
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export interface BaseAttributes {
  id?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface BaseValidAttributes {
  attributesType: typeof VALID;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export function transformToValid<
  T extends Omit<BaseValidAttributes, 'attributesType'>
>(attributes: T): T & { attributesType: typeof VALID } {
  return {
    ...attributes,
    attributesType: VALID,
  };
}
