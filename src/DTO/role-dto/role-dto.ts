import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  id?: number;
  name?: string;
  state?: boolean;
}