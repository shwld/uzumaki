import { useSampleQuery } from './Sample.generated';

export const Sample: React.VFC = () => {
  const [sample] = useSampleQuery();
  if (sample.error) return <div>{JSON.stringify(sample.error)}</div>;
  if (sample.fetching) return <div>loading</div>;
  return <div>Sample: {sample.data?.viewer?.email}</div>;
};
