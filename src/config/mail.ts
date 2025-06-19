import path from 'path';

export const mailConfig = {
  transport: {
    service: process.env.MAIL_TRANSPORT_SERVICE,
    host: process.env.MAIL_TRANSPORT_HOST || 'smtp.gmail.com',
    port: Number(process.env.MAIL_TRANSPORT_PORT || 587),
    user: process.env.MAIL_TRANSPORT_USER,
    pass: process.env.MAIL_TRANSPORT_PASSWORD,
    secure: process.env.MAIL_TRANSPORT_SECURE == 'true',
  },
  senderEmail: process.env.MAIL_SENDER_EMAIL || 'noreply@bamboosoft.io',
  templateDir: path.resolve(process.cwd(), 'data/mail-templates'),
};

export const mailTemplatePathConfig = {
  accountActivationPath: 'account-activation',
  forgotPasswordPath: 'forgot-password',
};
