import { describe, expect, test } from 'vitest';
import { estimateIterations } from './estimateIterations';

describe('estimateIterations', () => {
  describe('5 10-points-stories', () => {
    const stories = [
      { points: 10 },
      { points: 10 },
      { points: 10 },
      { points: 10 },
      { points: 10 },
    ];
    const startDate = new Date('2022-02-02');
    const iterationLength = 1;
    test('velocity: 10', () => {
      const { summaries, itemIndices } = estimateIterations(stories, {
        currentVelocity: 10,
        iterationLength,
        startDate,
      });
      expect(summaries).toEqual([
        { points: 10, startDate: new Date('2022-02-02') },
        { points: 10, startDate: new Date('2022-02-09') },
        { points: 10, startDate: new Date('2022-02-16') },
        { points: 10, startDate: new Date('2022-02-23') },
        { points: 10, startDate: new Date('2022-03-02') },
        { points: 0, startDate: new Date('2022-03-09') },
      ]);
      expect(itemIndices).toEqual([
        { type: 'summary', index: 0 },
        { type: 'story', summaryIndex: 0, index: 0 },
        { type: 'summary', index: 1 },
        { type: 'story', summaryIndex: 1, index: 1 },
        { type: 'summary', index: 2 },
        { type: 'story', summaryIndex: 2, index: 2 },
        { type: 'summary', index: 3 },
        { type: 'story', summaryIndex: 3, index: 3 },
        { type: 'summary', index: 4 },
        { type: 'story', summaryIndex: 4, index: 4 },
        { type: 'summary', index: 5 },
      ]);
    });

    test('velocity: 5', () => {
      const { summaries, itemIndices } = estimateIterations(stories, {
        currentVelocity: 5,
        iterationLength,
        startDate,
      });
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
      expect(itemIndices).toEqual([
        { type: 'summary', index: 0 },
        { type: 'story', summaryIndex: 0, index: 0 },
        { type: 'summary', index: 1 },
        { type: 'summary', index: 2 },
        { type: 'story', summaryIndex: 2, index: 1 },
        { type: 'summary', index: 3 },
        { type: 'summary', index: 4 },
        { type: 'story', summaryIndex: 4, index: 2 },
        { type: 'summary', index: 5 },
        { type: 'summary', index: 6 },
        { type: 'story', summaryIndex: 6, index: 3 },
        { type: 'summary', index: 7 },
        { type: 'summary', index: 8 },
        { type: 'story', summaryIndex: 8, index: 4 },
        { type: 'summary', index: 9 },
        { type: 'summary', index: 10 },
      ]);
    });

    test('velocity: 15', () => {
      const { summaries, itemIndices } = estimateIterations(stories, {
        currentVelocity: 15,
        iterationLength,
        startDate,
      });
      expect(summaries).toEqual([
        { points: 20, startDate: new Date('2022-02-02') },
        { points: 10, startDate: new Date('2022-02-09') },
        { points: 20, startDate: new Date('2022-02-16') },
        { points: 5, startDate: new Date('2022-02-23') },
      ]);
      expect(itemIndices).toEqual([
        { type: 'summary', index: 0 },
        { type: 'story', summaryIndex: 0, index: 0 },
        { type: 'story', summaryIndex: 0, index: 1 },
        { type: 'summary', index: 1 },
        { type: 'story', summaryIndex: 1, index: 2 },
        { type: 'summary', index: 2 },
        { type: 'story', summaryIndex: 2, index: 3 },
        { type: 'story', summaryIndex: 2, index: 4 },
        { type: 'summary', index: 3 },
      ]);
    });
  });
});
