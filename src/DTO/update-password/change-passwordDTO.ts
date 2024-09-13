import { IsNumber, IsString } from "class-validator";

export class ChangePasswordDTO {
  @IsNumber()
  id?: number;

  @IsString()
  newPassword: string;

  @IsString()
  confirmPassword: string;
}
