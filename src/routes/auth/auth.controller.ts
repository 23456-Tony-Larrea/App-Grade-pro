import { Controller, Post, Body } from '@nestjs/common';
import { LoginRegisterService } from '../../controllers/auth/auth.service';
import { RegisterUserDTO } from 'src/DTO/auth/authDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginRegisterService: LoginRegisterService) {}

  @Post('register')
  async register(@Body() data: RegisterUserDTO) {
    return this.loginRegisterService.register(data);
  }

  @Post('login')
  async login(@Body() data: RegisterUserDTO) {
    return this.loginRegisterService.login(data);
  }
}