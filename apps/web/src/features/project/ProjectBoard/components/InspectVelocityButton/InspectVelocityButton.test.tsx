import { InspectVelocityButton } from './InspectVelocityButton';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('InspectVelocityButton', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <InspectVelocityButton />
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
