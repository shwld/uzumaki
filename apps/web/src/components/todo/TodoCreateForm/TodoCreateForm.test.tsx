import { TodoCreateForm } from './TodoCreateForm';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '../../../test/MockedUrqlProvider';

describe('TodoCreateForm', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <TodoCreateForm />
      </MockedUrqlProvider>
    );
    expect(getByText('First title')).toBeTruthy();
  });
});
