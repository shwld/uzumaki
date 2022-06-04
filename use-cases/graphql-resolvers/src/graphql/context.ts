import { DefaultContext } from '@envelop/types';
import { userRepository } from 'db';

export interface GraphqlServerContext extends DefaultContext {
  currentUserId?: string;
  // db: PrismaClient
}

export function createContext(user?: {
  currentUserId: string;
  name: string;
  email: string;
  picture: string;
}): GraphqlServerContext {
  // const currentUser =
  //   user != null
  //     ? userRepository.findById(user.currentUserId) ??
  //       userRepository.create(user)
  //     : undefined;
  return {};
}
