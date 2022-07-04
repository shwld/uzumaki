import { AccountUpdateForm } from './AccountUpdateForm';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('AccountUpdateForm', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <AccountUpdateForm />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
