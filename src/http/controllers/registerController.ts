import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterUseCase } from "@/use-cases/register.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists.js";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository(); // Agora, para trocar de banco, bastaria trocar essa classe de repository para outra.
    const registerUseCase = new RegisterUseCase(usersRepository);
    await registerUseCase.handle({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      reply.status(409).send({
        message: error.message,
      });
    }
    
    throw error
  }

  return reply.status(201).send();
}
