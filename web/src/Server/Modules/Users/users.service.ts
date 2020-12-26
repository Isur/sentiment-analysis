import { PrismaClient } from "@prisma/client";
import { UserObject } from "../../../Common/Interfaces/user.interface";
import { BCrypt, Crypto, Database } from "../../Utils";
import { CreateUser } from "./interfaces/createUser.interface";
import { SearchUser } from "./interfaces/search.interface";
import { UsersService } from "./users.service.interface";

class Users implements UsersService {
  constructor(
    private readonly _db: PrismaClient,
    private readonly _brycpt: Crypto,
  ) { }

  createUser = async (userData: CreateUser): Promise<string> => {
    const hash = await this._brycpt.hashData(userData.password);
    const u = await this._db.user.create({
      data: {
        createdDate: new Date(Date.now()),
        email: userData.email,
        password: hash,
        username: userData.username,
      },
    });

    return u.id;
  }

  findUser = async (search: SearchUser): Promise<UserObject> => {
    const user = await this._db.user.findFirst({ where: { [search.field]: search.value } });

    if(!user) return null;

    return {
      createdDate: user.createdDate,
      email: user.email,
      id: user.id,
      username: user.username,
    };
  }
}

export default new Users(
  Database.client, BCrypt,
);
