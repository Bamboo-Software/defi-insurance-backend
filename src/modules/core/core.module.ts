/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MailService } from './services/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailConfig } from '../../config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CentrifugoApiService } from './services/centrifugo-api.service';

const services = [MailService, CentrifugoApiService];

@Global()
@Module({
  imports: [
    DatabaseModule,
    MailerModule.forRoot({
      transport: {
        service: mailConfig.transport.service,
        host: mailConfig.transport.host,
        port: mailConfig.transport.port,
        auth: {
          user: mailConfig.transport.user,
          pass: mailConfig.transport.pass,
        },
        secure: mailConfig.transport.secure,
        ignoreTLS: !mailConfig.transport.secure,
      },
      defaults: {
        from: mailConfig.senderEmail,
      },
      preview: false,
      template: {
        dir: mailConfig.templateDir,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: mailConfig.templateDir + '/partials',
          options: {
            strict: true,
          },
        },
      },
    }),
  ],
  controllers: [],
  providers: [...services],
  exports: [...services],
})
export class CoreModule {}
