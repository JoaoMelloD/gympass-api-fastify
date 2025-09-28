import { Prisma, User } from "@prisma/client";

//Observação, sempre retornamos uma promisse pois é algo que pode demorar por ser uma busca no banco de dados.
export interface UsersRepository {
  //Receberá um email e irá retornar um usuario ou não caso não encontre.  
  findByEmail(email: string): Promise<User | null>;
  //Vai esperar um data do tipo usercreate, e vai devolver uma promisse com um usuario
  create(data: Prisma.UserCreateInput): Promise<User>;
}
