import { AggregationContainer } from './AggregationContainer';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('AggregationContainer', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <AggregationContainer />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
