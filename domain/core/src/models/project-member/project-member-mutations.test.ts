import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { pipe, Either } from '../../shared/functional';
import { User_Record } from '../user';
import { ProjectMemberEntity } from './project-member-entity';
import { ProjectMember_Record } from './project-member-interfaces';
import { ProjectMemberMutations } from './project-member-mutations';

describe('edit', async () => {
  const record: ProjectMember_Record & { user: User_Record } = {
    id: generateId(),
    projectId: generateId(),
    userId: generateId(),
    role: 'OWNER',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      uid: 'hoge-hoge-hoge',
      email: 'test@example.com',
      name: 'test user',
      avatarImageUrl: 'https://example.com/image.png',
    },
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const projectBoardStatus = ProjectMemberEntity.fromRecord(record);
      expect(projectBoardStatus.role).eq('OWNER');
      const edit = ProjectMemberMutations.edit({
        __state: 'Unvalidated',
        role: 'MEMBER',
      })(projectBoardStatus);
      const newProjectMember = await edit();
      expect(Either.isRight(newProjectMember)).toBe(true);
      expect(
        pipe(
          newProjectMember,
          Either.match(
            a => a.message,
            a => a.role
          )
        )
      ).toEqual('MEMBER');
    });
  });
});
