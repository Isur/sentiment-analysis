import Container, { Service } from "typedi";
import { Job } from "./Job";
import { OldSessionsJob } from "./StartJobs";
import { Logger } from "@server/Utils";

@Service()
export class StartJobs {
  private _jobs: Job[] = [
    Container.get(OldSessionsJob),
  ];

  public startJobs = async () => {
    Logger.Log("Start init jobs...");

    for(const job of this._jobs) {
      await job.Run();
    }

    Logger.Log("Init jobs finished.");
  };
}
