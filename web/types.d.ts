/* eslint-disable @typescript-eslint/interface-name-prefix*/
declare namespace Express {
  export interface Request {
    session: {
      id: string,
      userid: string,
    },
  }

  export interface Response {

  }
}
