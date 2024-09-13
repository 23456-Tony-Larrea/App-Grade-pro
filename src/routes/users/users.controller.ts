import { Body, Controller, Get, Param, Put, Res } from "@nestjs/common";
import { UsersService } from "src/controllers/users/users.service";
import { Response } from "express";
import { RegisterUserDTO } from "src/DTO/auth/authDTO";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findWithJoin(@Res() res: Response): Promise<void> {
    try {
      const users: RegisterUserDTO[] = await this.usersService.findWithJoin();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  @Get("false")
  async findWithJoinFalse(@Res() res: Response): Promise<void> {
    try {
      const users: RegisterUserDTO[] =
        await this.usersService.findWithJoinFalse();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  @Put("state/:id")
  async updateState(
    @Param("id") id: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      const userId = Number(id);
      const message = await this.usersService.updateState(userId);
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  @Get(":id/roles")
  async findByIdWithRoles(
    @Param("id") id: string,
    @Res() res: Response
  ): Promise<void> {
    try {
      const userId = Number(id);
      const user = await this.usersService.findByIdWithRoles(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  @Put(":id")
  async updateAll(
    @Param("id") id: string,
    @Body() body: RegisterUserDTO,
    @Res() res: Response
  ): Promise<void> {
    try {
      const userId = Number(id);
      const user = await this.usersService.updateAll(userId, body);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
