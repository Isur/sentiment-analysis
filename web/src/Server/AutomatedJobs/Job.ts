import { Logger } from "@server/Utils";

export abstract class Job {
  public abstract name: string;
  protected abstract execute: () => void | Promise<void>;

  public Run = async () => {
    Logger.Log(`Start Job ${this.name}...`);
    await this.execute();
    Logger.Log(`Job ${this.name} finished.`);
  }
}
