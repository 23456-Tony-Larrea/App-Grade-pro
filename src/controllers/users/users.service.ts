import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterUserDTO } from 'src/DTO/auth/authDTO';

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

    // Filtrar el campo password manualmente
    return users.map(user => {
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
      return users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
}
async updateState(userId: number) {
    const user = await this.prisma.user.findFirst({
        where: {
            id:userId,
        },
    })
    if(!user){
        return { message: 'User not found' };
    }
    if(user.state){
        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                state: false,
            },
        });
        return { message: 'User disabled successfully' };
    }else{
        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                state: true,
            },
        });
        return { message: 'User enabled successfully' };
    }
}
//get by id with roles
async findByIdWithRoles(userId: number) {
    return this.prisma.user.findFirst({
        where:{
            id:userId
        },
        include:{
            role:true,
        },
});
}
//update all information with roles
async updateAll(userId: number, body: RegisterUserDTO) {
    const user = await this.prisma.user.findFirst({
        where: {
            id:userId,
        },
    })
    if(!user){
        return { message: 'User not found' };
    }
    user.name=body.name;
    user.email=body.email;
    user.identity=body.identity;
    user.dateOfBirth=body.dateOfBirth
    user.phone=body.phone;
    user.address=body.address;
    user.age=body.age;
    user.secondName=body.secondName;
    user.firstLastName=body.firstLastName;
    user.secondLastName=body.secondLastName;
    user.gender=body.gender;
    user.roleId=body.roleId;
    await this.prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            name: body.name,
            email: body.email,
            roleId: body.roleId,
        },
    });
    return { message: 'User updated successfully' };
}
}