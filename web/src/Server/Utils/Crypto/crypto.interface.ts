export interface Crypto {
  hashData: (data: string, rounds?: number) => Promise<string>,
  compareHash: (data: string, hash: string) => Promise<boolean>,
}
