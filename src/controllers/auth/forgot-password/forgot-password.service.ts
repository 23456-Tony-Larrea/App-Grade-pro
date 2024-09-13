import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { transporter } from "../../../config-smtp/config-smtp";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class ForgotPasswordService {
  constructor(private readonly prisma: PrismaService) {}

  async forgotPassword(identity: string): Promise<{ message: string }> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { identity },
      });

      if (!user) {
        throw new NotFoundException("Usuario no encontrado");
      }

      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Restablecer contraseña",
        html: `
          <html>
            <head>
              <style>
                body { font-family: Roboto, Arial, sans-serif; }
                .container { display: flex; justify-content: center; align-items: center; height: 100vh; }
                .box { padding: 20px; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="box">
                  <h3>Restablecer contraseña</h3>
                  <p>Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                  <a href="${process.env.RESET_PASSWORD_URL}/${user.id}">Restablecer contraseña</a>
                  <p>Después de hacer clic en el enlace, ingresarás a restablecer tu contraseña.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
      console.log("Message sent: %s", info.messageId);
      return { message: "Se envió un mensaje a tu correo electrónico" };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
