import { v4 as uuid } from 'uuid';

export function generateUuid(): string {
  return uuid();
}
