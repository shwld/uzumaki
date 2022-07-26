interface Mail {
  from: string;
  to: string;
  subject: string;
  body: string;
}

interface MailSendResult {
  body: string;
}

export interface Mailer {
  send: (mail: Mail) => Promise<MailSendResult>;
}
