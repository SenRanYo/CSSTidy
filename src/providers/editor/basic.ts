import * as vscode from 'vscode';
import { Configs, CssBlock } from '@/types';

export default class Basic {
  constructor(
    private readonly document: vscode.TextDocument,
    private readonly selection: vscode.Selection | null,
    public readonly syntax: string,
    private readonly configs: Configs
  ) { }

  // 获取样式块
  public cssBlocks(): CssBlock[] {
    let css: string;
    let range: vscode.Range;

    // 判断编辑器是否选中文本
    if (!this.selection || this.selection?.isEmpty) {
      const lastLine = this.document.lineAt(this.document.lineCount - 1);
      const start = new vscode.Position(0, 0);
      const end = new vscode.Position(this.document.lineCount - 1, lastLine.text.length);
      range = new vscode.Range(start, end);
      css = this.document.getText();
    } else {
      range = new vscode.Range(this.selection.start, this.selection.end);
      css = this.document.getText(range);
    }

    return [{ css, range, syntax: this.syntax, error: '', modified: false }];
  }

  // 是否支持的语法
  public isSupportSyntax(): boolean {
    return ['sass', 'scss', 'less', 'css'].includes(this.syntax);
  }
}
