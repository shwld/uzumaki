import { StoryIcon } from './StoryIcon';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('StoryIcon', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <StoryIcon />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('test')).toBeTruthy();
  });
});
