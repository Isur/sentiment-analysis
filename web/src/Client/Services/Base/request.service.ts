import axios from "axios";
import { Cookies } from "react-cookie";
import { RequestService } from "./request.interface";
import config from "@client/config";

type methods = "GET" | "POST" | "PATCH" | "DELETE";

export class Request implements RequestService {
  private _basePath: string;
  public constructor(basePath: string) {
    this._basePath = basePath;
  }

  public async request<Res, Req = null>(url: string, method: methods, data?: Req): Promise<Res> {
    let res: Res;
    const access_token = new Cookies().get("access_token");
    try {
      const response = await axios({
        method,
        url: `${this._basePath}/${url}`,
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

  public async get<Res>(url: string): Promise<Res> {
    return await this.request<Res>(url, "GET");
  }

  public async post<Res, Req>(url: string, data: Req): Promise<Res> {
    return await this.request<Res, Req>(url, "POST", data);
  }

  public async patch<Res, Req>(url: string, data: Req): Promise<Res> {
    return await this.request<Res, Req>(url, "PATCH", data);
  }

  public async delete<Res>(url: string): Promise<Res> {
    return await this.request<Res>(url, "DELETE");
  }
}
