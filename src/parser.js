import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);

  try {
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return parseData(fileContent, filepath);
  } catch (error) {
    throw new Error(`Cannot read file: ${filepath}. Error: ${error.message}`);
  }
};

const parseData = (content, filepath) => {
  const extension = path.extname(filepath).toLowerCase();

  switch (extension) {
    case '.json':
      try {
        return JSON.parse(content);
      } catch (error) {
        throw new Error(`Invalid JSON in file: ${filepath}. Error: ${error.message}`);
      }
    default:
      throw new Error(`Unsupported file format: ${extension} for file: ${filepath}`);
  }
};

export default readFile;
