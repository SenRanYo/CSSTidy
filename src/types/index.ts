import { Range } from 'vscode';


declare module 'postcss' {
  interface Comment {
    id?: string;
    commentId?: string;
    position?: 'before' | 'after'
  }
  interface Rule {
    commentId?: string;
    isSort?: boolean;
  }
  interface AtRule {
    commentId?: string;
    isSort?: boolean;
  }
  interface Declaration {
    commentId?: string;
    isSort?: boolean;
  }
}

export interface Configs {
  formatOnSave?: boolean;
}

export interface CssBlock {
  range: Range;
  syntax: string;
  css: string;
  error: string;
  modified: boolean;
}