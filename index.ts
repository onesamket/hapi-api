import {
  Request,
  ResponseToolkit,
  Server,
  ServerApplicationState,
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
    path: path.join(__dirname, "views", "pages"),
    layoutPath: path.join(__dirname, "views"),
    layout: "default",
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
      return h.view("index", {
        title: "It works fine",
        name: "Onesmaket",
      });
    },
  });

  // Register user routes
  await initRoutes(server);

  // Start server
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
