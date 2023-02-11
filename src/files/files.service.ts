import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  createFile(file: Express.Multer.File): string {
    const filename = uuid.v4() + '.jpg';
    const filePath = path.resolve(__dirname, '..', 'static');

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    fs.writeFileSync(path.join(filePath, filename), file.buffer);

    return filename;
  }
}
