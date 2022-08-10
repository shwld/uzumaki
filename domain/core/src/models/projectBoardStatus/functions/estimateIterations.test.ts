import { describe, expect, test } from 'vitest';
import { estimateIterations } from './estimateIterations';

describe('estimateIterations', () => {
  describe('iteration length is 1', () => {
    const stories = [
      { points: 10 },
      { points: 10 },
      { points: 10 },
      { points: 10 },
      { points: 10 },
    ];
    const startDate = new Date('2022-02-02');
    test('velocity: 10, iteration length: 1', () => {
      const { summaries, componentParams } = estimateIterations(stories, {
        currentVelocity: 10,
        iterationLength: 1,
        startDate,
      });
      console.log({ summaries, componentParams });
      expect(summaries).toEqual([
        { points: 10, startDate: new Date('2022-02-02') },
        { points: 10, startDate: new Date('2022-02-09') },
        { points: 10, startDate: new Date('2022-02-16') },
        { points: 10, startDate: new Date('2022-02-23') },
        { points: 10, startDate: new Date('2022-03-02') },
        { points: 0, startDate: new Date('2022-03-09') },
      ]);
      expect(componentParams).toEqual([
        { type: 'summary', index: 0 },
        { type: 'story', index: 0 },
        { type: 'summary', index: 1 },
        { type: 'story', index: 1 },
        { type: 'summary', index: 2 },
        { type: 'story', index: 2 },
        { type: 'summary', index: 3 },
        { type: 'story', index: 3 },
        { type: 'summary', index: 4 },
        { type: 'story', index: 4 },
        { type: 'summary', index: 5 },
      ]);
    });

    test('velocity: 5, iteration length: 1', () => {
      const { summaries, componentParams } = estimateIterations(stories, {
        currentVelocity: 5,
        iterationLength: 1,
        startDate,
      });
      console.log({ summaries, componentParams });
      expect(summaries).toEqual([
        { points: 10, startDate: new Date('2022-02-02') },
        { points: 0, startDate: new Date('2022-02-09') },
        { points: 10, startDate: new Date('2022-02-16') },
        { points: 0, startDate: new Date('2022-02-23') },
        { points: 10, startDate: new Date('2022-03-02') },
        { points: 0, startDate: new Date('2022-03-09') },
        { points: 10, startDate: new Date('2022-03-16') },
        { points: 0, startDate: new Date('2022-03-23') },
        { points: 10, startDate: new Date('2022-03-30') },
        { points: 0, startDate: new Date('2022-04-06') },
        { points: 0, startDate: new Date('2022-04-13') },
      ]);
      expect(componentParams).toEqual([
        { type: 'summary', index: 0 },
        { type: 'story', index: 0 },
        { type: 'summary', index: 1 },
        { type: 'summary', index: 2 },
        { type: 'story', index: 1 },
        { type: 'summary', index: 3 },
        { type: 'summary', index: 4 },
        { type: 'story', index: 2 },
        { type: 'summary', index: 5 },
        { type: 'summary', index: 6 },
        { type: 'story', index: 3 },
        { type: 'summary', index: 7 },
        { type: 'summary', index: 8 },
        { type: 'story', index: 4 },
        { type: 'summary', index: 9 },
        { type: 'summary', index: 10 },
      ]);
    });
  });
});
