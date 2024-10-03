import * as fs from 'fs';
import * as path from 'path';
import globby from 'globby';
import { fileURLToPath } from 'url';
// import { TAG_NAMES } from '../../../src/utils/tagNames';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(currentDir, '../components');

// exclude _beta readme files
const files = await globby([`${dir}/**/readme.md`, `!${dir}/_beta/**/readme.md`]);

// console.log(TAG_NAMES);

const updateDependencies = (str, file) => {
  const dependeciesTitle = str.match(/(## Dependencies\n+)(?:\|.+\n)+\n?/);
  const title = '## Dependencies';
  if (!dependeciesTitle) {
    // skapa dependencies...
    return title;
  }
  console.log(file);

  //   else {
  //     str.replace(
  //       /(## Dependencies\n+)(?:\|.+\n)+\n?/,
  //       `$1<MetaTable component="p-${componentName}" type="events"></MetaTable>\n`,
  //     );
  //   }
};

const readFiles = () => {
  files.forEach((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }

      updateDependencies(data, file);
    });
  });
};

readFiles();

const updateReadmes = async () => {
  files.forEach((file) => {
    const sourceFile = path.normalize(file);
    const sourceDirectory = path.dirname(sourceFile);
    const componentName = path.basename(sourceDirectory);
    const content = updateDependencies(`tds-${componentName}`);

    fs.appendFileSync(sourceFile, content);
  });

  //   updateDependencies();
};

updateReadmes();
