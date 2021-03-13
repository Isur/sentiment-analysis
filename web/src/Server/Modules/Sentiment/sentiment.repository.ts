import { Inject, Service } from "typedi";
import { Sentiment } from "@prisma/client";
import { Database } from "@server/Utils";
import { CreateSentiment } from "@server/Modules/Sentiment/interfaces";

@Service()
export class SentimentRepository {
  @Inject()
  private readonly _db: Database;

  public createSentiment = async (data: CreateSentiment): Promise<Sentiment> => {
    const sentiment = await this._db.client.sentiment.create({ data });
    return sentiment;
  }
}
