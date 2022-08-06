import { Aggregates } from 'core-domain';
import { db as aggregates } from 'db';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var db: Aggregates | undefined;
}

export const db = global.db ?? aggregates;

if (process.env.NODE_ENV !== 'production') global.db = db;
