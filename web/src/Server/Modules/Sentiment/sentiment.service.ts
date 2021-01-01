import axios from "axios";
import { SentimentObject } from "../../../Common/Interfaces/sentiment.interface";
import { AppConfig, Config } from "../../Config";
import { SentimentService } from "./sentiment.service.interface";

class Sentiment implements SentimentService {
  constructor(private readonly _config: Config) {}
  getSentiment = async (text: string) => {
    const result = await axios.post<SentimentObject>(`${this._config.containers.sentiment}/sentiment`, { text });
    return result.data;
  }
}

export default new Sentiment(
  AppConfig,
);
