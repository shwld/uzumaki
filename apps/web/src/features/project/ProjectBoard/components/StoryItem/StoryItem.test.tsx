import { StoryItem } from './StoryItem';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';
import { aStory } from '~/graphql/generated/mockData';
import { List } from '@chakra-ui/react';

describe('StoryItem', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <List>
          <StoryItem story={aStory({ title: 'test story' })} />
        </List>
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('test story')).toBeTruthy();
  });
});
