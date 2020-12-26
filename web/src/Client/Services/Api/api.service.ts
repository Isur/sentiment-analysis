import { RequestService } from "../Request/request.interface";
import { Request } from "../Request/request.service";

export class ApiService {
  requestService: RequestService;

  constructor(basePath: string) {
    this.requestService = new Request(basePath);
  }
}
