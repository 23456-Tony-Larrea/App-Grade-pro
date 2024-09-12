export class AuthService {}
import { Injectable ,ConflictException, NotFoundException, UnauthorizedException, BadRequestException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterUserDTO } from 'src/DTO/auth/authDTO';
import { DesactivateUsersService } from './desactivate-users/desactivate-users.service';
import { WelcomeUserService } from './welcome-user/welcome-user.service';
import * as moment from 'moment';
import { DesactivateUserFalseService } from './desactivate-user-false/desactivate-user-false.service';

@Injectable()
export class LoginRegisterService {
  constructor(private prisma: PrismaService ,private readonly emailService: DesactivateUsersService,private readonly welcomeUser:WelcomeUserService, private readonly emailStateFalse:DesactivateUserFalseService) {}
  
  async register(data: RegisterUserDTO) {
    const existingUserByEmail = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUserByEmail) {
      throw new ConflictException('El correo electrónico ya está registrado.');
    }

    const existingUserByIdentity = await this.prisma.user.findUnique({
      where: {
        identity: data.identity,
      },
    });

    if (existingUserByIdentity) {
      throw new ConflictException('La identidad ya está registrada.');
    }

    const existingUserByPhone = await this.prisma.user.findUnique({
      where: {
        phone: data.phone,
      },
    });

    if (existingUserByPhone) {
      throw new ConflictException('El teléfono ya está registrado.');
    }

    // Generate a random password
    const randomPassword = Math.floor(Math.random() * 90000) + 10000;

    // Hash the password
    const hashedPassword = await bcrypt.hash(randomPassword.toString(), 10);

    // Ensure the date of birth is in ISO-8601 format
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

    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, roleId: newUser.roleId, identity: newUser.identity },
      'secretkey', // Pass the secret as a string
      { expiresIn: '24h' },
    );

    await this.prisma.user.update({
      where: { id: newUser.id },
      data: {
        token,
        token_type: 'Bearer',
      },
    });

    if (data.roleId !== 3) {
      const htmlContent = this.welcomeUser.accountCreateHTML(newUser.name, randomPassword);
      await this.emailService.sendEmail(newUser.email, 'Bienvenido a GradePro', htmlContent);
    }

    return {
      token,
      tokenType: 'Bearer',
      message: 'Usuario creado con exito',
    };
  }
  
  async login(data: RegisterUserDTO) {
    const { identity, password } = data;
  
    if (!identity) {
      throw new BadRequestException('La cédula es requerida.');
    }
    
    if (!password) {
      throw new BadRequestException('La contraseña es requerida.');
    }
  
    const user = await this.prisma.user.findUnique({
      where: { identity },
    });
  
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }
  
    if (!user.state) {
      const htmlContent = this.emailStateFalse.emailDesactivate(user.name, user.email);
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
      throw new UnauthorizedException('Tu cuenta ha sido desactivada. por intentos fallidos.');
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
      throw new NotFoundException('Rol no encontrado');
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