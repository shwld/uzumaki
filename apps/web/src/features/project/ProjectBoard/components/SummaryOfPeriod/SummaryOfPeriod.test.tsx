import { SummaryOfPeriod } from './SummaryOfPeriod';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('SummaryOfPeriod', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <SummaryOfPeriod points={10} startDate={new Date('2022-2-2')} />
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
