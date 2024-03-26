import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";

const AllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

const UserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const addUser = async (userData: {
  email: string;
  password: string;
}): Promise<User> => {
  return await prisma.user.create({
    data: userData,
  });
};

const updateUser = async (
  id: string,
  userData: { email?: string; password?: string }
): Promise<void> => {
  await prisma.user.update({
    where: { id },
    data: userData,
  });
};

const deleteUser = async (id: string): Promise<void> => {
  await prisma.user.delete({
    where: { id },
  });
};

const userModel = {
  addUser,
  AllUsers,
  UserById,
  deleteUser,
  updateUser,
};
export default userModel;
