import type { Mailer } from '../src/interfaces/mailer';

export const MockedMailer: Mailer = {
  async send(mail) {
    return {
      body: 'success',
    };
  },
};
