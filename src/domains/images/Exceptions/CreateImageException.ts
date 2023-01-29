import BaseException from '../../../core/exceptions/BaseException';

export default class CreateImageException extends BaseException {
  constructor(message: string) {
    super(message, 400);
  }
}
