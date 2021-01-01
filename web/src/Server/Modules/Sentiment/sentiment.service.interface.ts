import { SentimentObject } from "../../../Common/Interfaces/sentiment.interface";

export interface SentimentService {
  getSentiment: (text: string) => Promise<SentimentObject>,
}
