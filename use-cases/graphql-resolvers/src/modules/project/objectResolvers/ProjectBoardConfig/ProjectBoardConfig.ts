import {
  DayOfWeek,
  ProjectBoardConfigResolvers,
} from '../../../../generated/resolvers-types';

const WEEK_DAYS: string[] = [
  DayOfWeek.Sunday,
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
];

export const ProjectBoardConfig: ProjectBoardConfigResolvers = {
  startIterationWeekNumber(parent) {
    return WEEK_DAYS.indexOf(parent.startIterationOn);
  },
};
