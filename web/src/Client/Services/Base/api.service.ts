import { RequestService } from "./request.interface";
import { Request } from "./request.service";

export abstract class ApiService {
  protected requestService: RequestService;

  public constructor(basePath: string) {
    this.requestService = new Request(basePath);
  }
}
