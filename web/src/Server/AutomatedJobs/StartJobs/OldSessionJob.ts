import { Inject, Service } from "typedi";
import { Job } from "../Job";
import { SessionService } from "@server/Modules/Sessions";
import { TIME } from "@shared/Constants";
import { Logger } from "@server/Utils";

@Service()
export class OldSessionsJob extends Job {
  public name = "Old Sessions Remover";

  @Inject() private readonly _sessionService: SessionService;

  protected execute = async (): Promise<void> => {
    const deleted = await this._sessionService.deleteOldSessions(TIME.WEEK);
    Logger.Log(`Deleted ${deleted} of old sessions`);
  }
}
