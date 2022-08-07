import { Introduction } from '~/features/introduction/Introduction';
import { useProjectBoard_SubscSubscription } from '~/graphql/generated/graphql';

function Web() {
  const [res] = useProjectBoard_SubscSubscription(
    {},
    (messages: any, message) => {
      console.log({ messages, message });
      return [message];
    }
  );
  console.log(res.data);
  return <Introduction />;
}

export default Web;
