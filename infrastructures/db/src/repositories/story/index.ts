import { Aggregates } from 'core-domain';
import { create } from './story-create';
import { destroy } from './story-destroy';
import { findBy } from './story-find-by';
import { findMany } from './story-find-many';
import { update } from './story-update';

export const StoryRepository: Aggregates['story'] = {
  create,
  update,
  destroy,
  findBy,
  findMany,
};
