import { DefaultContext } from '@envelop/types';

export interface GraphqlServerContext extends DefaultContext {
  // db: PrismaClient
}

export function createContext(): GraphqlServerContext {
  return {};
}
