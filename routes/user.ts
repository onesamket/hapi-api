import { Server } from "@hapi/hapi";
import userController from "../controllers/user";
// users router
export const initRoutes = async (server: Server) => {
  server.route({
    method: "GET",
    path: "/users",
    handler: userController.getAllUsers,
  });

  server.route({
    method: "GET",
    path: "/users/{id}",
    handler: userController.getUserById,
  });

  server.route({
    method: "POST",
    path: "/users",
    handler: userController.createUser,
  });

  server.route({
    method: "PUT",
    path: "/users/{id}",
    handler: userController.updateUser,
  });

  server.route({
    method: "DELETE",
    path: "/users/{id}",
    handler: userController.deleteUser,
  });
};
