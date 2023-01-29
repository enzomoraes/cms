export default abstract class BaseException {
  constructor(private message: string, private status: number) {
    this.message = message;
    this.status = status;
  }
}
