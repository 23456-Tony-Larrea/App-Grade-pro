import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as nodemailer from 'nodemailer';

// Configurar dotenv
dotenv.config({ path: path.join(__dirname, '../.env') });

@Injectable()
export class ConfigSmtp {
   static transporter = nodemailer.createTransport({
        host: process.env.HOST_GMAIL,
        port: 465,
        secure: true,
        family: 4,
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
}

export const transporter = ConfigSmtp.transporter;