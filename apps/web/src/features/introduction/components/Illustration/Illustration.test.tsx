import { Illustration } from './Illustration';
import { render } from '@testing-library/react';

describe('Illustration', () => {
  const renderComponent = () => {
    const renderResult = render(<Illustration />);
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByLabelText } = renderComponent();
    expect(getByLabelText('Illustration')).toBeTruthy();
  });
});
