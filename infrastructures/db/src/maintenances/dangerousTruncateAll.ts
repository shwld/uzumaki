import { db } from '../lib/db';

export async function dangerousTruncateAll(): Promise<void> {
  const deleteTodo = db.todo.deleteMany();
  const deleteUser = db.user.deleteMany();
  await db.$transaction([deleteTodo, deleteUser]);
  await db.$disconnect();
}
