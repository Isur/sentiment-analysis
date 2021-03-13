import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import BaseController from "@server/Modules/BaseController";
import { API } from "@shared/Constants";
import { ApiAuthentication, ApiValidator } from "@server/Middlewares";
import { SentimentAnalyzeRequestDto, SentimentAnalyzeResponseDto } from "@shared/ApiDto/sentiment.dto";
import { SentimentService } from "@server/Modules/Sentiment/sentiment.service";
import { sentimentValidation } from "@server/Modules/Sentiment/validations";

@Service()
export class SentimentController extends BaseController {
  public basePath = `/${API.SENTIMENT}`;

  @Inject()
  private readonly _sentimentService: SentimentService;

  public constructor() {
    super();
    this._initRoutes();
  }

  protected _initRoutes = () => {
    this.router.post("/", ApiAuthentication, ApiValidator(sentimentValidation), this._analyze);
  };

  private _analyze = async (req: Request<{}, {}, SentimentAnalyzeRequestDto>, res: Response<SentimentAnalyzeResponseDto>) => {
    const analyze = await this._sentimentService.analyze(req.body.text, req.session.userid);
    res.json({ ...analyze });
  }
}
