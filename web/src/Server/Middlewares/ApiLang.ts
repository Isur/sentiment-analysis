import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import NotFound from "../HttpErrors/NotFound";
import LanguageHelper from "../Utils/Language";
import { Middleware } from "./Middleware.interface";

class ApiLang implements Middleware {
  private readonly _langs: LanguageHelper;
  public constructor() {
    this._langs = Container.get(LanguageHelper);
  }

  public execute = (req: Request, res: Response, next: NextFunction) => {
    const [_, lang, ...url] = req.url.split("/");

    if(lang === "public") throw new NotFound();
    if(lang !== "api") {
      const possibleLangs = this._langs.getLangKeys();
      if(possibleLangs.includes(lang)) {
        req.lang = lang;
      } else {
        return res.redirect(`/en/${url.join("/")}`);
      }
    }
    next();
  }
}

export default new ApiLang().execute;
