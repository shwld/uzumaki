import { Result, RuntimeError } from 'core-domain/src/shared';

interface Mail {
  from: string;
  to: string;
  subject: string;
  body: string;
}

export interface MailSendResult {
  body: string;
}

export interface Mailer {
  send: (mail: Mail) => Result<RuntimeError, MailSendResult>;
}
