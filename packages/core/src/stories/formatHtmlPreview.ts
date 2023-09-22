import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserHtml from 'prettier/parser-html';
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
