import { StoryStateUpdateButton } from './StoryStateUpdateButton';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';
import { StoryState } from '~/graphql/generated/graphql';

describe('StoryStateUpdateButton', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <StoryStateUpdateButton storyId="test" state={StoryState.Started} />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
