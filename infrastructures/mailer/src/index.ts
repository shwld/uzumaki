import ky from 'ky';
import FormData from 'form-data';
import type { Mailer as MailerType, MailSendResult } from 'domain-interfaces';
import { Result, RuntimeError, tryCatch } from 'core-domain/src/shared';

const API_KEY = process.env.MAILGUN_API_KEY as string;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN as string;

export const createMailer = (): MailerType => {
  const mailer: MailerType = {
    send(mail): Result<RuntimeError, MailSendResult> {
      const result = tryCatch(
        async () => {
          const data = new FormData();
          data.append('from', mail.from);
          data.append('to', mail.to);
          data.append('subject', mail.subject);
          data.append('html', mail.body);

          const response = await ky
            .post(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
              headers: {
                Authorization: `Basic ${Buffer.from(`api:${API_KEY}`).toString(
                  'base64'
                )}`,
              },
              // @ts-ignore FIXME: error TS2322: Type 'FormData' is not assignable to type 'BodyInit | null | undefined'.
              body: data,
            })
            .json();
          const result = JSON.stringify(response);

          return {
            body: result,
          };
        },
        () => {
          return new RuntimeError('Mail Sender Error');
        }
      );

      return result;
    },
  };

  return mailer;
};
