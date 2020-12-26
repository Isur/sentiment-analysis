import { LoginResponse } from "./interfaces/login.interface";
import { Register } from "./interfaces/register.interface";

export interface AuthService {
  login: (username: string, password: string) => Promise<LoginResponse>,
  register: (userData: Register) => Promise<string>,
  logout: (sessionId: string) => Promise<void>,
}
