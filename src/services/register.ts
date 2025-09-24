import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma.js";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

//aplicando inversão de dependências com solid
export class RegisterUseCase {
  private usersRepository: any;

  constructor(usersRepository: any) {
    this.usersRepository = usersRepository;
  }

  async handle({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithEmail) {
      throw new Error("E-mail Already exists");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
