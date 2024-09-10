import { Body, Controller, Post } from '@nestjs/common';
import { ForgotUsernameService } from 'src/controllers/auth/forgot-username/forgot-username.service';
import { ForgotPassUserDto } from 'src/DTO/forgot-password/forgot-pass-userDTO';

@Controller('forgot-username')
export class ForgotUsernameController {
    constructor(private readonly forgotUsernameService: ForgotUsernameService) {}

    @Post()
    async forgotUsername(@Body() forgotPasswordDto: ForgotPassUserDto): Promise<{ message: string }> {
        const { identity } = forgotPasswordDto;
        return this.forgotUsernameService.forgotUsername(identity);
    }
}
