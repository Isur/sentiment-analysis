import { Service } from "typedi";
import { Job } from "./Job";

@Service()
export class CronJobs {
  private _jobs: Job[] = [];
}
