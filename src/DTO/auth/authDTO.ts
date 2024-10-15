import {
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsEmail,
} from "class-validator";
import { RoleDto } from "../role-dto/role-dto";

export class RegisterUserDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  secondName?: string;

  @IsOptional()
  @IsString()
  firstLastName?: string;

  @IsOptional()
  @IsString()
  secondLastName?: string;

  @IsOptional()
  @IsString()
  identity?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsNumber()
  roleId?: number;
  @IsOptional()
  role: RoleDto;
  @IsOptional()
  @IsString()
  tutorCourses: string
  @IsOptional()
  @IsString()
  courseTeacher : string;
}
