import fs from 'fs';
import path from 'path';

const supportedFormats = {
  '.json': (content) => JSON.parse(content),
  // В будущем можно добавить другие форматы
};

const parse = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const fileExtension = path.extname(absolutePath);

  if (!supportedFormats[fileExtension]) {
    throw new Error(`Unsupported file format: ${fileExtension}`);
  }

  return supportedFormats[fileExtension](fileContent);
};

export default parse;
