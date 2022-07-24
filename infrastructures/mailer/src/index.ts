import type { Mailer as MailerType } from 'graphql-resolvers';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

export const createMailer = (apiKey: string, domain: string): MailerType => {
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: 'api',
    key: apiKey,
    url: 'https://api.eu.mailgun.net',
  });
  const mailer: MailerType = {
    async send(mail) {
      const data = {
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        html: mail.body,
      };
      try {
        const result = await mg.messages.create(domain, data);

        return {
          body: result.message ?? '',
        };
      } catch (e: any) {
        return { body: '', error: e.toString() };
      }
    },
  };

  return mailer;
};
