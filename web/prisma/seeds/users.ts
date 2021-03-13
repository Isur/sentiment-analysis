import bcrypt from "../../src/Server/Utils/BCrypt";

interface CreateUser {
  username: string,
  email: string,
  password: string,
  role: "ADMIN" | "MODERATOR" | "USER",
}

const hasher = new bcrypt();

export const getUsersSeed = async (): Promise<CreateUser[]> => {
  return [{
    username: "Admin",
    email: "admin@admin.admin",
    password: await hasher.hashData("admin"),
    role: "ADMIN",
  }, {
    username: "User",
    email: "user@user.user",
    password: await hasher.hashData("user"),
    role: "USER",
  },{
    username: "Moderator",
    email: "moderator@moderator.moderator",
    password: await hasher.hashData("moderator"),
    role: "MODERATOR",
  }]
}
