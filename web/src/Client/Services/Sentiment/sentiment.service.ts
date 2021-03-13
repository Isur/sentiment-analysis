import { ApiService } from "../Base/api.service";
import { SentimentAnalyzeResponseDto, SentimentAnalyzeRequestDto } from "@shared/ApiDto/sentiment.dto";
import { API } from "@shared/Constants";

class SentimentService extends ApiService {
  public checkSentiment = async (data: SentimentAnalyzeRequestDto): Promise<SentimentAnalyzeResponseDto> => {
    return await this.requestService.post<SentimentAnalyzeResponseDto, SentimentAnalyzeRequestDto>("/", data);
  }
}

export default new SentimentService(API.SENTIMENT);
