import { Illustration } from './Illustration';
import { render } from '@testing-library/react';

describe('Illustration', () => {
  test('success', () => {
    const { getByText } = render(<Illustration />);
    expect(getByText('text')).toBeTruthy();
  });
});
