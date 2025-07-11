import * as fs from 'fs';
import { Logger } from '@nestjs/common';

const Log = new Logger();

export const readLocalFile = (path: string, transform?: boolean) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    Log.log('File read successfully');

    if (transform) return JSON.parse(data);
    return data;
  } catch (err) {
    Log.error('Error reading file:', err);
  }
};
