import type { Mailer } from '../src/interfaces';

export const MockedMailer: Mailer = {
  async send(mail) {
    return {
      body: 'success',
    };
  },
};
