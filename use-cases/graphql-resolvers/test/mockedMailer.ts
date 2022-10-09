import type { Mailer } from 'domain-interfaces';

export const MockedMailer: Mailer = {
  async send(mail) {
    return {
      body: 'success',
    };
  },
};
