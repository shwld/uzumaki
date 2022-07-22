import { StoryStateUpdateButton } from './StoryStateUpdateButton';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('StoryStateUpdateButton', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <StoryStateUpdateButton />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
