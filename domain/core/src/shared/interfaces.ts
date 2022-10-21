export const STATE_IS_BUILT = 'Built' as const;
export const STATE_IS_UNVALIDATED = 'Unvalidated' as const;
export const STATE_IS_VALIDATED = 'Validated' as const;
export const STATE_IS_DRAFT = 'Draft' as const;
export const STATE_IS_REMOVING = 'Removing' as const;

export type ID = string;

export interface BaseAttributes {
  id: ID;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseInputState {
  __state: typeof STATE_IS_UNVALIDATED;
}

export interface BuiltState {
  __state: typeof STATE_IS_BUILT;
}

export interface ValidState {
  __state: typeof STATE_IS_VALIDATED;
}

export interface DraftState {
  __state: typeof STATE_IS_DRAFT;
}

export interface RemovingState {
  __state: typeof STATE_IS_REMOVING;
}
