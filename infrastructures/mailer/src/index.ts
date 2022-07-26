import ky from 'ky';
import FormData from 'form-data';
import type { Mailer as MailerType } from 'graphql-resolvers';

export const createMailer = (apiKey: string, domain: string): MailerType => {
  const mailer: MailerType = {
    async send(mail) {
      const data = new FormData();
      data.append('from', mail.from);
      data.append('to', mail.to);
      data.append('subject', mail.subject);
      data.append('html', mail.body);

      try {
        const response = await ky
          .post(`https://api.mailgun.net/v3/${domain}/messages`, {
            headers: {
              Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString(
                'base64'
              )}`,
            },
            body: data,
          })
          .json();
        const result = JSON.stringify(response);

        console.log('--------------------success', data, result);
        return {
          body: result,
        };
      } catch (e: any) {
        console.log('--------------------error', data, JSON.stringify(e));
        return { body: '', error: JSON.stringify(e) };
      }
    },
  };

  return mailer;
};
