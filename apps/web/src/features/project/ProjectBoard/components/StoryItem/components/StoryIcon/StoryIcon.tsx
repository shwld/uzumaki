import { StarIcon } from '@chakra-ui/icons';
import { ListIcon } from '@chakra-ui/react';
import { FC } from 'react';
import { StoryKind } from '~/graphql/generated/graphql';
import { AiFillBug, AiFillSetting, AiFillFlag } from 'react-icons/ai';

export const StoryIcon: FC<{ kind: StoryKind }> = ({ kind }) => {
  switch (kind) {
    case StoryKind.Bug: {
      return <ListIcon as={AiFillBug} color="red.400" />;
    }
    case StoryKind.Chore: {
      return <ListIcon as={AiFillSetting} color="gray.400" />;
    }
    case StoryKind.Release: {
      return <ListIcon as={AiFillFlag} color="blue.400" />;
    }
  }
  return <ListIcon as={StarIcon} color="green.400" />;
};
