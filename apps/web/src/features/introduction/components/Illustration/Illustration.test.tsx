import { Illustration } from './Illustration';
import { render } from '@testing-library/react';

describe('Illustration', () => {
  test('success', () => {
    const { getByLabelText } = render(<Illustration />);
    expect(getByLabelText('Illustration')).toBeTruthy();
  });
});
