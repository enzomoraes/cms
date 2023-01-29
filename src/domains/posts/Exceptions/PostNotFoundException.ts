import BaseException from '../../../core/exceptions/BaseException';

export default class PostNotFoundException extends BaseException {
  constructor(message: string) {
    super(message, 404);
  }
}
