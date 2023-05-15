import * as vscode from 'vscode';
import postcss from 'postcss';
import Basic from '@/providers/editor/basic';
import Embedded from '@/providers/editor/embedded';
import postcssTidy from '@/postcss/tidy/index';

import * as scssSyntax from 'postcss-scss';
const lessSyntax = require('postcss-less');
const sassSyntax = require('postcss-sass');
const postcssSorting = require('postcss-sorting');

// 判断语法使用解析器
const autoSyntax = (syntax: string): postcss.Syntax => {
  const syntaxs: { [key: string]: postcss.Syntax } = {
    scss: scssSyntax,
    sass: sassSyntax,
    less: lessSyntax,
  };
  return syntaxs[syntax];
};
export default async function (document: vscode.TextDocument, selection: vscode.Selection | null = null) {
  const syntax = document.uri.fsPath.slice(document.uri.fsPath.lastIndexOf('.') + 1);
  const basic = new Basic(document, selection, syntax, {});
  const embedded = new Embedded(document, selection, syntax, {});
  const provider = basic.isSupportSyntax() ? basic : embedded.isSupportSyntax() ? embedded : null;

  if (provider) {
    // 获取样式块
    const cssBlocks = provider.cssBlocks();
    for (let i = 0; i < cssBlocks.length; i++) {
      const css = cssBlocks[i].css;
      try {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const result = await postcss([postcssTidy({ 'properties-order': 'alphabetical', })]).process(css, { from: undefined, syntax: autoSyntax(syntax) });
        cssBlocks[i].css = result.css;
      } catch (error: any) {
        console.log(error);
        cssBlocks[i].error = error;
      }
    }

    return cssBlocks;
  } else {
    console.log(`不支持 ${syntax} 语法`);
    return null;
  }

  // const css = stylus.render(document.getText());
  // postcss([sortCss()])
  //   .process(document.getText(), { from: "input.css", to: "output.css" })
  //   .then((result) => {
  //     console.log(result.css);
  //   });
}