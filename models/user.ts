import { User } from "@prisma/client";
import { prisma } from "../lib/prisma";

/**
 * Retrieves a page of users with pagination.
 * @param page The page number to retrieve.
 * @param pageSize The number of users per page.
 * @returns A Promise resolving to an array of users.
 */
const getUsers = async (
  page: number,
  pageSize: number = 7
): Promise<User[]> => {
  // Adjust skip calculation to handle the first page correctly
  const skip = pageSize * (page - 1);

  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
  });
};

/**
 * Retrieves a user by ID.
 * @param id The ID of the user to retrieve.
 * @returns A Promise resolving to the user object if found, or null otherwise.
 */
const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

// Add JSDoc comments to other functions as needed

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
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};

export default userModel;
