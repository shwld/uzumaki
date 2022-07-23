import { StoryItem } from './StoryItem';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';
import { aStory } from '~/graphql/generated/mockData';

describe('StoryItem', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <StoryItem story={aStory()} />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
