import { AggregationContainer } from './AggregationContainer';
import { render } from '@testing-library/react';
import { List } from '@chakra-ui/react';

describe('AggregationContainer', () => {
  const renderComponent = () => {
    const renderResult = render(
      <List>
        <AggregationContainer
          currentVelocity={10}
          startDate={new Date('2020/1/1')}
          stories={[]}
          renderStoryItem={(story, index) => <></>}
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
    expect(getByText('0 of 7 points')).toBeTruthy();
  });
});
