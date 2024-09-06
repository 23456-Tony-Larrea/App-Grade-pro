export class AuthService {}
import { Injectable ,ConflictException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterUserDTO } from 'src/DTO/auth/auth';

@Injectable()
export class LoginRegisterService {
  constructor(private prisma: PrismaService) {}
  async register(data: RegisterUserDTO) {

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name: data.name,
        secondName: data.secondName,
        firstLastName: data.firstLastName,
        secondLastName: data.secondLastName,
        identity: data.identity,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        phone: data.phone,
        address: data.address,
        age: data.age,
        email: data.email,
        password: hashedPassword,
        roleId: data.roleId,
      },
    });

    return newUser;
  }
  
  async login(data:RegisterUserDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new ConflictException('El correo electrónico no está registrado.');
    }

    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) {
      throw new ConflictException('La contraseña no es correcta.');
    }

    const token = jwt.sign({ userId: user.id }, 'tu_secreto_secreto', { expiresIn: '1h' });

    return {
      message: 'Usuario logueado exitosamente',
      token: token,
    };
  }
}