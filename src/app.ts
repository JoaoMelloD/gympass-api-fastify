import fastify from "fastify";
import { appRoutes } from "./http/routes.js";
import { ZodError } from "zod";
import { env } from "./env/index.js";
export const app = fastify();

app.register(appRoutes);

//handler global para a tratativa de erros
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.format,
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }else {
    //TODO: Log para uma ferramenta futura de monitoramento.
  }
  return reply.status(500).send({
    message: "Internal server Error",
  });
});
