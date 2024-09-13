import { Body, Controller, Post } from "@nestjs/common";
import { ForgotPasswordService } from "src/controllers/auth/forgot-password/forgot-password.service";
import { ForgotPassUserDto } from "src/DTO/forgot-password/forgot-pass-userDTO";

@Controller("forgot-password")
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post()
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPassUserDto
  ): Promise<{ message: string }> {
    const { identity } = forgotPasswordDto;
    return this.forgotPasswordService.forgotPassword(identity);
  }
}
