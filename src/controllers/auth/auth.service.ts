@Injectable()
export class AuthService {}
import { Injectable ,ConflictException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class LoginRegisterService {
  constructor(private prisma: PrismaService) {}

  async register(data: { email: string, password: string, name: string, roleId: number }) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado.');
    }

    // 1. Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            name: data.name,
            firstLastName: data.,
            secondLastName: data.secondLastName,
            identity: data.identity,
            secondName: data.secondName, // Opcional
            role: {
              connect: {
                id: data.roleId,
              },
            },
          token: '', // Agrega esta propiedad si es requerida por el modelo
          token_type: '', // Agrega esta propiedad si es requerida por el modelo
        },
      });
    // 3. Generar un token JWT
    const token = jwt.sign({ userId: user.id }, 'tu_secreto_secreto', { expiresIn: '1h' });

    return {
      message: 'Usuario registrado exitosamente',
      token: token,
    };
  }
  //login
  async login(data: { email: string, password: string }) {
    // 1. Verificar que el usuario exista
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new ConflictException('El correo electrónico no está registrado.');
    }

    // 2. Verificar que la contraseña sea correcta
    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) {
      throw new ConflictException('La contraseña no es correcta.');
    }

    // 3. Generar un token JWT
    const token = jwt.sign({ userId: user.id }, 'tu_secreto_secreto', { expiresIn: '1h' });

    return {
      message: 'Usuario logueado exitosamente',
      token: token,
    };
  }
}