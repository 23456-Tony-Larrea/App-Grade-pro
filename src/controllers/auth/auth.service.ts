export class AuthService {}
import { Injectable ,ConflictException, NotFoundException, UnauthorizedException, BadRequestException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterUserDTO } from 'src/DTO/auth/auth';
import { DesactivateUsersService } from './desactivate-users/desactivate-users.service';
import * as moment from 'moment';

@Injectable()
export class LoginRegisterService {
  constructor(private prisma: PrismaService ,private readonly emailService: DesactivateUsersService) {}
  
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

    // Asegurarse de que la fecha esté en formato ISO-8601
    const formattedDateOfBirth = moment(data.dateOfBirth).toISOString();

    const newUser = await this.prisma.user.create({
      data: {
        name: data.name,
        secondName: data.secondName,
        firstLastName: data.firstLastName,
        secondLastName: data.secondLastName,
        identity: data.identity,
        dateOfBirth: formattedDateOfBirth,
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
  
  async login(data: RegisterUserDTO) {
    const { identity, password } = data;
  
    if (!identity) {
      throw new BadRequestException('Identity is required.');
    }
  
    const user = await this.prisma.user.findUnique({
      where: { identity },
    });
  
    if (!user) {
      throw new NotFoundException('User not found.');
    }
  
    if (!user.state) {
      const htmlContent = this.emailService.accountDeactivatedHTML(user.name, user.email);
      await this.emailService.sendEmail(user.email, 'Cuenta desactivada', htmlContent);
      throw new UnauthorizedException('Tu cuenta está desactivada. Por favor, contáctate con el administrador.');
    }
  
    if (user.failed_login_attempts >= 3) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { failed_login_attempts: 0, state: false },
      });
      const htmlContent = this.emailService.accountDeactivatedHTML(user.name, user.email);
      await this.emailService.sendEmail(user.email, 'Cuenta desactivada', htmlContent);
      throw new UnauthorizedException('Tu cuenta ha sido desactivada. Se ha enviado un correo electrónico para restablecerla.');
    }
  
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { failed_login_attempts: user.failed_login_attempts + 1 },
      });
      throw new UnauthorizedException('Contraseña inválida.');
    }
  
    await this.prisma.user.update({
      where: { id: user.id },
      data: { failed_login_attempts: 0 },
    });
  
    const role = await this.prisma.role.findUnique({
      where: { id: user.roleId },
    });
  
    if (!role) {
      throw new NotFoundException('Role not found');
    }
  
    if (user.roleId === 3) {
      throw new UnauthorizedException('Eres rol paciente, no se te ha asignado ningún perfil.');
    }
  
    const token = jwt.sign(
      { id: user.id, name: user.name, nameRole: role.name, role_id: role.id, state: user.state },
      'secretkey',
      { expiresIn: '24h' }
    );
  
    await this.prisma.user.update({
      where: { id: user.id },
      data: { token, token_type: 'Bearer' },
    });
  
    return {
      id: user.id,
      name: user.name,
      role: role.name,
      token,
    };
  }
}