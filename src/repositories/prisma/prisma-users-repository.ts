import { prisma } from "@/lib/prisma.js";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository.js";

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
  //metodos que vão interceptar, portas para operações com o banco.
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
