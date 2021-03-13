import fs from "fs";

export default class DirHelper {
  public static GetFilenames = (path: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      fs.readdir(path, { encoding: "utf-8" }, (error, files) => {
        if(error) reject(error);
        resolve(files);
      });
    });
  }
}
