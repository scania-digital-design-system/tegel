import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Read the primitive tokens
const primitivePath = join(process.cwd(), 'tokens-json', 'primitive', 'default.json');
const fileContent = readFileSync(primitivePath, 'utf8');
const primitiveTokens = JSON.parse(fileContent);

// Function to remove 'cy' from font family values under scania.font.family path
function removeCyFromFontFamilies(obj, path = '') {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map((item, index) => removeCyFromFontFamilies(item, `${path}[${index}]`));
  }

  const result = { ...obj };
  Object.entries(result).forEach(([key, value]) => {
    const currentPath = path ? `${path}.${key}` : key;
    if (
      key === '$value' &&
      typeof value === 'string' &&
      result['$type'] === 'text' &&
      currentPath.includes('scania.font.family')
    ) {
      result[key] = value.replace(/ cy/g, '');
    } else if (typeof value === 'object') {
      result[key] = removeCyFromFontFamilies(value, currentPath);
    }
  });
  return result;
}

// Transform the tokens and write back to file
const transformedTokens = removeCyFromFontFamilies(primitiveTokens);
writeFileSync(primitivePath, JSON.stringify(transformedTokens, null, 2)); 