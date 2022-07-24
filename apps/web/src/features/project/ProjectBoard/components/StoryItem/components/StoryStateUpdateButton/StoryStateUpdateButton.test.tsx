import { StoryStateUpdateButton } from './StoryStateUpdateButton';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';
import { StoryState } from '~/graphql/generated/graphql';

describe('StoryStateUpdateButton', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <StoryStateUpdateButton storyId="test" state={StoryState.Started} />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('Finish')).toBeTruthy();
  });
});
