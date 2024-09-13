import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDTO {
  @ApiProperty({ example: 'Read' })
  name: string;
}