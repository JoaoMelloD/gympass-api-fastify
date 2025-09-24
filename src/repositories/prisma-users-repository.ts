import { prisma } from "@/lib/prisma.js";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository {
  //metodos que vão interceptar, portas para operações com o banco.
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
