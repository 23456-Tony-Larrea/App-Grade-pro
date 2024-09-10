import { Controller, Put, Param, Body } from '@nestjs/common';import { UpdatePasswordService } from 'src/controllers/auth/update-password/update-password.service';
import { ChangePasswordDTO } from 'src/DTO/update-password/change-passwordDTO';
import { UpdatePasswordDTO } from 'src/DTO/update-password/update-passwordDTO';

@Controller('update-password')
export class UpdatePasswordController {
  constructor(private readonly updatePasswordService: UpdatePasswordService) {}

  @Put(':id')
  async updatePasswordConfirm(
    @Param('id') id: number,
    @Body() updatePasswordDto: UpdatePasswordDTO,
  ): Promise<{ message: string }> {
    updatePasswordDto.id = id; // Asignar el id del parámetro al DTO
    return this.updatePasswordService.updatePasswordConfirm(updatePasswordDto);
  }
  @Put('forgot/:id')
  async forgotPasswordUpdate(
    @Param('id') id: number,
    @Body() forgotPasswordDto: ChangePasswordDTO,
  ): Promise<{ message: string }> {
    forgotPasswordDto.id = id;
    return this.updatePasswordService.changePasswordUpdate(forgotPasswordDto);
  }
}