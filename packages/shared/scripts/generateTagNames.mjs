// Import URL from the 'url' module
import { fileURLToPath } from 'url';
import globby from 'globby';

const fs = await import('fs');
const path = await import('path');

const prefix = 'v1-'; // Centralized prefix definition

const generateTagNames = async () => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const componentsSourceDirectory = path.resolve(currentDir, '../../core/src/components');
  console.log("Components Source Directory:", componentsSourceDirectory);

  const camelCase = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr.toUpperCase());

  const files = fs.readdirSync(componentsSourceDirectory);
  console.log("Files found:", files);

  const componentFiles = await globby(`${componentsSourceDirectory}/**/*.tsx`);

  const tags = componentFiles
  .filter((file) => !file.includes('-utils'))
  .map((file) => {
    const fileContent = fs.readFileSync(file, 'utf8');
    const [, tag] = /tag: '([a-z-]*)'/.exec(fileContent) || [];
    if (!tag) return null;
    return `${prefix}${tag}`; // Prepend the new prefix directly
  })
  .filter((tag) => tag) // Filter out null values

  const content = `export const TAG_NAMES = [${tags.map((x) => `'${x}'`).join(', ')}] as const;
export type TagName = typeof TAG_NAMES[number];
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
