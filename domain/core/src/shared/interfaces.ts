export const STATE_IS_UNVALIDATED = 'Unvalidated' as const;
export const STATE_IS_VALIDATED = 'Validated' as const;
export const STATE_IS_DRAFT = 'Draft' as const;
export const STATE_IS_REMOVING = 'Removing' as const;

export interface BaseInputAttributes {
  __state: typeof STATE_IS_UNVALIDATED;
  id?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface BaseAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
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
