import { QueryResolvers } from '../../../../generated/resolversTypes';

export type AnonymousQueryResolvers = Pick<QueryResolvers, 'anonymous'>;

export const anonymous: AnonymousQueryResolvers['anonymous'] = (
  _parent,
  _args,
  _ctx,
  _info
) => {
  return {
    id: 'anonymous',
  };
};
