import path from 'path';
import { uploadsFolder } from '../../../../utils/_constants';

export default class ServeImageUseCase {
  execute(file: string): string {
    return path.join(uploadsFolder, file);
  }
}
