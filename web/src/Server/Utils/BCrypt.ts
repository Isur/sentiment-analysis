import { genSalt, hash, compare } from "bcryptjs";
import { Service } from "typedi";

@Service()
class BCrypt {
  private _generateSalt = (rounds = 10): Promise<string> => {
    return new Promise((resolve, reject) => {
      return genSalt(rounds, (error, salt) => {
        if(error) reject(error);
        resolve(salt);
      });
    });
  }

  public hashData = (data: string, rounds = 10): Promise<string> => {
    return new Promise((resolve, reject) => {
      this._generateSalt(rounds).then(salt => {
        return hash(data, salt, (error, hash) => {
          if(error) reject(error);
          resolve(hash);
        });
      });
    });
  }

  public compareHash = (data: string, hash: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      return compare(data, hash, (error, response) => {
        if(error) reject(error);
        resolve(response);
      });
    });
  }
}

export default BCrypt;
