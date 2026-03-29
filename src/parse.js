import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const supportedFormats = {
  '.json': (content) => JSON.parse(content),
  '.yml': (content) => yaml.load(content),
  '.yaml': (content) => yaml.load(content)
};

const parse = (filePath) => {
  if (typeof filePath !== 'string') {
    throw new Error(`File path must be a string, got ${typeof filePath}`);
  }

  const absolutePath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const fileExtension = path.extname(absolutePath).toLowerCase();

  if (!supportedFormats[fileExtension]) {
    throw new Error(`Unsupported file format: ${fileExtension}`);
  }

  try {
    return supportedFormats[fileExtension](fileContent);
  } catch (error) {
    throw new Error(`Error parsing ${filePath}: ${error.message}`);
  }
};

export default parse;
