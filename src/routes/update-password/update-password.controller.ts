import {
  Controller,
  Put,
  Param,
  Body,
  BadRequestException,
} from "@nestjs/common";
import { UpdatePasswordService } from "src/controllers/auth/update-password/update-password.service";
import { ChangePasswordDTO } from "src/DTO/update-password/change-passwordDTO";
import { UpdatePasswordDTO } from "src/DTO/update-password/update-passwordDTO";

@Controller("update-password")
export class UpdatePasswordController {
  constructor(private readonly updatePasswordService: UpdatePasswordService) {}

  @Put(":id")
  async updatePasswordConfirm(
    @Param("id") id: string,
    @Body() updatePasswordDto: UpdatePasswordDTO
  ): Promise<{ message: string }> {
    const numericId = parseInt(id, 10);
    updatePasswordDto.id = numericId;
    return this.updatePasswordService.updatePasswordConfirm(updatePasswordDto);
  }
  @Put("forgot/:id")
  async forgotPasswordUpdate(
    @Param("id") id: string,
    @Body() forgotPasswordDto: ChangePasswordDTO
  ): Promise<{ message: string }> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException({
        message: "Invalid user ID",
        statusCode: 400,
      });
    }
    forgotPasswordDto.id = numericId;
    return this.updatePasswordService.changePasswordUpdate(forgotPasswordDto);
  }
}
