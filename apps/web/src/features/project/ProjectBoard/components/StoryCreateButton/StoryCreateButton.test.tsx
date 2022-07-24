import { StoryCreateButton } from './StoryCreateButton';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('StoryCreateButton', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <StoryCreateButton />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('Add story')).toBeTruthy();
  });
});
