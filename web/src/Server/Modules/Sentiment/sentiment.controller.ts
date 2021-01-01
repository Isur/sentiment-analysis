import { Request, Response } from "express";
import { body } from "express-validator";
import BaseController from "../BaseController";
import { ApiValidator } from "../../Middlewares";
import { SentimentRequestDto, SentimentResponseDto } from "../../../Common/ApiDto/sentiment.dto";
import { SentimentService } from "./sentiment.service.interface";
import Sentiment from "./sentiment.service";

class SentimentController extends BaseController {
  constructor(private readonly _sentimentService: SentimentService) {
    super();
    this._initRoutes();
  }

  _initRoutes = () => {
    this.router.post("/", ApiValidator([
      body("text").isString()
        .notEmpty(),
    ]), this.getSentiment);
  }

  getSentiment = async (req: Request<{}, {}, SentimentRequestDto>, res: Response<SentimentResponseDto>) => {
    const sentiment = await this._sentimentService.getSentiment(req.body.text);
    res.json(sentiment);
  }
}

export default new SentimentController(
  Sentiment,
);
