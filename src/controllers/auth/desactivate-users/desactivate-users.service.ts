import { Injectable } from '@nestjs/common';
import { transporter } from '../../../config-smtp/config-smtp';


@Injectable()
export class DesactivateUsersService {
    async sendEmail(to: string, subject: string, htmlContent: string): Promise<boolean> {
        try {
          const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlContent,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
            },
          });
    
          console.log('Correo electrónico enviado: %s', info.messageId);
          return true; // Envío exitoso
        } catch (error) {
          console.error('Error al enviar el correo electrónico:', error);
          return false; // Error en el envío
        }
      }
    
      accountDeactivatedHTML(userName: string, userEmail: string): string {
        return `
          <html>
            <body>
              <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
                <div style="background-color: #f9f9f9; padding: 15px;">
                  <h3 style="color: #333;">Cuenta desactivada</h3>
                  <p>Estimado/a ${userName},</p>
                  <p>Tu cuenta (${userEmail}) ha sido desactivada debido a intentos fallidos de inicio de sesión.</p>
                  <p>Por favor, contáctate con el administrador para restablecer tu cuenta.</p>
                </div>
              </div>
            </body>
          </html>
        `;
      }
}
