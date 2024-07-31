// Import URL from the 'url' module
import { fileURLToPath } from 'url';

import globby from 'globby';

const fs = await import('fs');
const path = await import('path');


// Add the custom camelCase function here
const camelCase = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr.toUpperCase());
const generateTagNames = async () => {
  // Calculate currentDir based on the current module's URL
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const componentsSourceDirectory = path.resolve(currentDir, '../../core/src/components');
  console.log("Components Source Directory:", componentsSourceDirectory);  // Log the resolved path

  const files = fs.readdirSync(componentsSourceDirectory);  // Check directory contents
  console.log("Files found:", files);

  const componentFiles = await globby(`${componentsSourceDirectory}/**/*.tsx`);

  const tags = componentFiles
    .filter((file) => !file.includes('-utils'))  // Skip utility files
    .map((file) => {
      const fileContent = fs.readFileSync(file, 'utf8');
      const [, tag] = /tag: '([a-z-]*)'/.exec(fileContent) || [];
      return tag;
    })
    .filter((tag) => tag)  // Filter out undefined values
    .sort();

  const content = `export const TAG_NAMES = [${tags.map((x) => `'${x}'`).join(', ')}] as const;
export type TagName = typeof TAG_NAMES[number];

// TODO: replace with generic in TS4.1: https://stackoverflow.com/questions/57807009/typescript-generic-to-turn-underscore-object-to-camel-case
export type TagNameCamelCase = ${tags.map((x) => `'${camelCase(x)}'`).join(' | ')};

export const INTERNAL_TAG_NAMES: TagName[] = [];
`;

  const targetDirectory = path.normalize('./src/utils');
  fs.mkdirSync(path.resolve(targetDirectory), { recursive: true });

  const targetFileName = 'tagNames.ts';
  const targetFile = path.resolve(targetDirectory, targetFileName);
  fs.writeFileSync(targetFile, content);

  console.log(`Generated ${targetFileName} for ${tags.length} tags`);
};

generateTagNames();
