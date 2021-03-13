import axios from "axios";
import { Inject, Service } from "typedi";
import { SentimentRequestDto, SentimentResponseDto } from "@server/Clients/Sentiment/interfaces";
import { Config } from "@server/Config";

@Service()
export class SentimentClient {
  @Inject()
  private readonly _config: Config;

  public request = async (data: SentimentRequestDto): Promise<SentimentResponseDto> => {
    const response = await axios.post<SentimentResponseDto>(`${this._config.apps.sentimentModule}/sentiment`, data);
    return response.data;
  }
}
