// server.ts
import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import { initRoutes } from "../routes/user";

const init = async () => {
  const server = new Server({
    port: 8000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request: Request, h: ResponseToolkit) => {
      return h
        .response({ message: "Home route", method: request.method })
        .code(200);
    },
  });
  // API route
  server.route({
    method: "GET",
    path: "/api",
    handler: (request: Request, h: ResponseToolkit) => {
      const clientIP = request.info.remoteAddress;
      return h.response({ message: "API route", IP: clientIP }).code(200);
    },
  });
  // register user route
  await initRoutes(server);

  // Register more routes

  // starting  server ....
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
