interface Mail {
  from: string;
  to: string;
  subject: string;
  body: string;
}

interface MailSendResult {
  error?: string;
  body: string;
}

export interface Mailer {
  send: (mail: Mail) => Promise<MailSendResult>;
}
