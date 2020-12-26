import { genSalt, hash, compare } from "bcryptjs";
import { Crypto } from "./crypto.interface";

class BCrypt implements Crypto {
  private generateSalt = (rounds = 10): Promise<string> => {
    return new Promise((resolve, reject) => {
      return genSalt(rounds, (error, salt) => {
        if(error) reject(error);
        resolve(salt);
      });
    });
  }

  hashData = (data: string, rounds = 10): Promise<string> => {
    return new Promise((resolve, reject) => {
      this.generateSalt(rounds).then(salt => {
        return hash(data, salt, (error, hash) => {
          if(error) reject(error);
          resolve(hash);
        });
      });
    });
  }

  compareHash = (data: string, hash: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      return compare(data, hash, (error, response) => {
        if(error) reject(error);
        resolve(response);
      });
    });
  }
}

export default new BCrypt();
