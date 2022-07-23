import { AggregationContainer } from './AggregationContainer';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('AggregationContainer', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <AggregationContainer
          currentVelocity={10}
          startDate={new Date('2020/1/1')}
          stories={[]}
          renderStoryItem={(story, index) => <></>}
        />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
