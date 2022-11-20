import { InspectVelocityButton } from './InspectVelocityButton';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('InspectVelocityButton', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <InspectVelocityButton
          persistedVelocity={10}
          onChangeVelocity={jest.fn()}
        />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('10')).toBeTruthy();
  });
});
