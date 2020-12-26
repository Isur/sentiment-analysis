import { ApiService } from "../Api/api.service";
import { GetSettingsResponseDto } from "../../../Common/ApiDto/settings.dto";

class SettingsService extends ApiService {
  async getSettings(): Promise<GetSettingsResponseDto> {
    return await this.requestService.get<GetSettingsResponseDto>("");
  }
}

export default new SettingsService("settings");
