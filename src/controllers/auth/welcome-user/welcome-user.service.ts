import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });
@Injectable()
export class WelcomeUserService {
  accountCreateHTML = (userName, userPassword) => {
    return `
        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 1.2rem; color: #333;">
          <h4 style="text-align: center;">Bienvenido A GradePro</h4>
          <p>Se ha creado una cuenta para usted en el sistema GradePro.</p>
          <p>Sus credenciales de acceso son las siguientes:</p>
          <ul>
            <li>Usuario: ${userName}</li>
            <li>Contraseña: ${userPassword}</li>
          </ul>
          <p>Para ingresar al sistema, haga clic en el siguiente enlace:</p>
          <a href="${process.env.URL_FRONTEND}">Ingresar al sistema</a>
          <p>Por favor, recuerde que debe cambiar su contraseña al ingresar al sistema.</p>
        </div>
      `;
  };
}
