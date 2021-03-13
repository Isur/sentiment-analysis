import { Language } from "@shared/Interfaces/Language.interface";

export {};

declare global {
  namespace Express {
    interface Request {
      session: {
        id: string,
        userid: string,
      },
      lang: string,
    }

    interface Response {

    }
  }
  const _lang: string;
  const _dict: Language;
  interface Window {
    _lang: string,
    _dict: Language,
  }

  namespace NodeJS {
    interface Global {
      _lang: string,
      _dict: Language,
    }
  }
}
