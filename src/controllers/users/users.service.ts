import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { RegisterUserDTO } from "src/DTO/auth/authDTO";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findWithJoin(): Promise<RegisterUserDTO[]> {
    const users = await this.prisma.user.findMany({
      include: {
        role: true,
      },
      where: {
        state: true,
      },
    });

    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
  async findTeachers(): Promise<RegisterUserDTO[]> {
    const users = await this.prisma.user.findMany({
      include: {
        role: true,
      },
      where: {
        state: true,
        role: {
          name: 'profesor',
        },
      },
    });

    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
  async findWithJoinFalse() {
    const users = await this.prisma.user.findMany({
      include: {
        role: true,
      },
      where: {
        state: false,
      },
    });

    // Filtrar el campo password manualmente
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
  async updateState(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return { message: "User not found" };
    }
    if (user.state) {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          state: false,
        },
      });
      return { message: "User disabled successfully" };
    } else {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          state: true,
        },
      });
      return { message: "User enabled successfully" };
    }
  }
  //get by id with roles
  async findByIdWithRoles(userId: number) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        role: true,
      },
    });
  }
  //update all information with roles
  async updateAll(userId: number, body: RegisterUserDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { message: "User not found" };
    }

    const existingUserWithIdentity = await this.prisma.user.findFirst({
      where: {
        identity: body.identity,
        NOT: {
          id: userId,
        },
      },
    });

    if (existingUserWithIdentity) {
      return { message: "Identity already in use" };
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: body.name,
        email: body.email,
        roleId: body.roleId,
        identity: body.identity,
        dateOfBirth: body.dateOfBirth,
        phone: body.phone,
        address: body.address,
        age: body.age,
        secondName: body.secondName,
        firstLastName: body.firstLastName,
        secondLastName: body.secondLastName,
        gender: body.gender,
      },
    });

    return { message: "User updated successfully" };
  }    

}
