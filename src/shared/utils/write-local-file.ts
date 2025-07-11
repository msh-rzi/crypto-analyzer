import * as fs from 'fs';
import { Logger } from '@nestjs/common';

const Log = new Logger();

export const writeLocalFile = (path: string, data: string) => {
  try {
    fs.writeFileSync(path, data);
    Log.log('File write successfully');
  } catch (err) {
    Log.error('Error writing file:', err);
  }
};
