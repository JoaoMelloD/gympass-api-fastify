import { hash } from "bcryptjs";
import { UsersRepository } from "@/repositories/users-repository.js";
import { UserAlreadyExistsError } from "./errors/user-already-exists.js";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

//aplicando inversão de dependências com solid
export class RegisterUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async handle({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithEmail = await this.usersRepository.findByEmail(email);

    if (userWithEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
    return {
      user,
    };
  }
}
