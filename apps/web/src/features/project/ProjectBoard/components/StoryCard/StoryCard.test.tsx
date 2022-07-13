import { StoryCard } from './StoryCard';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('StoryCard', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <StoryCard />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
