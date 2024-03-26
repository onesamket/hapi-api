import {
  Request,
  ResponseToolkit,
  Server,
  type ServerApplicationState,
} from "@hapi/hapi";
import inert from "@hapi/inert";
import vision from "@hapi/vision";
import { initRoutes } from "./routes/user";
import path from "path";

const init = async () => {
  const server = new Server<ServerApplicationState>({
    port: 8000,
    host: "localhost",
    routes: {
      files: {
        relativeTo: path.join(__dirname, "public"),
      },
    },
  });
  await server.register([inert, vision]);
  server.views({
    engines: {
      hbs: require("handlebars"),
    },
    path: path.join(__dirname, "views"),
    layout: "layout",
  });

  // Routes
  server.route({
    method: "GET",
    path: "/",
    handler: (request: Request, h: ResponseToolkit) => {
      return h.view("index");
    },
  });
  // API route
  server.route({
    method: "GET",
    path: "/api",
    handler: (request: Request, h: ResponseToolkit) => {
      return h.view("index", { title: "It works fine", name: "Onesmaket" });
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
