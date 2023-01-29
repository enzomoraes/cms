import BaseException from '../../../core/exceptions/BaseException';

export default class CreatePostException extends BaseException {
  constructor(message: string) {
    super(message, 400);
  }
}
