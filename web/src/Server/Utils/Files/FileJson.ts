import fs from "fs";

export default class FileJson {
  public static read = <T>(path: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { encoding: "utf-8" }, (error, data) => {
        if(error) reject(error.message);
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      });
    });
  }

  public static save = (path: string, content: unknown): Promise<void> => {
    return new Promise((resolve, reject) => {
      const stringifiedData = JSON.stringify(content);
      fs.writeFile(path, stringifiedData, { encoding: "utf-8" }, error => {
        if(error) reject(error);
        resolve(null);
      });
    });
  }
}
