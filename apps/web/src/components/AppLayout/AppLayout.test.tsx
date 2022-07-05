import AppLayout from './AppLayout';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('AppLayout', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <AppLayout>test</AppLayout>
      </MockedUrqlProvider>
    );
    expect(getByText('test')).toBeTruthy();
  });
});
