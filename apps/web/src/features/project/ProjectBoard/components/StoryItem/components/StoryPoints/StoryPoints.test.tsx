import { StoryPoints } from './StoryPoints';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';
import { aStory } from '~/graphql/generated/mockData';

describe('StoryPoints', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <StoryPoints story={aStory({ points: 13, canEstimate: true })} />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('13')).toBeTruthy();
  });
});
