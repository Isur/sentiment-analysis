/* eslint-disable no-console */
class Logger {
  public static Log(data: unknown, depth = false) {
    if(depth) {
      console.dir(data, { depth: null });
    } else {
      console.log(data);
    }
  }

  public static Error(data: unknown) {
    console.error(data);
  }
}
/* eslint-enable no-console */
export default Logger;
