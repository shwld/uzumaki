import { SummaryOfPeriod } from './SummaryOfPeriod';
import { render } from '@testing-library/react';
import { List } from '@chakra-ui/react';

describe('SummaryOfPeriod', () => {
  const renderComponent = () => {
    const renderResult = render(
      <List>
        <SummaryOfPeriod
          points={10}
          startDate={new Date('2022-2-2')}
          iterationLength={2}
        />
      </List>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('10 points')).toBeTruthy();
  });
});
