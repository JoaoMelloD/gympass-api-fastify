import { FastifyInstance } from "fastify";
import { register } from "./controllers/registerController.js";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
}
