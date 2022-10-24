import { describe, expect, test } from 'vitest';
import { generateId } from '../../shared/entity';
import { pipe, Either } from '../../shared/functional';
import { ProjectEntity } from './project-entity';
import { Project_BuildInput, Project_Record } from './project-interfaces';
import { ProjectMutations } from './project-mutations';

describe('build new project', async () => {
  const validInput: Project_BuildInput = {
    __state: 'Unvalidated',
    id: generateId(),
    accountId: generateId(),
    createdById: generateId(),
    name: 'test project',
    description: 'test project description',
    privacy: 'PRIVATE',
  };

  describe('case: valid input', async () => {
    test('can build', async () => {
      const build = ProjectMutations.build(validInput);
      const newProject = await build();
      expect(Either.isRight(newProject)).toBe(true);
      expect(
        pipe(
          newProject,
          Either.match(
            a => a.message,
            a => a.__state
          )
        )
      ).toEqual('Built');
    });
  });

  describe('case: invalid input', async () => {
    test('can not build', async () => {
      const invalidInput: Project_BuildInput = {
        ...validInput,
        name: '',
      };
      const build = ProjectMutations.build(invalidInput);
      const newProject = await build();
      expect(Either.isLeft(newProject)).toBe(true);
      expect(
        pipe(
          newProject,
          Either.match(
            a => a.message,
            a => a.__state
          )
        )
      ).toContain('Validation Error');
    });
  });
});

describe('edit', async () => {
  const record: Project_Record = {
    id: generateId(),
    accountId: generateId(),
    createdById: generateId(),
    name: 'test project',
    description: 'test project description',
    privacy: 'PRIVATE',
    boardConfigId: generateId(),
    boardStatusId: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('case: valid input', async () => {
    test('can edit', async () => {
      const accountMembership = ProjectEntity.fromRecord(record);
      expect(accountMembership.name).eq('test project');
      const edit = ProjectMutations.edit({
        __state: 'Unvalidated',
        name: 'new project',
      })(accountMembership);
      const newProject = await edit();
      expect(Either.isRight(newProject)).toBe(true);
      expect(
        pipe(
          newProject,
          Either.match(
            a => a.message,
            a => a.name
          )
        )
      ).toEqual('new project');
    });
  });

  describe('case: invalid input', async () => {
    test('can not edit', async () => {
      const accountMembership = ProjectEntity.fromRecord(record);
      expect(accountMembership.name).eq('test project');
      const edit = ProjectMutations.edit({
        __state: 'Unvalidated',
        name: '',
      })(accountMembership);
      const newProject = await edit();
      expect(Either.isLeft(newProject)).toBe(true);
      expect(
        pipe(
          newProject,
          Either.match(
            a => a.message,
            a => a.name
          )
        )
      ).toContain('Validation Error');
    });
  });
});

describe('remove', async () => {
  const record: Project_Record = {
    id: generateId(),
    accountId: generateId(),
    createdById: generateId(),
    name: 'test project',
    description: 'test project description',
    privacy: 'PRIVATE',
    boardConfigId: generateId(),
    boardStatusId: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('can remove', async () => {
    const accountMembership = ProjectEntity.fromRecord(record);
    expect(accountMembership.__state).eq('Validated');
    const newProject = ProjectMutations.remove(accountMembership);
    expect(newProject.__state).eq('Removing');
  });
});
