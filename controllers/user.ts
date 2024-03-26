import { Request, ResponseToolkit } from "@hapi/hapi";
import userModel from "../models/user";
import { userSchema } from "../schemas/user";

const getAllUsers = async (request: Request, h: ResponseToolkit) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const users = await userModel.getUsers(page);
    return h.view("user", { users: users }).code(200);
  } catch (error) {
    console.error("Error fetching users:", error);
    return h.response("Internal Server Error").code(500);
  }
};
const getUserById = async (request: Request, h: ResponseToolkit) => {
  const userId = request.params.id;
  const user = await userModel.getUserById(userId);
  if (!user) {
    return h.response({ message: "User not found" }).code(404);
  }
  return h.response(user).code(200);
};

export const createUser = async (request: Request, h: ResponseToolkit) => {
  try {
    const body = request.payload as { email: string; password: string };
    // apply zod ❤️ validation
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      return h
        .response({ message: "Bad request", error: validation.error.format() })
        .code(400);
    }

    const { email, password } = validation.data;
    await userModel.addUser({ email, password });
    return h.redirect("/users").code(301);
  } catch (error) {
    console.error("Error creating user:", error);
    return h
      .view("error-page", {
        message: "Internal server error",
        error: "Something wants wrong",
      })
      .code(500);
  }
};
const updateUser = async (request: Request, h: ResponseToolkit) => {
  const userId = request.params.id;
  const { email, password } = request.payload as {
    email?: string;
    password?: string;
  };
  await userModel.updateUser(userId, { email, password });
  return h.response({ message: "User updated successfully" }).code(200);
};

const deleteUser = async (request: Request, h: ResponseToolkit) => {
  const userId = request.params.id;
  await userModel.deleteUser(userId);
  return h.response({ message: "User deleted successfully" }).code(200);
};

const userController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
export default userController;
