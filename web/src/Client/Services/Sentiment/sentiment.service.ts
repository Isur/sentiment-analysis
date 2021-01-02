import { ApiService } from "../Api/api.service";
import { SentimentRequestDto, SentimentResponseDto } from "../../../Common/ApiDto/sentiment.dto";

class SentimentService extends ApiService {
  getSentiment = async (data: SentimentRequestDto): Promise<SentimentResponseDto> => {
    return await this.requestService.post<SentimentResponseDto, SentimentRequestDto>("/", data);
  }
}

export default new SentimentService("sentiment");
