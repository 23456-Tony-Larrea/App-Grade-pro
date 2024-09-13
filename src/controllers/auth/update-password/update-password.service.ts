import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { ChangePasswordDTO } from 'src/DTO/update-password/change-passwordDTO';
import { UpdatePasswordDTO } from 'src/DTO/update-password/update-passwordDTO';

@Injectable()
export class UpdatePasswordService {
  constructor(private readonly prisma: PrismaService) {}

  async updatePasswordConfirm(updatePasswordDto: UpdatePasswordDTO): Promise<{ message: string }> {
    const { id, actuallyPassword, newPassword } = updatePasswordDto;
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      // Verificar que la contraseña actual sea correcta
      const isPasswordCorrect = await bcrypt.compare(actuallyPassword, user.password);
      if (!isPasswordCorrect) {
        throw new BadRequestException('La contraseña actual es incorrecta');
      }

      // Encriptar la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar la contraseña del usuario
      await this.prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
      });

      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Ocurrió un error al actualizar la contraseña');
    }
  }
  
  async changePasswordUpdate(changePasswordDto: ChangePasswordDTO): Promise<{ message: string }> {
    const { id, newPassword, confirmPassword } = changePasswordDto;
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException({ message: 'Usuario no encontrado', statusCode: 404 });
      }

      // Verificar que las nuevas contraseñas coincidan
      if (newPassword !== confirmPassword) {
        throw new BadRequestException({ message: 'Las contraseñas no coinciden', statusCode: 400 });
      }

      // Encriptar la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar la contraseña del usuario
      await this.prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
      });

      return { message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      console.error(error);
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({ message: 'Ocurrió un error al actualizar la contraseña', statusCode: 500 });
    }
  }
}