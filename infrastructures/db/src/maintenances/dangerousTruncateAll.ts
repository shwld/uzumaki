import { db } from '../lib/db';

export async function dangerousTruncateAll(): Promise<void> {
  await db.$transaction([
    // need break line for plop code generator
    db.accountMembership.deleteMany(),
    db.account.deleteMany(),
    db.user.deleteMany(),
  ]);
  await db.$disconnect();
}
