import { Aggregates } from 'core-domain';
import { create } from './story-create';
import { destroy } from './story-destroy';
import { find } from './story-find';
import { findBy } from './story-find-by';
import { findMany } from './story-find-many';
import { move } from './story-move';
import { update } from './story-update';
import { updateState } from './story-update-state';

export const StoryRepository: Aggregates['story'] = {
  create,
  update,
  updateState,
  destroy,
  move,
  find,
  findBy,
  findMany,
};
