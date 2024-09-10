import { Injectable } from '@nestjs/common';

@Injectable()
export class DesactivateUserFalseService {
    emailDesactivate(userName: string, userEmail: string): string {
        return `
         <html>
                    <head>
                        <style>
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="box">
                                <h3>Estimado/a ${userName},con el correo ${userEmail} Tu Cuenta ha sido desactivada</h3>
                                <p>Tu cuenta ha sido desactivada. Por favor, contacta con el administrador para restablecerla.</p>
                                <p>¡Gracias!</p>
                            </div>
                        </div>
                    </body>
                </html>
        `;
      }
}
