import { Service } from "typedi";
import "@root/locales/en.json"; // For development to hot reload on language chagnes, TODO: fix this in future to handle all lang files
import { FOLDERS } from "../Constants";
import DirHelper from "./Files/DirHelper";
import { Language } from "@shared/Interfaces/Language.interface";

@Service()
export default class LanguageHelper {
  private _language: {
    [key: string]: Language,
  }

  public constructor() {
    this._language = { };
    this._languageLoader();
  }

  private _languageLoader = async () => {
    const files = await DirHelper.GetFilenames(FOLDERS.LOCALES);
    for(let i = 0; i < files.length; i++) {
      const langName = files[i].split(".")[0];
      // eslint-disable-next-line
      const lang = require(`../../../locales/${langName}.json`);
      this._language[langName] = lang;
    }
  }

  public getLanguage = (language: string): Language => {
    return this._language[language] || this._language["en"];
  }

  public getLangKeys = (): string[] => {
    return Object.keys(this._language);
  }
}
