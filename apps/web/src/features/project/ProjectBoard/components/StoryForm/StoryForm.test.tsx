import { StoryForm } from './StoryForm';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('StoryForm', () => {
  const mockedSubmit = jest.fn();
  const projectId = '490b2487-6d7b-52d2-bf28-16f4f45d24b5';
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <StoryForm projectId={projectId} onSubmit={mockedSubmit} />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    expect(renderComponent().getByText('Save')).toBeTruthy();
  });
});
