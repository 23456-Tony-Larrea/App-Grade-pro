// permissions.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { PermissionsService } from "../../controllers/permission/permission.service";
import { CreatePermissionDTO } from "src/DTO/permissions/permissionsdto";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@ApiTags("permissions")
@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Post()
  @ApiBody({ type: CreatePermissionDTO })
  create(@Body() createPermissionDto: CreatePermissionDTO) {
    return this.permissionsService.create(createPermissionDto);
  }
}
