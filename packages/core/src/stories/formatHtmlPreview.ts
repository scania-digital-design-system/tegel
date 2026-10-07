import prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/plugins/babel';
import * as parserHtml from 'prettier/plugins/html';
import { Options } from 'prettier';

const prettierOptions: Options = {
  bracketSameLine: false,
  htmlWhitespaceSensitivity: 'ignore',
  printWidth: 100,
};

const formatHtmlPreview = (htmlStr) =>
  prettier.format(htmlStr, {
    parser: 'html',
    plugins: [parserBabel, parserHtml],
    ...prettierOptions,
  });

export default formatHtmlPreview;
