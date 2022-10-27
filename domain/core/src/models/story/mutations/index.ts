import { build } from './build-story';
import { edit } from './edit-story';
import { remove } from './remove-story';
export type { Story_BuildInput, Story_BuiltAttributes } from './build-story';
export type { Story_EditInput, Story_DraftAttributes } from './edit-story';
export type { Story_RemoveAttributes } from './remove-story';

export const StoryMutations = {
  build,
  edit,
  remove,
};
