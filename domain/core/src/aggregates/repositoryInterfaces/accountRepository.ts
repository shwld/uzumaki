import type { AccountEntity } from '../../models/account/entity';
import { Repository } from './base';

export interface AccountRepository
  extends Repository<AccountEntity, undefined> {}
