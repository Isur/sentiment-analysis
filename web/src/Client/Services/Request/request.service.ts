import axios from "axios";
import { Cookies } from "react-cookie";
import config from "../../config";
import { RequestService } from "./request.interface";

type methods = "GET" | "POST" | "PATCH" | "DELETE";

export class Request implements RequestService {
  basePath: string;
  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async request<Res, Req = null>(url: string, method: methods, data?: Req): Promise<Res> {
    let res: Res;
    const access_token = new Cookies().get("access_token");
    try {
      const response = await axios({
        method,
        url: `${this.basePath}/${url}`,
        baseURL: config.backend,
        data,
        headers: { access_token },
      });
      res = response.data;
    } catch(error) {
      console.error(error);
      if(error.message === "Network Error") {
        // TODO: Handle no internet connection.
      }
      throw {
        code: error.response.status,
        data: error.response.data,
        message: error.message,
      };
    }

    return res;
  }

  async get<Res>(url: string): Promise<Res> {
    return await this.request<Res>(url, "GET");
  }

  async post<Res, Req>(url: string, data: Req): Promise<Res> {
    return await this.request<Res, Req>(url, "POST", data);
  }

  async patch<Res, Req>(url: string, data: Req): Promise<Res> {
    return await this.request<Res, Req>(url, "PATCH", data);
  }

  async delete<Res>(url: string): Promise<Res> {
    return await this.request<Res>(url, "DELETE");
  }
}
