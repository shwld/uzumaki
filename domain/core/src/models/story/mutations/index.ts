import { build } from './build-story';
import { edit } from './edit-story';
import { editState } from './edit-story-state';
import { remove } from './remove-story';
import { move } from './move-story';
export type { Story_BuildInput, Story_BuiltAttributes } from './build-story';
export type { Story_EditInput, Story_DraftAttributes } from './edit-story';
export type {
  Story_EditStateInput,
  Story_DraftStateAttributes,
} from './edit-story-state';
export type { Story_RemoveAttributes } from './remove-story';
export type { Story_MoveInput } from './move-story';

export const StoryMutations = {
  build,
  edit,
  editState,
  remove,
  move,
};
