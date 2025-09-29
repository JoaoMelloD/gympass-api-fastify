import { test, expect, describe } from "vitest";
import { RegisterUseCase } from "./register.js";
import { compare } from "bcryptjs";
import { inMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository.js";
import { UserAlreadyExistsError } from "./errors/user-already-exists.js";

//Testes Unitarios
describe("Register use case", () => {
  test("should be able to register", async () => {
    const usersRepository = new inMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.handle({
      name: "Fulano",
      email: "fulano@gmail.com",
      password: "123456",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  test("should hash user password upon registration", async () => {
    const usersRepository = new inMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.handle({
      name: "Fulano",
      email: "fulano@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  test("should not be able to register same email twice", async () => {
    const usersRepository = new inMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "joohndoe@example.com";

    await registerUseCase.handle({
      name: "Fulano",
      email,
      password: "123456",
    });

    expect(() =>
      registerUseCase.handle({
        name: "Fulano",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
