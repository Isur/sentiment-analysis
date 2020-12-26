import { UserObject } from "../../../Common/Interfaces/user.interface";
import { CreateUser } from "./interfaces/createUser.interface";
import { SearchUser } from "./interfaces/search.interface";

export interface UsersService {
  createUser: (userData: CreateUser) => Promise<string>,
  findUser: (options: SearchUser) => Promise<UserObject>,
}
