import BaseException from '../../../core/exceptions/BaseException';

export default class MusicNotFoundException extends BaseException {
  constructor(message: string) {
    super(message, 404);
  }
}
