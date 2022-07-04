import { Introduction } from './Introduction';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('Introduction', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <Introduction />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
