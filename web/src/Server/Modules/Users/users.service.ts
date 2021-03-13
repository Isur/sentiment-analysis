import { User } from "@prisma/client";
import { Inject, Service } from "typedi";
import { BCrypt } from "../../Utils";
import { CreateUser } from "./interfaces/createUser.interface";
import { SearchUser } from "./interfaces/search.interface";
import UsersRepository from "./users.repository";
import { UserObject } from "@shared/Interfaces/user.interface";

@Service()
class UsersService {
  @Inject()
  private readonly _usersRepository: UsersRepository;

  @Inject()
  private readonly _brycpt: BCrypt;

  public createUser = async (userData: CreateUser): Promise<string> => {
    const hash = await this._brycpt.hashData(userData.password);
    const u = await this._usersRepository.createUser({
      ...userData, password: hash,
    });

    return u.id;
  }

  public findUser = async (search: SearchUser): Promise<UserObject> => {
    const user = await this._usersRepository.findUser(search);

    if(!user) return null;

    return this._userToUserObject(user);
  }

  public findUserWithPasswordByLogin = async (login: string): Promise<User> => {
    const user = await this._usersRepository.findToLogin(login);
    if(!user) return null;
    return user;
  }

  private _userToUserObject = (user: User): UserObject => {
    return {
      createdDate: user.createdDate,
      email: user.email,
      id: user.id,
      username: user.username,
      role: user.role,
      updateDate: user.updateDate,
    };
  }
}

export default UsersService;
