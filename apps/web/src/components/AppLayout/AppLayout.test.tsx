import AppLayout from './AppLayout';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('AppLayout', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <AppLayout>test</AppLayout>
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
