import { StoryItem } from './StoryItem';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('StoryItem', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <StoryItem />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
