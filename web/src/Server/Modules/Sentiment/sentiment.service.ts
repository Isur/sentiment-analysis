import { Inject, Service } from "typedi";
import { SentimentClient } from "@server/Clients";
import { SentimentObject } from "@shared/Interfaces/sentiment.interface";
import { SentimentRepository } from "@server/Modules/Sentiment/sentiment.repository";

@Service()
export class SentimentService {
  @Inject()
  private readonly _sentimentClient: SentimentClient;

  @Inject()
  private readonly  _sentimentRepository: SentimentRepository;

  public analyze = async (text: string, userId: string): Promise<SentimentObject> => {
    const sentiment = await this._sentimentClient.request({ text });
    await this._sentimentRepository.createSentiment({ ...sentiment, userId });
    return sentiment;
  }
}
