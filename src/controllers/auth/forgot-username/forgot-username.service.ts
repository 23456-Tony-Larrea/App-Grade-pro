import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { transporter } from 'src/config-smtp/config-smtp';

@Injectable()
export class ForgotUsernameService {
    constructor(
        private readonly prisma: PrismaService,
      ) {}
      async forgotUsername(identity: string): Promise<{ message: string }> {
        try{
            const user = await this.prisma.user.findUnique({
                where: { identity },
              });
        
              if (!user) {
                throw new NotFoundException('Usuario no encontrado');
              }
        
              const info = await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Recuperar nombre de usuario',
                html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Roboto, Arial, sans-serif;
                            }
                            .container {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 20vh;
                            }
                            .box {
                                padding: 20px;
                                border: 1px solid #ccc;
                                border-radius: 5px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="box">
                                <h3>Recuperar nombre de usuario</h3>
                                <p>Tu nombre de usuario es: ${user.name}</p>
                            </div>
                        </div>
                    </body>
                </html>
           `
              });        
              console.log('Message sent: %s', info.messageId);
              return { message: 'Se envió un mensaje a tu correo electrónico' };              
            } catch (error) {
              console.error(error);
              throw new InternalServerErrorException('Ocurrió un error al enviar el correo electrónico');
            }
    }
}
