import { Result } from 'core-domain/lib';
import type { Mailer } from 'domain-interfaces';

export const MockedMailer: Mailer = {
  send(_mail) {
    return Result.right({
      body: 'success',
    });
  },
};
