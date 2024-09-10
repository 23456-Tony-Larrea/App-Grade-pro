import { IsNumber, IsString } from "class-validator";

export class UpdatePasswordDTO {
    @IsNumber()
    id?: number;
  
    @IsString()
    actuallyPassword: string;
  
    @IsString()
    newPassword: string;    
}
